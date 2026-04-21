import { GOAL_OPTIONS, type PlanGoal } from '../types/plan'

interface GoalSelectorProps {
  value: PlanGoal
  onChange: (goal: PlanGoal) => void
  error?: string
}

export default function GoalSelector({ value, onChange, error }: GoalSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {GOAL_OPTIONS.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-red-600 bg-red-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <div>
                <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-red-600' : 'text-neutral-800'}`}>
                  {option.label}
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}
