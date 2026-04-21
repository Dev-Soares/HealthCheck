import AppLayout from '../shared/layouts/AppLayout'
import DailySummary from '../modules/home/components/DailySummary'
import MealList from '../modules/home/components/MealList'
import type { DailySummary as DailySummaryType } from '../modules/home/types/dailySummary'
import type { Meal } from '../modules/home/types/meal'

const summary: DailySummaryType = {
  macros: [
    { label: 'CALORIAS', value: 1310, max: 2200, unit: 'kcal', color: '#dc2626', trackColor: '#fee2e2' },
    { label: 'PROTEÍNA', value: 82, max: 150, unit: 'g', color: '#f59e0b', trackColor: '#fef3c7' },
    { label: 'CARBOS', value: 145, max: 280, unit: 'g', color: '#3b82f6', trackColor: '#dbeafe' },
    { label: 'GORDURA', value: 48, max: 73, unit: 'g', color: '#a855f7', trackColor: '#f3e8ff' },
  ],
}

const meals: Meal[] = [
  { id: '1', name: 'Café da manhã', mealType: 'breakfast', foods: ['Ovos mexidos', 'Pão integral', 'Café'], time: '07:30', kcal: 420 },
  { id: '2', name: 'Almoço', mealType: 'lunch', foods: ['Frango grelhado', 'Arroz', 'Feijão', 'Salada'], time: '12:15', kcal: 680 },
  { id: '3', name: 'Lanche', mealType: 'snack', foods: ['Banana', 'Mix de castanhas'], time: '15:30', kcal: 210 },
]

export default function MainPage() {
  return (
    <AppLayout>
      <div className="px-10 sm:px-16 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">☀️</span>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Bom dia</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-neutral-950 leading-tight tracking-tight">
            Como está sua{' '}
            <span className="text-red-600">alimentação</span>{' '}
            hoje?
          </h1>
          <p className="text-sm font-medium text-neutral-500 mt-3">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            }).replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DailySummary data={summary} />
          <MealList meals={meals} />
        </div>
      </div>
    </AppLayout>
  )
}
