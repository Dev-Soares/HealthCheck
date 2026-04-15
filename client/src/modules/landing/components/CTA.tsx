import { ArrowRight } from '@phosphor-icons/react'

export default function CTA() {
  return (
    <section className="bg-neutral-950 py-28">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest mb-6">
          Comece agora
        </p>

        <h2 className="text-[40px] md:text-[64px] lg:text-[80px] font-black tracking-tighter text-white leading-[0.9] mb-8">
          Sua melhor versão<br />
          <span className="text-red-500">começa hoje.</span>
        </h2>

        <p className="text-neutral-400 text-base max-w-md mx-auto mb-10 leading-relaxed">
          Junte-se a mais de 12 mil usuários que já transformaram sua relação com a alimentação.
        </p>

        <a
          href="/cadastro"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-10 py-4 rounded-xl transition-colors duration-150 text-[15px]"
        >
          Criar conta grátis
          <ArrowRight size={17} weight="bold" />
        </a>

      </div>
    </section>
  )
}
