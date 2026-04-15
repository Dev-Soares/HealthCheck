const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description:
      'Cadastre-se em 30 segundos. Defina suas metas de calorias e macros de acordo com seus objetivos.',
  },
  {
    number: '02',
    title: 'Registre suas refeições',
    description:
      'Busque alimentos, escaneie o código de barras ou crie refeições personalizadas com um clique.',
  },
  {
    number: '03',
    title: 'Evolua todo dia',
    description:
      'Veja seus relatórios, mantenha a sequência diária e alcance suas metas com consistência.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-3">
            Como funciona
          </p>
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter text-neutral-950 leading-none">
            Simples assim.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-neutral-200">
          {steps.map(({ number, title, description }, i) => (
            <div
              key={number}
              className={`py-8 md:py-0 ${i === 0 ? 'md:pr-10' : i === steps.length - 1 ? 'md:pl-10' : 'md:px-10'}`}
            >
              <p className="text-[96px] md:text-[80px] lg:text-[100px] font-black text-neutral-100 leading-none select-none tracking-tighter">
                {number}
              </p>
              <h3 className="text-xl font-black text-neutral-950 tracking-tight mt-2 mb-3">
                {title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-[280px]">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
