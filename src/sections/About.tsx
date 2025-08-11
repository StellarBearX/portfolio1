import Section from '@/components/Section'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <Section id="about" title="About">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-[var(--fg)]/80">
              I'm a passionate full‑stack developer who cares about fundamentals - clean architecture, 
              comprehensive testing, and accessibility. Currently leveling up in Java/OOP and backend design.
            </p>
            
            <p className="text-lg leading-relaxed text-[var(--fg)]/70">
              I enjoy badminton, long‑term investing, and building tools that feel fast and friendly. 
              My goal is to create web experiences that are both beautiful and functional.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">What I do</h3>
            <div className="space-y-3">
              {[
                'Full-stack web development',
                'Clean code architecture',
                'Performance optimization',
                'User experience design',
                'Testing & quality assurance'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
                  <span className="text-[var(--fg)]/70">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
