import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { SITE } from '@/data/config'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 600], [0, -120])
  const orbScale = useTransform(scrollY, [0, 600], [1, 1.15])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleProfileHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseXFromCenter = event.clientX - centerX
    const mouseYFromCenter = event.clientY - centerY
    
    mouseX.set(mouseXFromCenter / (rect.width / 2))
    mouseY.set(mouseYFromCenter / (rect.height / 2))
  }

  const handleProfileLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <section className="relative py-24 sm:py-32">
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--primary)]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: '-20%' }} 
        variants={stagger}
        className="relative z-10"
      >
        {/* Profile image with enhanced effects */}
        <motion.div variants={fadeUp} className="mb-8">
          <motion.div 
            className="relative inline-block"
            onMouseMove={handleProfileHover}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleProfileLeave}
            style={{
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient border */}
            <motion.div 
              className="absolute inset-0 rounded-full p-1"
              animate={{
                background: [
                  'linear-gradient(45deg, var(--primary), var(--secondary), var(--accent))',
                  'linear-gradient(90deg, var(--accent), var(--primary), var(--secondary))',
                  'linear-gradient(180deg, var(--secondary), var(--accent), var(--primary))',
                  'linear-gradient(270deg, var(--primary), var(--secondary), var(--accent))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30 blur-xl"
              animate={{ 
                scale: isHovered ? 1.1 : 1,  // ลดขนาดลง
                opacity: isHovered ? 0.8 : 0.4
              }}
              transition={{ duration: 0.3 }}
            />
            
            <img
              src={SITE.profileImage}
              alt="Profile"
              className="relative h-48 w-48 rounded-full object-cover border-4 border-[var(--bg)]"
            />
            
            {/* Floating particles around profile */}
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[var(--accent)] rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: -24, 
                      y: -24, 
                      scale: 0,
                      opacity: 0 
                    }}
                    animate={{
                      x: Math.cos(i * 60 * Math.PI / 180) * 40 - 24,  // ลดระยะทางลง
                      y: Math.sin(i * 60 * Math.PI / 180) * 40 - 24,  // ลดระยะทางลง
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
        
        {/* Location badge with enhanced animation */}
        <motion.div variants={fadeUp} className="mb-4">
          <motion.p 
            className="text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full inline-block border border-[var(--primary)]/20"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
            transition={{ duration: 0.3 }}
          >
            📍 {SITE.location}
          </motion.p>
        </motion.div>
        
        {/* Main heading with enhanced gradient */}
        <motion.h1 variants={fadeUp} className="mb-4 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <motion.span 
            className="gradient-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            whileHover={{ 
              backgroundPosition: '200% center',
              transition: { duration: 0.5 }
            }}
          >
            {SITE.name}
          </motion.span>
        </motion.h1>
        
        {/* Role with typing effect */}
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl text-[var(--fg)]/80 md:text-3xl font-medium">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {SITE.role}
          </motion.span>
        </motion.h2>
        
        {/* Tagline with enhanced animation */}
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg text-[var(--fg)]/70 leading-relaxed">
          {SITE.tagline}
        </motion.p>
        
        {/* Enhanced CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <motion.a 
            href="#projects" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg"
            whileHover={{ 
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span className="relative z-10">View Projects</motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            />
          </motion.a>
          
          <motion.a 
            href={`mailto:${SITE.email}`} 
            className="group relative overflow-hidden rounded-2xl border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5 px-6 py-3 text-sm font-semibold text-[var(--primary)]"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              borderColor: 'var(--primary)',
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-[var(--primary)]/10 rounded-2xl"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
