import ThemeToggle from '@/components/ThemeToggle'
import MobileMenu from '@/components/MobileMenu'
import { useState } from 'react'
import { SITE } from '@/data/config'
import { useDarkMode } from '@/lib/useDarkMode'

interface NavBarProps {
  onMenuOpen: () => void;
}

export default function NavBar({ onMenuOpen }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const { isDark, setIsDark } = useDarkMode()
  
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/70 shadow-lg">
      <nav className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex items-center justify-between py-4 md:py-5">
          <a href="#home" className="group font-bold tracking-tight transition-all duration-300 hover:scale-105">
            <span className={`text-xl md:text-2xl gradient-text group-hover:opacity-80`}>
              {SITE.name}
            </span>
          </a>
          
          <div className="hidden items-center gap-6 text-sm md:flex">
            {[
              ['About', '#about'],
              ['Projects', '#projects'],
              ['Competition', '#competitions'],
              ['Stack', '#stack'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-slate-300 hover:text-white">
                {label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="/resume.pdf"
              className="hidden rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 hover:scale-105 transition-all duration-300 md:inline-block"
            >
              Resume
            </a>
            
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all duration-300 md:hidden"
              onClick={onMenuOpen}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
