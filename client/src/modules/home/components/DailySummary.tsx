import { Fire } from '@phosphor-icons/react'
import type { DailySummary, MacroRing } from '../types/dailySummary'

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CircularRing({ label, value, max, unit, color, trackColor }: MacroRing) {
  const progress = Math.min(value / max, 1)
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const displayValue = unit === 'kcal' ? value.toLocaleString('pt-BR') : value
  const pct = Math.round(progress * 100)

  return (
    <div className="flex flex-col items-center gap-3 flex-1">
      <div className="relative w-28 h-28">
        <svg width="112" height="112" viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke={trackColor} strokeWidth="8" />
          <circle
            cx="50" cy="50" r={RADIUS} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-xl font-black text-neutral-900 leading-none tabular-nums">{displayValue}</span>
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
            {unit === 'kcal' ? 'KCAL' : unit.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">{label}</p>
        <p className="text-[10px] font-medium mt-0.5" style={{ color }}>
          {pct}% da meta
        </p>
      </div>
    </div>
  )
}

interface DailySummaryProps {
  data: DailySummary
}

export default function DailySummary({ data }: DailySummaryProps) {
  const calorias = data.macros[0]
  const calPct = Math.round((calorias.value / calorias.max) * 100)

  return (
    <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 h-full flex flex-col">
      {/* Kcal badge */}
      <div className="absolute -top-3.5 right-5 flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-xl px-3 py-1.5">
        <Fire size={14} weight="fill" className="text-red-500" />
        <span className="text-xs font-bold text-red-600">
          {calorias.value.toLocaleString('pt-BR')} kcal
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-bold text-neutral-900">Resumo diário</h2>
        <p className="text-sm text-neutral-400 mt-0.5">Acompanhe seus macros</p>
      </div>

      <div className="flex items-start justify-between gap-2 flex-1">
        {data.macros.map((macro) => (
          <CircularRing key={macro.label} {...macro} />
        ))}
      </div>

      {/* Calorie progress bar */}
      <div className="mt-6 pt-5 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-500">Progresso calórico do dia</span>
          <span className="text-xs font-bold text-neutral-700 tabular-nums">
            {calorias.value.toLocaleString('pt-BR')} / {calorias.max.toLocaleString('pt-BR')} kcal
          </span>
        </div>
        <div className="h-2 rounded-full bg-red-50 overflow-hidden">
          <div
            className="h-full rounded-full bg-red-500 transition-all duration-700"
            style={{ width: `${calPct}%` }}
          />
        </div>
        <p className="text-[10px] text-neutral-400 mt-1.5">{calPct}% da meta diária consumida</p>
      </div>
    </div>
  )
}
