import { ChartLine, MagnifyingGlass, Fire, Barbell, Camera } from '@phosphor-icons/react'

const macroRows = [
  { label: 'Proteína', cls: 'w-[82%]', bar: 'bg-red-500' },
  { label: 'Carbs',    cls: 'w-[68%]', bar: 'bg-neutral-500' },
  { label: 'Gordura',  cls: 'w-[91%]', bar: 'bg-neutral-400' },
]

export default function Features() {
  return (
    <section id="funcionalidades" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter text-neutral-950 leading-none">
            Tudo que você<br />
            <span className="text-red-600">precisa.</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-[220px] md:text-right">
            Cada recurso pensado para tornar o rastreio simples e eficaz.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Calorie tracking — dark, spans 2 cols on sm+ */}
          <div className="sm:col-span-2 bg-neutral-950 rounded-2xl p-8 flex flex-col gap-6 min-h-[260px]">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
              <ChartLine size={18} color="white" weight="bold" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight leading-tight mb-2">
                Rastreio de calorias<br />em tempo real
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                Acompanhe seu consumo ao longo do dia com progresso visual imediato.
              </p>
            </div>
            <div className="mt-auto space-y-2">
              {macroRows.map(({ label, cls, bar }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-500 w-14 shrink-0">{label}</span>
                  <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`${bar} ${cls} h-full rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food database — neutral-50 */}
          <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col justify-between min-h-[260px]">
            <div className="w-9 h-9 bg-white rounded-xl border border-neutral-200 flex items-center justify-center">
              <MagnifyingGlass size={18} weight="bold" color="#0a0a0a" />
            </div>
            <div>
              <p className="text-[52px] font-black text-neutral-950 leading-none tracking-tighter">100k+</p>
              <p className="text-sm font-bold text-neutral-700 mt-1">alimentos</p>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Base de dados brasileira atualizada e em crescimento constante.
              </p>
            </div>
          </div>

          {/* Streak — red */}
          <div className="bg-red-600 rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Fire size={18} color="white" weight="fill" />
            </div>
            <div>
              <p className="text-[44px] font-black text-white tracking-tighter leading-none">365</p>
              <p className="text-sm font-semibold text-red-100 mt-1">dias de sequência</p>
            </div>
          </div>

          {/* Macros — white card */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 flex flex-col justify-between min-h-[200px]">
            <div className="w-9 h-9 bg-neutral-950 rounded-xl flex items-center justify-center">
              <Barbell size={18} color="white" weight="bold" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-950 tracking-tight mb-2">
                Macros inteligentes
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Proteínas, carboidratos e gorduras. Distribuição automática por meta.
              </p>
            </div>
          </div>

          {/* Scan — dark */}
          <div className="bg-neutral-950 rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <div className="w-9 h-9 bg-neutral-800 rounded-xl flex items-center justify-center">
              <Camera size={18} color="white" weight="bold" />
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-tight mb-2">
                Scan de alimentos
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Escaneie o código de barras e registre instantaneamente.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
