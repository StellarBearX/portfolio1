import type { Variants } from 'framer-motion'

export const textGradient =
  'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
}

export const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } }
