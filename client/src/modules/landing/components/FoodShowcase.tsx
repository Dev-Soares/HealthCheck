import {
  OrangeSlice,
  Carrot,
  Fish,
  Egg,
  Cookie,
  Coffee,
  Wine,
  Bread,
  Pizza,
  Hamburger,
  IceCream,
  Pepper,
  Grains,
  Shrimp,
  Avocado,
  CookingPot,
  BowlFood,
  Cake,
  BeerStein,
  Leaf,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

interface FoodItem {
  icon: Icon
  label: string
  color: string
  bg: string
}

const foods: FoodItem[] = [
  { icon: OrangeSlice,  label: 'Laranja',    color: 'text-orange-600',  bg: 'bg-orange-100'  },
  { icon: Avocado,      label: 'Abacate',    color: 'text-green-700',   bg: 'bg-green-100'   },
  { icon: Carrot,       label: 'Cenoura',    color: 'text-orange-600',  bg: 'bg-orange-100'  },
  { icon: Fish,         label: 'Peixe',      color: 'text-sky-600',     bg: 'bg-sky-100'     },
  { icon: Egg,          label: 'Ovo',        color: 'text-amber-600',   bg: 'bg-amber-100'   },
  { icon: Pizza,        label: 'Pizza',      color: 'text-red-600',     bg: 'bg-red-100'     },
  { icon: Coffee,       label: 'Café',       color: 'text-amber-900',   bg: 'bg-amber-100'   },
  { icon: Hamburger,    label: 'Hambúrguer', color: 'text-amber-700',   bg: 'bg-amber-100'   },
  { icon: Leaf,         label: 'Salada',     color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { icon: Grains,       label: 'Arroz',      color: 'text-yellow-700',  bg: 'bg-yellow-100'  },
  { icon: Wine,         label: 'Vinho',      color: 'text-rose-800',    bg: 'bg-rose-100'    },
  { icon: Shrimp,       label: 'Camarão',    color: 'text-pink-600',    bg: 'bg-pink-100'   },
  { icon: Bread,        label: 'Pão',        color: 'text-amber-700',   bg: 'bg-amber-100'  },
  { icon: Cookie,       label: 'Biscoito',   color: 'text-yellow-800',  bg: 'bg-yellow-100'  },
  { icon: IceCream,     label: 'Sorvete',    color: 'text-pink-600',    bg: 'bg-pink-100'    },
  { icon: CookingPot,   label: 'Sopas',      color: 'text-stone-700',   bg: 'bg-stone-100'   },
  { icon: Pepper,       label: 'Pimentão',    color: 'text-red-700',     bg: 'bg-red-100'     },
  { icon: BowlFood,     label: 'Açaí',       color: 'text-purple-700',  bg: 'bg-purple-100'  },
  { icon: Cake,         label: 'Bolo',       color: 'text-pink-600',    bg: 'bg-pink-100'   },
  { icon: BeerStein,    label: 'Cerveja',    color: 'text-amber-700',   bg: 'bg-amber-100'  },
]

export default function FoodShowcase() {
  return (
    <section id="funcionalidades" className="relative overflow-hidden py-28 bg-gradient-to-b from-red-100/80 via-red-50/50 to-red-100/70">
      {/* Animated background orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-300/50 blur-3xl animate-pulse [animation-duration:7s]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-rose-300/50 blur-3xl animate-pulse [animation-duration:9s]" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-red-200/60 blur-3xl animate-pulse [animation-duration:11s]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Hero number block */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 mb-24">

          {/* Left — story block with stats strip */}
          <div className="flex-shrink-0 max-w-md">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-red-200/70 mb-8 shadow-sm">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">
                Base de dados viva
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-neutral-950 font-black text-[44px] sm:text-[52px] lg:text-[60px] leading-[1.02] tracking-tight">
              Do açaí ao{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600">pão de queijo</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-red-200/60 -z-0" />
              </span>
              , tudo aqui.
            </h2>

            {/* Description */}
            <p className="text-neutral-600 text-[17px] leading-relaxed mt-6">
              Uma base nutricional completa, atualizada constantemente e validada pela comunidade.
            </p>

            {/* Stats strip */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-red-200/70">
              <div>
                <p className="text-red-600 font-black text-[38px] leading-none tracking-tight">
                  10K<span className="text-red-400">+</span>
                </p>
                <p className="text-neutral-500 text-[13px] font-semibold uppercase tracking-wider mt-2">
                  alimentos
                </p>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-red-200 to-transparent" />
              <div>
                <p className="text-red-600 font-black text-[38px] leading-none tracking-tight">
                  500<span className="text-red-400">+</span>
                </p>
                <p className="text-neutral-500 text-[13px] font-semibold uppercase tracking-wider mt-2">
                  marcas
                </p>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-red-200 to-transparent" />
              <div>
                <p className="text-red-600 font-black text-[38px] leading-none tracking-tight">
                  24/7
                </p>
                <p className="text-neutral-500 text-[13px] font-semibold uppercase tracking-wider mt-2">
                  ativo
                </p>
              </div>
            </div>
          </div>

          {/* Right — food icons flowing pills */}
          <div className="flex flex-wrap gap-3 max-w-lg lg:max-w-md justify-center">
            {foods.map((food) => (
              <div
                key={food.label}
                className={`${food.bg} rounded-full px-4 py-2.5 flex items-center gap-2 cursor-default select-none transition-all duration-200 hover:scale-105 hover:shadow-md`}
              >
                <food.icon className={food.color} size={28} weight="duotone" />
                <span className="text-[13px] font-semibold text-neutral-700 whitespace-nowrap">
                  {food.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
