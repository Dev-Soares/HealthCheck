import { useState } from 'react'
import AppLayout from '../shared/layouts/AppLayout'
import FoodSearch from '../modules/food/components/FoodSearch'
import FoodFilter from '../modules/food/components/FoodFilter'
import FoodGrid from '../modules/food/components/FoodGrid'
import type { Food, FoodCategory } from '../modules/food/types/food'

const allFoods: Food[] = [
  { id: '1', name: 'Frango grelhado', kcal: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Proteínas' },
  { id: '2', name: 'Arroz branco cozido', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, category: 'Grãos' },
  { id: '3', name: 'Feijão preto cozido', kcal: 132, protein: 8.9, carbs: 24, fat: 0.5, category: 'Grãos' },
  { id: '4', name: 'Ovo de galinha cozido', kcal: 146, protein: 13, carbs: 0.6, fat: 10, category: 'Proteínas' },
  { id: '5', name: 'Banana prata', kcal: 98, protein: 1.3, carbs: 26, fat: 0.1, category: 'Naturais' },
  { id: '6', name: 'Batata doce cozida', kcal: 77, protein: 0.6, carbs: 18, fat: 0.1, category: 'Vegetais' },
  { id: '7', name: 'Salmão grelhado', kcal: 208, protein: 20, carbs: 0, fat: 13, category: 'Peixes' },
  { id: '8', name: 'Abacate', kcal: 96, protein: 1.2, carbs: 6, fat: 8.4, category: 'Naturais' },
  { id: '9', name: 'Brócolis cozido', kcal: 25, protein: 2.1, carbs: 4, fat: 0.4, category: 'Vegetais' },
  { id: '10', name: 'Pão integral', kcal: 247, protein: 9, carbs: 41, fat: 3.4, category: 'Grãos' },
  { id: '11', name: 'Peito de peru defumado', kcal: 110, protein: 22, carbs: 1, fat: 1.8, category: 'Proteínas' },
  { id: '12', name: 'Tilápia grelhada', kcal: 128, protein: 26, carbs: 0, fat: 2.7, category: 'Peixes' },
  { id: '13', name: 'Espinafre cru', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'Vegetais' },
  { id: '14', name: 'Azeite de oliva', kcal: 884, protein: 0, carbs: 0, fat: 100, category: 'Naturais' },
  { id: '15', name: 'Atum em lata', kcal: 130, protein: 29, carbs: 0, fat: 1, category: 'Peixes' },
]

export default function FoodsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('Todos')

  const filtered = allFoods.filter((f) => {
    const matchCategory = activeCategory === 'Todos' || f.category === activeCategory
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 py-8 max-w-5xl mx-auto">
        <div className="mb-7">
          <h1
            className="text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-none"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Alimentos
          </h1>
          <p className="text-sm text-neutral-500 mt-2">Mais de 10.000 alimentos na base de dados</p>
        </div>

        <div className="space-y-4 mb-6">
          <FoodSearch value={search} onChange={setSearch} />
          <FoodFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <FoodGrid foods={filtered} total={filtered.length} />
      </div>
    </AppLayout>
  )
}
