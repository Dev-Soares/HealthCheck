/**
 * seed-foods.ts
 *
 * Popula a tabela `foods` com dados reais de:
 *   1. TACO  — alimentos in natura brasileiros (~600 itens)
 *   2. Open Food Facts BR — industrializados com código de barras
 *   3. USDA FoodData Central — fallback confiável (sempre disponível)
 *
 * Uso:
 *   pnpm --filter app-name-api seed:foods
 *   USDA_API_KEY=sua_key pnpm --filter app-name-api seed:foods
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

const USDA_API_KEY = process.env.USDA_API_KEY || 'DEMO_KEY'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface FoodData {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

// ─── Utilitários ──────────────────────────────────────────────────────────────

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

const TACO_URLS = [
  'https://raw.githubusercontent.com/marcelosanto/tabela_taco/main/TACO.json',
  'https://raw.githubusercontent.com/jpedroschmitz/taco/main/json/taco.json',
  'https://raw.githubusercontent.com/jpedroschmitz/taco/master/json/taco.json',
]

async function loadTaco(): Promise<FoodData[]> {
  console.log('\n📗 [1/3] Carregando TACO...')

  const localPath = path.join(__dirname, 'taco.json')
  let raw: any[] | null = null

  if (fs.existsSync(localPath)) {
    console.log('  → Usando taco.json local')
    raw = JSON.parse(fs.readFileSync(localPath, 'utf-8'))
  } else {
    for (const url of TACO_URLS) {
      try {
        console.log(`  → Tentando: ${url}`)
        const res = await axios.get(url, { timeout: 15000 })
        raw = res.data
        fs.writeFileSync(localPath, JSON.stringify(raw, null, 2))
        console.log(`  → Salvo em ${localPath}`)
        break
      } catch {
        console.log(`    ✗ Falhou`)
      }
    }
  }

  if (!raw) {
    console.warn('  ⚠ TACO indisponível — pulando fonte')
    return []
  }

  const foods: FoodData[] = raw
    .filter((item) => item.description ?? item.nome)
    .map((item) => ({
      // marcelosanto/tabela_taco usa campos em inglês; fallback para o formato PT
      name: String(item.description ?? item.nome).trim(),
      calories: safeNum(item.energy_kcal ?? item.energia_kcal ?? item.energia),
      protein: safeNum(item.protein_g ?? item.proteina ?? item['proteínas']),
      carbs: safeNum(item.carbohydrate_g ?? item.carboidrato ?? item.carboidratos),
      fat: safeNum(item.lipid_g ?? item.lipideos ?? item['lipídeos']),
    }))

  console.log(`  ✅ TACO: ${foods.length} alimentos carregados`)
  return foods
}

// ─── 2. Open Food Facts (Brasil) ──────────────────────────────────────────────

const OFF_CATEGORIES = [
  'breakfast-cereals', 'breads', 'dairy', 'yogurts', 'cheeses',
  'meats', 'processed-meats', 'snacks', 'pasta', 'protein-supplements',
  'biscuits-and-cakes', 'oils', 'frozen-foods', 'ready-meals',
]

async function loadOpenFoodFacts(): Promise<FoodData[]> {
  console.log('\n📘 [2/3] Carregando Open Food Facts (Brasil)...')

  const foods: FoodData[] = []
  let failed = 0

  for (const category of OFF_CATEGORIES) {
    process.stdout.write(`  → ${category} `)
    let categoryOk = false

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
              json: true, page: 1, page_size: 50,
            },
            timeout: 15000,
          },
        )

        let added = 0
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
          added++
        }

        console.log(`(${added})`)
        categoryOk = true
        await sleep(1200)
        break
      } catch (err: any) {
        if (attempt === 0) {
          process.stdout.write(`(retry) `)
          await sleep(3000)
        } else {
          console.log(`(falhou: ${err.message.split('\n')[0]})`)
          failed++
        }
      }
    }

    if (!categoryOk && failed >= 3) {
      console.warn('  ⚠ Open Food Facts indisponível — pulando fonte')
      break
    }
  }

  console.log(`  ✅ Open Food Facts: ${foods.length} produtos carregados`)
  return foods
}

// ─── 3. USDA FoodData Central ─────────────────────────────────────────────────
// Foundation Foods e SR Legacy — cobertura ampla de alimentos in natura

const USDA_QUERIES = [
  // Carnes e peixes
  'chicken breast', 'ground beef', 'pork loin', 'salmon', 'tuna', 'shrimp',
  'tilapia', 'sardine', 'turkey breast', 'lamb', 'cod fish', 'beef sirloin',
  'chicken thigh', 'bacon', 'ham', 'sausage',
  // Grãos e leguminosas
  'white rice', 'brown rice', 'oat', 'lentils', 'chickpeas', 'black beans',
  'kidney beans', 'soybeans', 'quinoa', 'corn', 'wheat flour', 'whole wheat bread',
  'white bread', 'pasta', 'couscous',
  // Laticínios e ovos
  'whole milk', 'skim milk', 'yogurt', 'greek yogurt', 'cheddar cheese',
  'mozzarella', 'cottage cheese', 'butter', 'cream cheese', 'egg', 'whey protein',
  // Oleaginosas e gorduras
  'almond', 'cashew', 'walnut', 'peanut', 'chia seeds', 'flaxseed',
  'sunflower seeds', 'pumpkin seeds', 'olive oil', 'coconut oil', 'peanut butter',
  // Frutas
  'banana', 'apple', 'orange', 'mango', 'papaya', 'pineapple', 'strawberry',
  'grape', 'watermelon', 'avocado', 'lemon', 'peach', 'pear', 'kiwi', 'coconut',
  // Vegetais e tubérculos
  'sweet potato', 'potato', 'cassava', 'broccoli', 'spinach', 'kale', 'lettuce',
  'tomato', 'carrot', 'onion', 'garlic', 'cucumber', 'zucchini', 'cabbage',
  'cauliflower', 'green beans', 'beet', 'celery', 'mushroom',
  // Outros
  'dark chocolate', 'honey', 'sugar', 'olive oil', 'mayonnaise', 'tofu',
  'cream', 'coconut milk', 'oat flour', 'cornstarch',
]

async function loadUSDA(): Promise<FoodData[]> {
  console.log('\n📙 [3/3] Carregando USDA FoodData Central...')

  if (USDA_API_KEY === 'DEMO_KEY') {
    console.log('  ⚠ USDA_API_KEY não definida (DEMO_KEY = 30 req/hora).')
    console.log('    Chave gratuita em: https://fdc.nal.usda.gov/api-guide.html')
  }

  const foods: FoodData[] = []
  let errors = 0

  for (const query of USDA_QUERIES) {
    try {
      const { data } = await axios.get(
        'https://api.nal.usda.gov/fdc/v1/foods/search',
        {
          params: {
            query,
            api_key: USDA_API_KEY,
            pageSize: 5,
            dataType: 'Foundation,SR Legacy',
          },
          timeout: 10000,
        },
      )

      for (const food of data.foods ?? []) {
        foods.push({
          name: String(food.description).trim(),
          calories: findNutrient(food.foodNutrients, ['Energy', 'Energia']),
          protein: findNutrient(food.foodNutrients, ['Protein', 'Proteína']),
          carbs: findNutrient(food.foodNutrients, ['Carbohydrate']),
          fat: findNutrient(food.foodNutrients, ['Total lipid', 'Fat']),
        })
      }

      await sleep(350) // ~3 req/s dentro do limite
    } catch (err: any) {
      console.warn(`  ⚠ "${query}": ${err.message.split('\n')[0]}`)
      errors++
      if (errors >= 5) {
        console.warn('  ⚠ Muitos erros — interrompendo USDA')
        break
      }
    }
  }

  console.log(`  ✅ USDA: ${foods.length} alimentos carregados`)
  return foods
}

function findNutrient(list: any[], names: string[]): number {
  for (const n of list ?? []) {
    for (const name of names) {
      if (normalize(n.nutrientName).includes(normalize(name))) {
        return safeNum(n.value)
      }
    }
  }
  return 0
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seed de alimentos — TACO + Open Food Facts BR + USDA')
  const start = Date.now()

  try {
    const existing = await db.food.findMany({ select: { name: true } })
    const existingNames = new Set(existing.map((f) => normalize(f.name)))
    console.log(`\n  → ${existingNames.size} alimentos já existentes no banco`)

    const taco = await loadTaco()
    const off = await loadOpenFoodFacts()
    const usda = await loadUSDA()

    const all = [...taco, ...off, ...usda]

    // Deduplica por nome (case-insensitive)
    const seen = new Set<string>()
    const toInsert = all.filter((f) => {
      const key = normalize(f.name)
      if (!f.name || existingNames.has(key) || seen.has(key)) return false
      seen.add(key)
      return true
    })

    console.log(`\n  → ${all.length} carregados no total`)
    console.log(`  → ${all.length - toInsert.length} duplicatas removidas`)
    console.log(`  → ${toInsert.length} novos alimentos para inserir`)

    if (toInsert.length === 0) {
      console.log('\n✅ Banco já está atualizado.')
      return
    }

    // Insere em lotes de 500
    const BATCH = 500
    let inserted = 0
    for (let i = 0; i < toInsert.length; i += BATCH) {
      const batch = toInsert.slice(i, i + BATCH)
      await db.food.createMany({ data: batch })
      inserted += batch.length
      process.stdout.write(`\r  → Inserindo... ${inserted}/${toInsert.length}`)
    }

    const elapsed = ((Date.now() - start) / 1000 / 60).toFixed(1)
    console.log(`\n\n🎉 Concluído em ${elapsed} min! ${inserted} alimentos inseridos.`)
  } finally {
    await db.$disconnect()
  }
}

main().catch((err) => {
  console.error('\nErro fatal:', err.message)
  db.$disconnect()
  process.exit(1)
})
