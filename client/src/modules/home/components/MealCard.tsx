import { Coffee, ForkKnife, Leaf, Moon, Cookie, ArrowRight } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { Meal, MealType } from '../types/meal'

interface MealConfig {
  icon: Icon
  label: string
  accent: string
  accentLight: string
  accentText: string
}

const mealConfig: Record<MealType, MealConfig> = {
  breakfast: {
    icon: Coffee,
    label: 'MANHÃ',
    accent: '#ea580c',
    accentLight: '#fed7aa',
    accentText: '#c2410c',
  },
  lunch: {
    icon: ForkKnife,
    label: 'ALMOÇO',
    accent: '#16a34a',
    accentLight: '#bbf7d0',
    accentText: '#15803d',
  },
  snack: {
    icon: Leaf,
    label: 'LANCHE',
    accent: '#2563eb',
    accentLight: '#bfdbfe',
    accentText: '#1d4ed8',
  },
  dinner: {
    icon: Moon,
    label: 'JANTAR',
    accent: '#9333ea',
    accentLight: '#e9d5ff',
    accentText: '#7e22ce',
  },
  supper: {
    icon: Cookie,
    label: 'CEIA',
    accent: '#475569',
    accentLight: '#cbd5e1',
    accentText: '#334155',
  },
}

interface MealCardProps {
  meal: Meal
}

export default function MealCard({ meal }: MealCardProps) {
  const config = mealConfig[meal.mealType]
  const MealIcon = config.icon

  return (
    <div className="group flex items-center gap-5 py-5 -mx-3 px-3 rounded-2xl hover:bg-neutral-50 transition-colors duration-150 cursor-pointer">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: config.accentLight }}
      >
        <MealIcon size={24} weight="bold" style={{ color: config.accentText }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-base font-bold text-neutral-900 truncate">{meal.name}</p>
          <span
            className="text-[9px] font-black tracking-widest px-2 py-1 rounded-full shrink-0"
            style={{ backgroundColor: config.accentLight, color: config.accentText }}
          >
            {config.label}
          </span>
        </div>
        <p className="text-sm text-neutral-500 truncate">{meal.foods.join(' · ')}</p>
      </div>

      {/* Kcal + time + arrow */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs text-neutral-500 font-medium tabular-nums">{meal.time}</span>
        <div className="text-right">
          <p
            className="text-2xl font-black leading-none tabular-nums"
            style={{ color: config.accent }}
          >
            {meal.kcal}
          </p>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mt-1">kcal</p>
        </div>
        <ArrowRight
          size={15}
          className="text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5 transition-all duration-200"
        />
      </div>
    </div>
  )
}
