

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
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="HealthCheck" className="w-full h-full object-contain" />
            </div>
            <span className="text-white text-base tracking-tighter" style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}>HealthCheck</span>
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
