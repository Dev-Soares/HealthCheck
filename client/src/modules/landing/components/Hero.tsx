import { ArrowRight } from '@phosphor-icons/react'

const stats = [
  { value: '12.847', label: 'usuários ativos' },
  { value: '4.8★', label: 'avaliação média' },
  { value: '100%', label: 'grátis p/ começar' },
]

const meals = [
  { name: 'Café da manhã', kcal: '420 kcal', time: '08:30' },
  { name: 'Almoço', kcal: '680 kcal', time: '12:45' },
  { name: 'Lanche da tarde', kcal: '210 kcal', time: '16:00' },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-28">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Headline */}
            <h1 className="font-black tracking-tighter leading-[0.88] text-[64px] md:text-[80px] lg:text-[92px] xl:text-[108px]">
              <span className="block text-neutral-950">Domine</span>
              <span className="block text-neutral-950">cada</span>
              <span className="block text-red-600">refeição.</span>
            </h1>

            {/* Red rule */}
            <div className="w-14 h-[3px] bg-red-600 mt-9 mb-8" />

            {/* Body copy */}
            <p className="text-neutral-500 text-[17px] leading-relaxed max-w-[420px]">
              Rastreie calorias e macros com precisão. Entenda o que você come,
              alcance suas metas e transforme sua relação com a comida.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-10">
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

          {/* ── Right: App mockup ── */}
          <div className="relative">
            {/* Soft red glow behind card */}
            <div className="absolute -inset-5 bg-red-50 rounded-[28px] -z-10" />

            {/* The card */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-xl shadow-neutral-200/60 p-6">

              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                    hoje
                  </p>
                  <p className="text-sm font-semibold text-neutral-800 mt-0.5">
                    Segunda, 14 abr
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Ao vivo
                </div>
              </div>

              {/* Calorie counter */}
              <div className="mb-6">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-[44px] font-black text-neutral-950 leading-none tracking-tight">
                      2.450
                    </p>
                    <p className="text-xs text-neutral-400 mt-2">de 2.800 kcal</p>
                  </div>
                  <div className="text-right pb-1">
                    <p className="text-base font-bold text-neutral-700">350</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">restando</p>
                  </div>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-red-600 h-2.5 rounded-full w-[87%]" />
                </div>
              </div>

              {/* Macros */}
              <div className="space-y-3.5 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-neutral-500">Proteína</span>
                    <span className="text-xs font-semibold text-neutral-700">165g / 200g</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-neutral-700 h-1.5 rounded-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-neutral-500">Carboidratos</span>
                    <span className="text-xs font-semibold text-neutral-700">245g / 280g</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-neutral-700 h-1.5 rounded-full w-[87%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-neutral-500">Gorduras</span>
                    <span className="text-xs font-semibold text-neutral-700">78g / 85g</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-neutral-700 h-1.5 rounded-full w-[91%]" />
                  </div>
                </div>
              </div>

              {/* Recent meals */}
              <div className="border-t border-neutral-100 pt-4">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mb-3">
                  Últimas refeições
                </p>
                <div className="space-y-2">
                  {meals.map(({ name, kcal, time }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-700">{name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-neutral-400">{time}</span>
                        <span className="text-xs font-semibold text-neutral-600">{kcal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
