import { ArrowRight, Plus } from '@phosphor-icons/react'
import type { Meal } from '../types/meal'
import MealCard from './MealCard'

interface MealListProps {
  meals: Meal[]
}

export default function MealList({ meals }: MealListProps) {
  const totalKcal = meals.reduce((sum, m) => sum + m.kcal, 0)

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-neutral-900">Refeições de hoje</h2>
          <p className="text-sm text-neutral-500 mt-0.5">Seu histórico do dia</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-neutral-600 tabular-nums">
            {totalKcal.toLocaleString('pt-BR')} kcal
          </span>
          <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
            Ver todas
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-neutral-100 flex-1">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-neutral-200 text-sm font-semibold text-neutral-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer">
        <Plus size={15} weight="bold" />
        Adicionar refeição
      </button>
    </div>
  )
}
