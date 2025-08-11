import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '@/data/config'
import ThemeToggle from './ThemeToggle'
import { useDarkMode } from '@/lib/useDarkMode'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { isDark, setIsDark } = useDarkMode()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-[var(--bg)]/95 backdrop-blur-xl border-l border-[var(--border)] shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <h2 className="text-xl font-bold gradient-text">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 p-6">
                <ul className="space-y-4">
                  {[
                    ['About', '#about'],
                    ['Projects', '#projects'],
                    ['Stack', '#stack'],
                    ['Contact', '#contact'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        onClick={onClose}
                        className="block p-3 rounded-xl text-lg font-medium text-[var(--fg)]/80 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-200"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Footer */}
              <div className="p-6 border-t border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--fg)]/60">Theme</span>
                  <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
                </div>
                
                <a
                  href="/resume.pdf"
                  className="block w-full text-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-3 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all duration-200"
                >
                  Download Resume
                </a>
                
                <div className="text-center text-xs text-[var(--fg)]/50">
                  © {new Date().getFullYear()} {SITE.name}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
