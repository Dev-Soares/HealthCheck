import { Egg, Leaf, Grains, Fish, Orange } from '@phosphor-icons/react'
import { FOOD_CATEGORIES, type FoodCategory } from '../types/food'

const categoryIcons: Record<string, React.ReactNode> = {
  Proteínas: <Egg size={13} />,
  Vegetais: <Leaf size={13} />,
  Grãos: <Grains size={13} />,
  Peixes: <Fish size={13} />,
  Naturais: <Orange size={13} />,
}

interface FoodFilterProps {
  active: FoodCategory
  onChange: (category: FoodCategory) => void
}

export default function FoodFilter({ active, onChange }: FoodFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FOOD_CATEGORIES.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {category !== 'Todos' && (
              <span className={isActive ? 'text-white' : 'text-neutral-400'}>
                {categoryIcons[category]}
              </span>
            )}
            {category}
          </button>
        )
      })}
    </div>
  )
}
