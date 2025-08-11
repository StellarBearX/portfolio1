import Section from '@/components/Section'
import { SITE } from '@/data/config'
import { motion } from 'framer-motion'

export default function Stack() {
  const techCategories = [
    {
      name: 'Frontend',
      tech: ['React', 'TypeScript', 'Tailwind']
    },
    {
      name: 'Backend',
      tech: ['Node.js', 'Java', 'PostgreSQL']
    },
    {
      name: 'Tools',
      tech: ['Docker', 'GitHub Actions', 'Git']
    }
  ]

  return (
    <Section id="stack" title="Tech Stack">
      <div className="max-w-4xl mx-auto">
        {/* All tech tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-[var(--fg)]/80 mb-6 text-center">Technologies I work with</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SITE.tech.map((tech, index) => (
              <motion.span 
                key={tech} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 hover:scale-105 transition-all duration-200 shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Categorized tech */}
        <div className="grid gap-8 md:grid-cols-3">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="text-center"
            >
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]"></div>
                </div>
                <h4 className="text-lg font-semibold text-[var(--fg)] mb-3">{category.name}</h4>
              </div>
              
              <div className="space-y-2">
                {category.tech.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (techIndex * 0.1) }}
                    className="text-[var(--fg)]/70 hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
