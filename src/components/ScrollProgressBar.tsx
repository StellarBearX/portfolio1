import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  return (
    <motion.div
      style={{ width }}
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] shadow-lg"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] opacity-20 blur-sm"></div>
    </motion.div>
  )
}
