import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

interface BlobMenuProps {
  isOpen: boolean
  onClose: () => void
}

const blobPath = 'M 24 0 C 8 8, 0 22, 2 38 C 4 54, 22 58, 20 70 C 16 82, 6 86, 10 94 C 13 97, 16 99, 14 100 L 100 100 L 100 0 Z'

const navItems = [
  { number: '01', label: 'Início', href: '/home' },
  { number: '02', label: 'Refeições', href: '/meals' },
  { number: '03', label: 'Alimentos', href: '/foods' },
  { number: '04', label: 'Perfil', href: '/profile' },
]

export default function BlobMenu({ isOpen, onClose }: BlobMenuProps) {
  const { pathname } = useLocation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onClick={onClose}
        >
          {/* Red blob — fills right area, organic left edge, transparent outside */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={blobPath} fill="#dc2626" />
          </svg>

          {/* Content — positioned inside red zone */}
          <div
            className="absolute inset-0 flex flex-col justify-around md:justify-center pl-[14%] sm:pl-[18%] md:pl-[22%] pr-6 sm:pr-10 md:pr-16 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nav items */}
            <nav className="flex flex-col mt-14 md:mt-0 pointer-events-auto">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    className="border-b border-white/20 first:border-t first:border-white/20"
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.07, ease: [0.34, 1.05, 0.64, 1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-4 py-5 sm:py-6"
                    >
                      <span className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest shrink-0">
                        {item.number}
                      </span>
                      <span
                        className={`font-black text-[38px] sm:text-[50px] lg:text-[62px] leading-none tracking-tight transition-all duration-200 group-hover:translate-x-2 ${
                          isActive ? 'text-white' : 'text-white/85 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <ArrowRight
                        size={20}
                        weight="bold"
                        className="ml-auto text-white opacity-0 -translate-x-3 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mt-8 md:mt-10 pointer-events-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white text-sm font-bold bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer"
              >
                Sair da conta
              </button>
              <Link
                to="/profile"
                onClick={onClose}
                className="group bg-white text-red-600 text-sm font-bold px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-all duration-200 flex items-center gap-2"
              >
                Meu perfil
                <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
