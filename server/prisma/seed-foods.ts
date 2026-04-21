import 'dotenv/config'
import { readFileSync } from 'fs'
import { join } from 'path'
import axios from 'axios'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './prisma/client.js'

// ─── Prisma Setup ───
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const db = new PrismaClient({ adapter })

// ─── Constants ───
const BATCH_SIZE = 500
const MAX_RETRIES = 10
const BASE_DELAY = 15000
const REQUEST_DELAY = 8000

// ─── Interfaces ───
interface FoodEntry {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

// ─── Helpers ───
function round2(val: number): number {
  return Math.round(val * 100) / 100
}

function safeNum(val: unknown): number {
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (trimmed === '' || trimmed === 'NA' || trimmed === 'Tr') return 0
    const parsed = parseFloat(trimmed)
    return isNaN(parsed) || parsed < 0 ? 0 : parsed
  }
  if (typeof val === 'number') return isNaN(val) || val < 0 ? 0 : val
  return 0
}

function normalize(str: string): string {
  return str.trim().toLowerCase()
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Load TACO ───
function loadTaco(): FoodEntry[] {
  const raw = readFileSync(join(__dirname, 'taco.json'), 'utf-8')
  const items: any[] = JSON.parse(raw)
  const foods: FoodEntry[] = []

  for (const item of items) {
    const name = item.description?.trim()
    if (!name) continue

    const calories = round2(safeNum(item.energy_kcal))
    const protein = round2(safeNum(item.protein_g))
    const carbs = round2(safeNum(item.carbohydrate_g))
    const fat = round2(safeNum(item.lipid_g))

    foods.push({ name, calories, protein, carbs, fat })
  }

  console.log(`[TACO] ${foods.length} alimentos carregados`)
  return foods
}

// ─── OFF Search Terms ───
const OFF_SEARCH_TERMS = [
  'arroz', 'feijão', 'macarrão', 'pão', 'leite', 'queijo', 'iogurte', 'manteiga',
  'ovo', 'frango', 'carne bovina', 'carne suína', 'peixe', 'atum', 'sardinha',
  'presunto', 'salsicha', 'linguiça', 'bacon', 'mortadela',
  'banana', 'maçã', 'laranja', 'manga', 'abacaxi', 'melancia', 'uva', 'morango',
  'tomate', 'cebola', 'alho', 'batata', 'cenoura', 'brócolis', 'alface', 'milho',
  'farinha', 'açúcar', 'sal', 'óleo', 'azeite', 'vinagre', 'molho de tomate',
  'chocolate', 'biscoito', 'bolacha', 'bolo', 'sorvete', 'gelatina',
  'café', 'chá', 'suco', 'refrigerante', 'cerveja', 'vinho',
  'aveia', 'granola', 'cereal', 'whey protein', 'pasta de amendoim',
  'castanha', 'amendoim', 'nozes', 'amêndoa',
  'azeite de oliva', 'óleo de coco', 'margarina',
  'creme de leite', 'leite condensado', 'requeijão',
  'peito de frango', 'filé de peixe', 'camarão',
  'abóbora', 'berinjela', 'pepino', 'pimentão', 'couve', 'espinafre',
  'lentilha', 'grão de bico', 'ervilha', 'soja',
  'tapioca', 'cuscuz', 'polenta', 'mandioca',
  'mel', 'geleia', 'doce de leite',
]

// ─── Load Open Food Facts ───
async function loadOpenFoodFacts(): Promise<FoodEntry[]> {
  const foods: FoodEntry[] = []
  const baseUrl = 'https://world.openfoodfacts.org/cgi/search.pl'
  const totalRequests = OFF_SEARCH_TERMS.length * 2
  let completed = 0
  let failures = 0

  for (const term of OFF_SEARCH_TERMS) {
    for (let page = 1; page <= 2; page++) {
      let success = false

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const resp = await axios.get(baseUrl, {
            params: {
              search_terms: term,
              search_simple: 1,
              action: 'process',
              json: 1,
              page_size: 50,
              page,
            },
            timeout: 30000,
          })

          const products = resp.data?.products ?? []
          for (const p of products) {
            const name = p.product_name?.trim()
            if (!name) continue

            const n = p.nutriments ?? {}
            const calories = round2(safeNum(n['energy-kcal_100g']))
            const protein = round2(safeNum(n['proteins_100g']))
            const carbs = round2(safeNum(n['carbohydrates_100g']))
            const fat = round2(safeNum(n['fat_100g']))

            if (calories === 0 && protein === 0 && carbs === 0 && fat === 0) continue

            foods.push({ name, calories, protein, carbs, fat })
          }

          success = true
          break
        } catch (err: any) {
          const status = err.response?.status
          if (attempt < MAX_RETRIES && (status === 503 || status === 429 || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT')) {
            const delay = BASE_DELAY * attempt
            console.warn(`[OFF] Erro ${status || err.code} ao buscar "${term}" p${page} — tentativa ${attempt}/${MAX_RETRIES}, aguardando ${delay / 1000}s...`)
            await sleep(delay)
          } else {
            console.warn(`[OFF] Falha definitiva ao buscar "${term}" p${page}: ${err.message}`)
          }
        }
      }

      if (!success) failures++
      completed++

      if (completed % 10 === 0) {
        console.log(`[OFF] Progresso: ${completed}/${totalRequests} requisições (${failures} falhas)`)
      }

      await sleep(REQUEST_DELAY)
    }
  }

  console.log(`[OFF] ${foods.length} alimentos carregados (${failures} requisições falharam de ${totalRequests})`)
  return foods
}

// ─── Insert in Batches ───
async function insertBatch(foods: FoodEntry[]): Promise<number> {
  let inserted = 0

  for (let i = 0; i < foods.length; i += BATCH_SIZE) {
    const batch = foods.slice(i, i + BATCH_SIZE)
    const result = await db.food.createMany({
      data: batch,
      skipDuplicates: true,
    })
    inserted += result.count
    console.log(`[DB] Lote ${Math.floor(i / BATCH_SIZE) + 1}: ${result.count} inseridos`)
  }

  return inserted
}

// ─── Main ───
async function main() {
  console.log('Iniciando seed de alimentos...\n')

  const tacoFoods = loadTaco()
  const offFoods = await loadOpenFoodFacts()

  // Deduplicate by normalized name
  const seen = new Set<string>()
  const allFoods: FoodEntry[] = []

  for (const food of [...tacoFoods, ...offFoods]) {
    const key = normalize(food.name)
    if (seen.has(key)) continue
    seen.add(key)
    allFoods.push(food)
  }

  console.log(`\n[TOTAL] ${allFoods.length} alimentos únicos (após deduplicação)`)

  // Clear existing foods
  await db.food.deleteMany()
  console.log('[DB] Tabela Food limpa')

  const inserted = await insertBatch(allFoods)
  console.log(`\n✅ Seed concluído: ${inserted} alimentos inseridos no banco`)
}

main()
  .catch((err) => {
    console.error('Erro fatal no seed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
    await pool.end()
  })
