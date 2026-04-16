import { useState, useEffect } from 'react'
import { ArrowRight, Lightning, Star } from '@phosphor-icons/react'

const navItems = [
  { label: 'Funcionalidades', href: '#funcionalidades', icon: Lightning },
  { label: 'Como funciona', href: '#como-funciona', icon: Star },
]

const linkClasses = ['nav-link-1', 'nav-link-2']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overlayMounted, setOverlayMounted] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const open = () => {
    setClosing(false)
    setOverlayMounted(true)
    setMenuOpen(true)
  }

  const close = () => {
    setMenuOpen(false)
    setClosing(true)
    const t = setTimeout(() => {
      setOverlayMounted(false)
      setClosing(false)
    }, 560)
    return () => clearTimeout(t)
  }

  const toggle = () => (menuOpen ? close() : open())

  return (
    <>
      {/* ── Logo — top left ── */}
      <a href="/" className="fixed top-6 left-6 z-30 flex items-center gap-1 group">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logo.png" alt="HealthCheck" className="w-full h-full object-contain" />
        </div>
        <span className="text-neutral-950 text-xl tracking-tighter" style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}>
          HealthCheck
        </span>
      </a>

      {/* ── Hamburger / X ── */}
      <button
        onClick={toggle}
        className="fixed top-7 right-7 z-50 flex flex-col gap-2 cursor-pointer p-2"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <span className={`block h-[3px] transition-all duration-300 origin-center ${
          menuOpen ? 'w-7 bg-white rotate-45 translate-y-[9px]' : 'w-7 bg-neutral-950'
        }`} />
        <span className={`block h-[3px] transition-all duration-300 ${
          menuOpen ? 'w-7 bg-white opacity-0' : 'w-6 bg-neutral-950'
        }`} />
        <span className={`block h-[3px] transition-all duration-300 origin-center ${
          menuOpen ? 'w-7 bg-white -rotate-45 -translate-y-[9px]' : 'w-6 bg-neutral-950'
        }`} />
      </button>

      {overlayMounted && (
        <>
          {/* ── Ink blob SVG ── */}
          <svg
            className={`fixed inset-0 w-full h-full z-40 ${closing ? 'nav-blob-closing' : 'nav-blob-shape'}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={closing ? '' : 'nav-blob-wave'}
              d="M 24 0 C 8 8, 0 22, 2 38 C 4 54, 22 58, 20 70 C 16 82, 6 86, 10 94 C 13 97, 16 99, 14 100 L 100 100 L 100 0 Z"
              fill="#dc2626"
            />
          </svg>

          {/* ── Nav content ── */}
          <div className="fixed inset-0 z-40 pointer-events-none">
             <div className={`h-full flex flex-col justify-around md:justify-center pl-[18%] sm:pl-[22%] md:pl-[26%] lg:pl-[30%] pr-6 sm:pr-8 md:pr-20 pointer-events-auto transition-opacity duration-150 ${
              closing ? 'opacity-0' : 'nav-content-fade'
            }`}>

              <nav className="flex flex-col gap-1 mt-20 md:mt-0">
                {navItems.map(({ label, href, icon: Icon }, i) => (
                  <a
                    key={label}
                    href={href}
                    onClick={close}
                    className={`group relative flex items-center gap-5 py-6 px-5 rounded-2xl hover:bg-white/10 transition-all duration-300 ${
                      closing ? '' : linkClasses[i]
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={22} color="white" weight="bold" />
                    </div>

                    <span className="text-white text-2xl lg:text-5xl font-black tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-300">
                      {label}
                    </span>

                    <ArrowRight
                      size={24}
                      color="white"
                      weight="bold"
                      className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </a>
                ))}
              </nav>

              <div className={` ml-4 mt-16 pl-5 flex flex-col sm:flex-row items-start gap-4 ${closing ? '' : 'nav-cta-enter'}`}>
                <a
                  href="/cadastro"
                  className="group bg-white text-red-600 text-sm font-bold px-8 py-3.5 rounded-full hover:bg-neutral-100 hover:shadow-lg hover:shadow-black/10 transition-all duration-200 flex items-center gap-2"
                >
                  Começar grátis
                  <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="/entrar"
                  onClick={close}
                  className="text-white hover:text-white text-sm font-bold bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 px-6 py-3.5 rounded-full transition-all duration-200"
                >
                  Já tenho conta
                </a>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  )
}
