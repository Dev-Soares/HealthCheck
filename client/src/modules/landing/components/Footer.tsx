import { Avocado } from '@phosphor-icons/react'

const links = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como funciona',   href: '#como-funciona' },
  { label: 'Preços',          href: '#precos' },
  { label: 'Privacidade',     href: '/privacidade' },
  { label: 'Termos',          href: '/termos' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <a href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
              <Avocado size={15} color="white" weight="fill" />
            </div>
            <span className="text-white font-bold text-sm tracking-tight">HealthCheck</span>
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-neutral-500 hover:text-neutral-300 transition-colors duration-150 text-xs"
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="text-neutral-600 text-xs">© 2025 HealthCheck</p>

        </div>
      </div>
    </footer>
  )
}
