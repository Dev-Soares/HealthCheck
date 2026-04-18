import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const ease = [0.34, 1.05, 0.64, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
})

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Plate background */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[45%] sm:top-[40%] pointer-events-none">
        <motion.img
          src="/plate.png"
          alt=""
          className="w-[90vw] max-w-225 h-auto opacity-20 blur-[1px] select-none"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto -mt-16 sm:-mt-20">

        <motion.h1
          className="font-black tracking-tighter leading-[0.88] text-[64px] md:text-[80px] lg:text-[92px] xl:text-[108px] mb-8"
          {...fadeUp(0.08)}
        >
          <span className="text-neutral-950">Domine </span>
          <span className="text-neutral-950">cada </span>
          <span className="text-red-600">refeição.</span>
        </motion.h1>

        <motion.div
          className="w-14 h-0.75 bg-red-600 mb-8"
          {...fadeUp(0.22)}
        />

        <motion.p
          className="text-neutral-500 text-[17px] leading-relaxed max-w-105 mb-10"
          {...fadeUp(0.36)}
        >
          Rastreie calorias e macros com precisão. Entenda o que você come,
          alcance suas metas e transforme sua relação com a comida.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          {...fadeUp(0.5)}
        >
          <a
            href="/create-account"
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 flex items-center gap-2 text-[15px] cursor-pointer"
          >
            Começar agora
            <ArrowRight size={17} weight="bold" />
          </a>
          <a
            href="#funcionalidades"
            className="text-neutral-950 font-semibold px-8 py-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-150 text-[15px] cursor-pointer"
          >
            Ver funcionalidades
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
