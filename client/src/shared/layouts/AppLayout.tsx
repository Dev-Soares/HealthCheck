import { useState } from 'react'
import BlobMenu from './BlobMenu'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-50/90 backdrop-blur-sm border-b border-neutral-100 flex items-center px-4 sm:px-6 h-14 sm:h-16 md:h-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/logo.png" alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <span
            className="text-neutral-950 text-base sm:text-lg md:text-xl tracking-tighter"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
          >
            HealthCheck
          </span>
        </div>
      </header>

      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="fixed top-3.5 sm:top-4 md:top-5 right-4 sm:right-5 md:right-6 z-60 flex flex-col gap-1.5 sm:gap-2 cursor-pointer p-2"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <span className={`block h-0.75 transition-all duration-300 origin-center rounded-full ${menuOpen ? 'w-6 sm:w-7 bg-white rotate-45 translate-y-2.5 sm:translate-y-3' : 'w-6 sm:w-7 bg-neutral-950'}`} />
        <span className={`block h-0.75 transition-all duration-300 rounded-full ${menuOpen ? 'w-6 sm:w-7 bg-white opacity-0' : 'w-5 sm:w-6 bg-neutral-950'}`} />
        <span className={`block h-0.75 transition-all duration-300 origin-center rounded-full ${menuOpen ? 'w-6 sm:w-7 bg-white -rotate-45 -translate-y-2.5 sm:-translate-y-3' : 'w-5 sm:w-6 bg-neutral-950'}`} />
      </button>

      <BlobMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-14 sm:pt-16 md:pt-20">
        {children}
      </main>
    </div>
  )
}
