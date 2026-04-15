import { ArrowRight } from '@phosphor-icons/react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Plate background - large, faded */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[45%] sm:top-[40%] pointer-events-none">
        <img
          src="/plate.png"
          alt=""
          className="w-[90vw] max-w-[900px] h-auto opacity-20 blur-[1px] select-none"
          aria-hidden="true"
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto -mt-16 sm:-mt-20">
        <h1 className="font-black tracking-tighter leading-[0.88] text-[64px] md:text-[80px] lg:text-[92px] xl:text-[108px] mb-8">
          <span className="text-neutral-950">Domine </span>
          <span className="text-neutral-950">cada </span>
          <span className="text-red-600">refeição.</span>
        </h1>

        <div className="w-14 h-[3px] bg-red-600 mb-8" />

        <p className="text-neutral-500 text-[17px] leading-relaxed max-w-[420px] mb-10">
          Rastreie calorias e macros com precisão. Entenda o que você come,
          alcance suas metas e transforme sua relação com a comida.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/cadastro"
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 flex items-center gap-2 text-[15px] cursor-pointer"
          >
            Começar agora
            <ArrowRight size={17} weight="bold" />
          </a>
          <a
            href="#como-funciona"
            className="text-neutral-950 font-semibold px-8 py-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-150 text-[15px] cursor-pointer"
          >
            Ver como funciona
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
