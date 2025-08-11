import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

interface SectionProps {
  id?: string
  title: string
  children: React.ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"></div>
      </motion.div>
      
      <motion.div 
        variants={stagger} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
        className="mt-8"
      >
        <motion.div variants={fadeUp}>{children}</motion.div>
      </motion.div>
    </section>
  )
}
