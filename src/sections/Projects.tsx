import Section from '@/components/Section'
import { PROJECTS } from '@/data/projects'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 20,
              delay: index * 0.1 
            }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/10"
          >
            {/* Image container */}
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img 
                src={project.cover} 
                alt={project.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <h4 className="text-xl font-bold text-[var(--fg)] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                {project.title}
              </h4>
              
              <p className="text-[var(--fg)]/70 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              
              {/* Tech stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
                <a 
                  href={project.repo} 
                  className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Repository
                </a>
                
                {project.demo && (
                  <a 
                    href={project.demo} 
                    className="flex items-center gap-2 text-sm font-medium text-[var(--secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
