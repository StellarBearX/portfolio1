import ThemeToggle from '@/components/ThemeToggle'
import MobileMenu from '@/components/MobileMenu'
import { useState } from 'react'
import { SITE } from '@/data/config'
import { useDarkMode } from '@/lib/useDarkMode'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  Trophy, 
  Zap, 
  Mail, 
  RotateCcw
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavBarProps {
  onMenuOpen: () => void;
}

export default function NavBar({ onMenuOpen }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const { isDark, setIsDark } = useDarkMode()
  
  const navigationItems: Array<[string, string, LucideIcon]> = [
    ['About', '#about', User],
    ['Projects', '#projects', Briefcase],
    ['Competition', '#competitions', Trophy],
    ['Stack', '#stack', Zap],
    ['Contact', '#contact', Mail],
  ]
  
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-4 mt-4 rounded-2xl border border-[var(--border)]/50 bg-[var(--bg)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/70 shadow-2xl shadow-[var(--primary)]/10">
      <nav className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex items-center justify-between py-4 md:py-5">
          <a href="#home" className="group font-bold tracking-tight transition-all duration-300 hover:scale-105">
            <span className={`text-xl md:text-2xl gradient-text group-hover:opacity-80`}>
              {SITE.name}
            </span>
          </a>
          
          <div className="hidden items-center gap-6 text-sm md:flex">
            {navigationItems.map(([label, href, IconComponent], index) => (
              <motion.a 
                key={label} 
                href={href} 
                className="relative text-[var(--fg)]/70 hover:text-[var(--primary)] transition-colors duration-300 group p-2 rounded-lg hover:bg-[var(--primary)]/10"
                title={label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2,
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.div>
                
                {/* Floating particles on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[var(--primary)] rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ 
                        x: -2, 
                        y: -2, 
                        scale: 0,
                        opacity: 0 
                      }}
                      whileHover={{
                        x: Math.cos(i * 120 * Math.PI / 180) * 20 - 2,
                        y: Math.sin(i * 120 * Math.PI / 180) * 20 - 2,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
                
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <motion.a
              href="/portfolio1/resume"
              className="hidden rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-3 text-[var(--primary)] hover:bg-[var(--primary)]/20 hover:scale-105 transition-all duration-300 md:inline-block hover:shadow-lg hover:shadow-[var(--primary)]/20"
              title="Reload"
              whileHover={{ 
                scale: 1.1,
                rotate: 180,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <RotateCcw className="w-5 h-5" />
              </motion.div>
            </motion.a>
            
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            
            <motion.button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all duration-300 md:hidden hover:shadow-lg hover:shadow-[var(--primary)]/20"
              onClick={onMenuOpen}
              aria-label="Open menu"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>
      
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
