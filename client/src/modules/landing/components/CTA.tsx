import { ArrowRight } from '@phosphor-icons/react'

export default function CTA() {
  return (
    <section className="relative bg-neutral-950 py-32 overflow-hidden">

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Secondary subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-red-400/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">

        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-widest">
            Comece agora
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[42px] md:text-[64px] lg:text-[80px] font-black tracking-tighter text-white leading-[0.95] mb-6">
          Sua melhor versão{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            começa hoje.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Junte-se a mais de 12 mil usuários que já transformaram sua relação com a alimentação.
        </p>

        {/* CTA Button with glow */}
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          <a
            href="/cadastro"
            className="relative inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-[15px]"
          >
            Criar conta grátis
            <ArrowRight size={17} weight="bold" />
          </a>
        </div>

      </div>
    </section>
  )
}
