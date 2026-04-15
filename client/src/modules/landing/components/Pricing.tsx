import { CheckCircle } from '@phosphor-icons/react'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para começar a monitorar sua alimentação.',
    features: [
      'Até 50 alimentos por dia',
      'Rastreio de calorias',
      'Histórico de 7 dias',
      'Metas básicas',
    ],
    cta: 'Começar grátis',
    href: '/cadastro',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'R$ 19',
    period: ',90/mês',
    description: 'Para quem leva saúde a sério.',
    features: [
      'Alimentos ilimitados',
      'Macros detalhados',
      'Histórico completo',
      'Relatórios avançados',
      'Scan de código de barras',
      'Suporte prioritário',
    ],
    cta: 'Assinar agora',
    href: '/cadastro?plan=pro',
    highlight: true,
  },
]

export default function Pricing() {
  return (
    <section id="precos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter text-neutral-950 leading-none">
            Preço justo.<br />
            <span className="text-red-600">Sem surpresas.</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-[200px] md:text-right">
            Comece de graça e evolua quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-red-600'
                  : 'bg-neutral-50 border border-neutral-100'
              }`}
            >
              <div className="mb-6">
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
                  plan.highlight ? 'text-red-200' : 'text-neutral-400'
                }`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-0.5">
                  <span className={`text-5xl font-black tracking-tighter leading-none ${
                    plan.highlight ? 'text-white' : 'text-neutral-950'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-medium mb-1 ${
                    plan.highlight ? 'text-red-200' : 'text-neutral-500'
                  }`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-3 leading-relaxed ${
                  plan.highlight ? 'text-red-100' : 'text-neutral-500'
                }`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={16}
                      weight="fill"
                      color={plan.highlight ? 'white' : '#0a0a0a'}
                      className="shrink-0 mt-0.5"
                    />
                    <span className={`text-sm ${
                      plan.highlight ? 'text-red-50' : 'text-neutral-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`text-center font-bold text-sm py-3.5 rounded-xl transition-colors duration-150 ${
                  plan.highlight
                    ? 'bg-white text-red-600 hover:bg-neutral-100'
                    : 'bg-neutral-950 text-white hover:bg-neutral-800'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
