import { MagnifyingGlass } from '@phosphor-icons/react'

interface FoodSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function FoodSearch({ value, onChange }: FoodSearchProps) {
  return (
    <div className="relative">
      <MagnifyingGlass
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        placeholder="Buscar alimento..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors duration-200"
      />
    </div>
  )
}
