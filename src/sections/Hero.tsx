import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { SITE } from '@/data/config'

export default function Hero() {
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 600], [0, -120])
  const orbScale = useTransform(scrollY, [0, 600], [1, 1.15])

  return (
    <section className="relative py-24 sm:py-32">
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: '-20%' }} 
        variants={stagger}
        className="relative z-10"
      >
        {/* Profile image with gradient border */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] p-1 animate-pulse"></div>
            <img
              src={SITE.profileImage}
              alt="Profile"
              className="relative h-48 w-48 rounded-full object-cover border-4 border-[var(--bg)]"
            />
          </div>
        </motion.div>
        
        <motion.p variants={fadeUp} className="mb-4 text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full inline-block">
          📍 {SITE.location}
        </motion.p>
        
        <motion.h1 variants={fadeUp} className="mb-4 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <span className="gradient-text">{SITE.name}</span>
        </motion.h1>
        
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl text-[var(--fg)]/80 md:text-3xl font-medium">
          {SITE.role}
        </motion.h2>
        
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg text-[var(--fg)]/70 leading-relaxed">
          {SITE.tagline}
        </motion.p>
        
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a 
            href={`mailto:${SITE.email}`} 
            className="rounded-2xl border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5 px-6 py-3 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/50 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
      
      {/* Enhanced parallax orbs */}
      <motion.div 
        style={{ y: orbY, scale: orbScale }} 
        className="pointer-events-none absolute left-1/2 top-[-15rem] -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/20 via-[var(--secondary)]/15 to-[var(--accent)]/20 blur-3xl" 
        aria-hidden 
      />
      
      <motion.div 
        style={{ y: orbY, scale: orbScale }} 
        className="pointer-events-none absolute right-0 top-[-5rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-[var(--accent)]/15 to-[var(--success)]/10 blur-3xl" 
        aria-hidden 
      />
      
      <motion.div 
        style={{ y: orbY, scale: orbScale }} 
        className="pointer-events-none absolute left-0 top-[10rem] -z-10 h-[25rem] w-[25rem] rounded-full bg-gradient-to-r from-[var(--warning)]/10 to-[var(--error)]/5 blur-3xl" 
        aria-hidden 
      />
    </section>
  )
}
