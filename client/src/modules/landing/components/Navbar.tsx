import { useState, useEffect } from 'react'
import { Avocado } from '@phosphor-icons/react'

const overlayLinks = [
  { num: '01', label: 'Funcionalidades', href: '#funcionalidades' },
  { num: '02', label: 'Como funciona', href: '#como-funciona' },
  { num: '03', label: 'Preços', href: '#precos' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Links fade in only after blob finishes expanding
  useEffect(() => {
    if (!menuOpen) { setContentVisible(false); return }
    const t = setTimeout(() => setContentVisible(true), 420)
    return () => clearTimeout(t)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Logo — top left ── */}
      <a href="/" className="fixed top-6 left-6 z-30 flex items-center gap-2.5 group">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors duration-150">
          <Avocado size={18} color="white" weight="fill" />
        </div>
        <span className="text-neutral-950 font-bold text-[15px] tracking-tight">
          HealthCheck
        </span>
      </a>

      {/* ── Hamburger / X — always above blob ── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-7 right-7 z-50 flex flex-col gap-1.5 cursor-pointer p-1"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <span className={`block h-[2px] transition-all duration-300 origin-center ${
          menuOpen ? 'w-6 bg-white rotate-45 translate-y-[7px]' : 'w-6 bg-neutral-950'
        }`} />
        <span className={`block h-[2px] transition-all duration-300 ${
          menuOpen ? 'w-6 bg-white opacity-0' : 'w-4 bg-neutral-950'
        }`} />
        <span className={`block h-[2px] transition-all duration-300 origin-center ${
          menuOpen ? 'w-6 bg-white -rotate-45 -translate-y-[7px]' : 'w-5 bg-neutral-950'
        }`} />
      </button>

      {/* ── Giant ellipse — top/right go off-screen, left/bottom curves visible ── */}
      {menuOpen && (
        <div className="fixed -top-[10vh] -right-[10vw] w-[105vw] h-[125vh] bg-red-600 z-40 nav-blob-shape" />
      )}

      {/* ── Nav content — separate layer so it doesn't scale with blob ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Content starts at ~32% from left — safely inside the blob */}
          <div className={`h-full flex flex-col justify-center pl-[32%] pr-8 md:pr-20 pointer-events-auto transition-opacity duration-300 ${
            contentVisible ? 'opacity-100' : 'opacity-0'
          }`}>

            <nav>
              {overlayLinks.map(({ num, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={close}
                  className="group flex items-baseline gap-4 py-5 border-b border-white/20 hover:border-white transition-colors duration-150"
                >
                  <span className="text-white text-[11px] font-black font-mono shrink-0 w-5">
                    {num}
                  </span>
                  <span className="text-white text-3xl lg:text-5xl font-black tracking-tight leading-none group-hover:opacity-70 transition-opacity duration-150">
                    {label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="/entrar"
                onClick={close}
                className="text-white hover:opacity-70 text-sm font-medium transition-opacity duration-150"
              >
                Já tenho conta
              </a>
              <a
                href="/cadastro"
                className="bg-white hover:bg-neutral-100 text-red-600 text-sm font-bold px-6 py-3 rounded-xl transition-colors duration-150"
              >
                Começar grátis →
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
