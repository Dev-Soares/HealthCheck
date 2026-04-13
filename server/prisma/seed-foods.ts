/**
 * seed-foods.ts
 *
 * Fontes:
 *   1. TACO      — 597 alimentos in natura BR (cache local)
 *   2. wger.de   — 16k+ alimentos em português (sem auth, paginado)
 *   3. OFF BR    — industrializados BR (se disponível)
 *
 * Uso:
 *   pnpm --filter app-name-api seed:foods
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import axios from 'axios'
import { PrismaClient } from './prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

interface FoodData {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function safeNum(val: unknown): number {
  const n = parseFloat(String(val ?? ''))
  return isNaN(n) || n < 0 ? 0 : n
}

function normalize(str = '') {
  return str.trim().toLowerCase()
}

// ─── 1. TACO ──────────────────────────────────────────────────────────────────

async function loadTaco(): Promise<FoodData[]> {
  console.log('\n📗 [1/3] Carregando TACO...')

  const localPath = path.join(__dirname, 'taco.json')

  if (!fs.existsSync(localPath)) {
    console.log('  → Baixando de marcelosanto/tabela_taco...')
    const res = await axios.get(
      'https://raw.githubusercontent.com/marcelosanto/tabela_taco/main/TACO.json',
      { timeout: 15000 },
    )
    fs.writeFileSync(localPath, JSON.stringify(res.data, null, 2))
  } else {
    console.log('  → Usando cache local')
  }

  const raw: any[] = JSON.parse(fs.readFileSync(localPath, 'utf-8'))

  const foods = raw
    .filter((item) => item.description ?? item.nome)
    .map((item) => ({
      name: String(item.description ?? item.nome).trim(),
      calories: safeNum(item.energy_kcal ?? item.energia_kcal ?? item.energia),
      protein: safeNum(item.protein_g ?? item.proteina),
      carbs: safeNum(item.carbohydrate_g ?? item.carboidrato),
      fat: safeNum(item.lipid_g ?? item.lipideos),
    }))

  console.log(`  ✅ ${foods.length} alimentos`)
  return foods
}

// ─── 2. wger.de (PT) ──────────────────────────────────────────────────────────
// language=7 → Português | ~16k alimentos | sem auth | sem rate limit declarado

async function loadWger(): Promise<FoodData[]> {
  console.log('\n📙 [2/3] Carregando wger.de (português)...')

  const foods: FoodData[] = []
  const PAGE_SIZE = 100
  let offset = 0
  let total = 0
  let page = 1

  while (true) {
    try {
      const { data } = await axios.get('https://wger.de/api/v2/ingredient/', {
        params: { format: 'json', language: 7, limit: PAGE_SIZE, offset },
        timeout: 15000,
      })

      if (page === 1) {
        total = data.count
        console.log(`  → ${total} alimentos encontrados, paginando...`)
      }

      for (const item of data.results ?? []) {
        if (!item.name || item.energy === null) continue
        foods.push({
          name: String(item.name).trim(),
          calories: safeNum(item.energy),
          protein: safeNum(item.protein),
          carbs: safeNum(item.carbohydrates),
          fat: safeNum(item.fat),
        })
      }

      process.stdout.write(`\r  → Página ${page}/${Math.ceil(total / PAGE_SIZE)} — ${foods.length} carregados`)

      if (!data.next) break

      offset += PAGE_SIZE
      page++
      await sleep(300)
    } catch (err: any) {
      console.warn(`\n  ⚠ Erro na página ${page}: ${err.message}`)
      await sleep(2000)
      // tenta de novo a mesma página uma vez
      try {
        const { data } = await axios.get('https://wger.de/api/v2/ingredient/', {
          params: { format: 'json', language: 7, limit: PAGE_SIZE, offset },
          timeout: 15000,
        })
        for (const item of data.results ?? []) {
          if (!item.name || item.energy === null) continue
          foods.push({
            name: String(item.name).trim(),
            calories: safeNum(item.energy),
            protein: safeNum(item.protein),
            carbs: safeNum(item.carbohydrates),
            fat: safeNum(item.fat),
          })
        }
        if (!data.next) break
        offset += PAGE_SIZE
        page++
        await sleep(300)
      } catch {
        console.warn(`  ⚠ Página ${page} falhou duas vezes, pulando`)
        offset += PAGE_SIZE
        page++
      }
    }
  }

  console.log(`\n  ✅ ${foods.length} alimentos`)
  return foods
}

// ─── 3. Open Food Facts (Brasil) ──────────────────────────────────────────────

const OFF_CATEGORIES = [
  'breakfast-cereals', 'breads', 'dairy', 'yogurts', 'cheeses',
  'meats', 'processed-meats', 'snacks', 'pasta', 'protein-supplements',
  'biscuits-and-cakes', 'oils', 'frozen-foods', 'ready-meals',
  'beverages', 'juices', 'baby-foods', 'chocolate-spreads', 'sauces',
]

async function loadOpenFoodFacts(): Promise<FoodData[]> {
  console.log('\n📘 [3/3] Carregando Open Food Facts (Brasil)...')

  // Testa disponibilidade antes de tentar
  try {
    await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
      params: { action: 'process', tagtype_0: 'countries', tag_contains_0: 'contains',
        tag_0: 'brazil', fields: 'code', json: true, page_size: 1, page: 1 },
      timeout: 8000,
    })
  } catch {
    console.log('  ⚠ Open Food Facts indisponível — pulando')
    return []
  }

  const foods: FoodData[] = []
  let failures = 0

  for (const category of OFF_CATEGORIES) {
    process.stdout.write(`  → ${category} `)

    for (let page = 1; page <= 3; page++) {
      let ok = false
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const { data } = await axios.get(
            'https://world.openfoodfacts.org/cgi/search.pl',
            {
              params: {
                action: 'process',
                tagtype_0: 'countries', tag_contains_0: 'contains', tag_0: 'brazil',
                tagtype_1: 'categories', tag_contains_1: 'contains', tag_1: category,
                fields: 'product_name,product_name_pt,nutriments',
                json: true, page, page_size: 50,
              },
              timeout: 15000,
            },
          )

          for (const p of data.products ?? []) {
            const name = p.product_name_pt || p.product_name
            if (!name) continue
            const n = p.nutriments ?? {}
            foods.push({
              name: String(name).trim(),
              calories: safeNum(n['energy-kcal_100g'] ?? (n['energy_100g'] ?? 0) / 4.184),
              protein: safeNum(n['proteins_100g']),
              carbs: safeNum(n['carbohydrates_100g']),
              fat: safeNum(n['fat_100g']),
            })
          }

          ok = true
          await sleep(1200)
          break
        } catch {
          if (attempt === 0) await sleep(3000)
        }
      }

      if (!ok) {
        failures++
        if (failures >= 4) {
          console.log(`\n  ⚠ Muitas falhas — abortando OFF`)
          console.log(`  ✅ ${foods.length} alimentos`)
          return foods
        }
      }
    }

    process.stdout.write(`(ok)\n`)
  }

  console.log(`  ✅ ${foods.length} alimentos`)
  return foods
}

// ─── Inserção em lotes ────────────────────────────────────────────────────────

async function insertBatch(foods: FoodData[], existingNames: Set<string>) {
  const seen = new Set<string>()

  const toInsert = foods.filter((f) => {
    const key = normalize(f.name)
    if (!f.name || existingNames.has(key) || seen.has(key)) return false
    seen.add(key)
    existingNames.add(key) // evita duplicata entre fontes
    return true
  })

  const BATCH = 500
  let inserted = 0
  for (let i = 0; i < toInsert.length; i += BATCH) {
    await db.food.createMany({ data: toInsert.slice(i, i + BATCH) })
    inserted += Math.min(BATCH, toInsert.length - i)
    process.stdout.write(`\r  → Inserindo... ${inserted}/${toInsert.length}`)
  }
  if (toInsert.length > 0) console.log()
  return inserted
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seed — TACO + wger.de PT + Open Food Facts BR')
  const start = Date.now()

  try {
    const existing = await db.food.findMany({ select: { name: true } })
    const existingNames = new Set(existing.map((f) => normalize(f.name)))
    console.log(`\n  → ${existingNames.size} alimentos já no banco`)

    let total = 0

    const taco = await loadTaco()
    total += await insertBatch(taco, existingNames)
    console.log(`  → Total inserido até agora: ${existingNames.size} no banco`)

    const wger = await loadWger()
    total += await insertBatch(wger, existingNames)
    console.log(`  → Total inserido até agora: ${existingNames.size} no banco`)

    const off = await loadOpenFoodFacts()
    total += await insertBatch(off, existingNames)

    const elapsed = ((Date.now() - start) / 1000 / 60).toFixed(1)
    console.log(`\n🎉 Concluído em ${elapsed} min! ${total} novos alimentos inseridos.`)
    console.log(`   Total no banco: ${existingNames.size} alimentos`)
  } finally {
    await db.$disconnect()
  }
}

main().catch((err) => {
  console.error('\nErro fatal:', err.message)
  db.$disconnect()
  process.exit(1)
})
