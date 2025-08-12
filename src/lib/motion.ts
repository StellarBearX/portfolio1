import type { Variants } from 'framer-motion'

export const textGradient =
  'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
}

export const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } }

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
}

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

export const floating: Variants = {
  hidden: { y: 0 },
  show: { 
    y: [-10, 10, -10],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    } 
  },
}

export const pulse: Variants = {
  hidden: { scale: 1 },
  show: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    } 
  },
}

export const magnetic: Variants = {
  hidden: { x: 0, y: 0 },
  show: { 
    x: [0, 10, 0],
    y: [0, -10, 0],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    } 
  },
}

export const wave: Variants = {
  hidden: { rotate: 0 },
  show: { 
    rotate: [0, 10, -10, 0],
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    } 
  },
}

export const bounce: Variants = {
  hidden: { y: 0 },
  show: { 
    y: [0, -20, 0],
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    } 
  },
}

export const shimmer: Variants = {
  hidden: { x: '-100%' },
  show: { 
    x: '100%',
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      ease: 'linear' 
    } 
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const cardHover: Variants = {
  hidden: { y: 0, scale: 1 },
  show: { 
    y: -10, 
    scale: 1.02,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 
    } 
  },
}

export const textReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: 'blur(10px)'
  },
  show: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 20,
      duration: 0.8
    } 
  },
}
