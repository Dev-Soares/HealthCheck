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
  BowlSteam,
  Cake,
  BeerStein,
  Champagne,
  Martini,
  TeaBag,
  Cheese,
  Nut,
  Leaf,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.05, 0.64, 1], delay } },
})

interface FoodItem {
  icon: Icon
  color: string
}

const floatDelays = [
  '[animation-delay:0ms]',
  '[animation-delay:280ms]',
  '[animation-delay:560ms]',
  '[animation-delay:840ms]',
  '[animation-delay:1120ms]',
  '[animation-delay:1400ms]',
  '[animation-delay:1680ms]',
]

const foods: FoodItem[] = [
  { icon: OrangeSlice,  color: 'text-orange-500'  },
  { icon: Avocado,      color: 'text-lime-500'    },
  { icon: Carrot,       color: 'text-orange-500'  },
  { icon: Fish,         color: 'text-cyan-500'    },
  { icon: Egg,          color: 'text-yellow-400'  },
  { icon: Pizza,        color: 'text-red-500'     },
  { icon: Coffee,       color: 'text-amber-800'   },
  { icon: TeaBag,       color: 'text-green-600'   },
  { icon: Hamburger,    color: 'text-yellow-600'  },
  { icon: Leaf,         color: 'text-green-500'   },
  { icon: Grains,       color: 'text-yellow-500'  },
  { icon: Wine,         color: 'text-rose-600'    },
  { icon: Champagne,    color: 'text-yellow-400'  },
  { icon: Martini,      color: 'text-indigo-500'  },
  { icon: BeerStein,    color: 'text-amber-400'   },
  { icon: Shrimp,       color: 'text-pink-500'    },
  { icon: Bread,        color: 'text-amber-500'   },
  { icon: Cookie,       color: 'text-orange-600'  },
  { icon: IceCream,     color: 'text-fuchsia-500' },
  { icon: CookingPot,   color: 'text-teal-600'    },
  { icon: BowlSteam,    color: 'text-cyan-600'    },
  { icon: Pepper,       color: 'text-red-600'     },
  { icon: Cake,         color: 'text-pink-500'    },
  { icon: Cheese,       color: 'text-yellow-500'  },
  { icon: Nut,          color: 'text-amber-600'   },
]

export default function FoodShowcase() {
  return (
    <section id="funcionalidades" className="relative overflow-hidden min-h-screen flex items-center py-28 bg-neutral-950">

      {/* Glow edges */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-red-900/35 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-red-900/35 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 bottom-0 w-40 bg-linear-to-r from-red-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-40 bg-linear-to-l from-red-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Hero number block */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 mb-24">

          {/* Left — story block with stats strip */}
          <div className="shrink-0 max-w-md">

            {/* Headline */}
            <motion.h2
              className="text-white font-black text-[44px] sm:text-[52px] lg:text-[60px] leading-[1.02] tracking-tight"
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              Do açaí ao{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600">pão de queijo</span>
              </span>
              , tudo aqui.
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-neutral-400 text-[17px] leading-relaxed mt-6"
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              Uma base nutricional completa, atualizada constantemente e validada pela comunidade.
            </motion.p>

            {/* Stats strip */}
            <motion.div
              className="flex items-center gap-6 mt-10 pt-8 border-t border-red-800"
              variants={fadeUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div>
                <p className="text-red-600 font-black text-[38px] leading-none tracking-tight">
                  10K<span className="text-red-600">+</span>
                </p>
                <p className="text-neutral-500 text-[13px] font-semibold uppercase tracking-wider mt-2">
                  alimentos
                </p>
              </div>
              <div className="w-px h-14 bg-linear-to-b from-transparent via-red-800 to-transparent" />
              <div>
                <p className="text-red-600 font-black text-[38px] leading-none tracking-tight">
                  100<span className="text-red-600">%</span>
                </p>
                <p className="text-neutral-500 text-[13px] font-semibold uppercase tracking-wider mt-2">
                  gratuito
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — food icons */}
          <motion.div
            className="flex flex-wrap gap-6 max-w-lg lg:max-w-md justify-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          >
            {foods.map((food, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] } },
                }}
              >
                <food.icon
                  className={`${food.color} cursor-default select-none transition-[scale] duration-200 hover:scale-125`}
                  size={52}
                  weight="duotone"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
