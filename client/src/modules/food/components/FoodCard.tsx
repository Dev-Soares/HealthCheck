import { Fire, ArrowRight } from '@phosphor-icons/react'
import type { Food } from '../types/food'

interface FoodCardProps {
  food: Food
}

export default function FoodCard({ food }: FoodCardProps) {
  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl p-4 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-semibold text-neutral-900 group-hover:text-red-600 transition-colors duration-200 leading-snug">
          {food.name}
        </p>
        <ArrowRight
          size={14}
          className="text-neutral-300 group-hover:text-red-500 shrink-0 mt-0.5 transition-colors duration-200"
        />
      </div>

      <p className="text-xs font-medium text-neutral-500 mb-3">por 100g</p>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Fire size={12} weight="fill" className="text-red-500" />
          <span className="text-sm font-bold text-neutral-800">{food.kcal}</span>
        </div>
        <div className="w-px h-3 bg-neutral-200" />
        <span className="text-xs text-neutral-500">
          P:{food.protein}g · C:{food.carbs}g · G:{food.fat}g
        </span>
      </div>
    </div>
  )
}
