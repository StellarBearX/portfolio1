import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: 'circle' | 'square' | 'diamond'
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
        mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
      }
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const colors = [
      'from-[var(--primary)]/70 to-[var(--secondary)]/70',
      'from-[var(--secondary)]/70 to-[var(--accent)]/70',
      'from-[var(--accent)]/70 to-[var(--purple)]/70',
      'from-[var(--purple)]/70 to-[var(--blue)]/70',
      'from-[var(--blue)]/70 to-[var(--teal)]/70',
      'from-[var(--teal)]/70 to-[var(--pink)]/70',
      'from-[var(--pink)]/70 to-[var(--indigo)]/70',
    ]
    const types: Particle['type'][] = ['circle', 'square', 'diamond']

    const createParticle = (x: number, y: number): Particle => ({
      id: Date.now() + Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      size: Math.random() * 10 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      maxLife: Math.random() * 120 + 60,
      type: types[Math.floor(Math.random() * types.length)],
    })

    const updateParticles = () => {
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter(particle => particle.life < particle.maxLife)

        // Add new particles when mouse is down
        if (isMouseDown && Math.random() < 0.4) {
          updated.push(createParticle(mousePosition.x, mousePosition.y))
        }

        // Add random particles
        if (Math.random() < 0.15) {
          updated.push(createParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          ))
        }

        return updated.slice(0, 120) // Limit to 120 particles
      })
    }

    const interval = setInterval(updateParticles, 16) // 60fps
    return () => clearInterval(interval)
  }, [isMouseDown, mousePosition])

  const renderParticle = (particle: Particle) => {
    const baseClasses = `absolute bg-gradient-to-r ${particle.color}`
    
    switch (particle.type) {
      case 'circle':
        return (
          <motion.div
            key={particle.id}
            className={`${baseClasses} rounded-full`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, particle.life / particle.maxLife, 0],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )
      
      case 'square':
        return (
          <motion.div
            key={particle.id}
            className={`${baseClasses} rounded-md`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, particle.life / particle.maxLife, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )
      
      case 'diamond':
        return (
          <motion.div
            key={particle.id}
            className={`${baseClasses} transform rotate-45`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, particle.life / particle.maxLife, 0],
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div ref={canvasRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced particles with new colors */}
      {particles.map(renderParticle)}

      {/* Enhanced mouse interaction particles */}
      {isMouseDown && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`mouse-${i}`}
              className="absolute w-3 h-3 bg-gradient-to-r from-[var(--primary)]/90 to-[var(--secondary)]/90 rounded-full"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 1 
              }}
              animate={{
                x: Math.cos(i * 45 * Math.PI / 180) * 60,
                y: Math.sin(i * 45 * Math.PI / 180) * 60,
                scale: [0, 1.2, 0],
                opacity: [1, 0.6, 0],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* Enhanced magnetic field with new colors */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[var(--primary)]/12 to-[var(--secondary)]/12 blur-3xl"
        style={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional magnetic fields */}
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[var(--accent)]/8 to-[var(--purple)]/8 blur-2xl"
        style={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
        }}
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced energy waves with new colors */}
      {isMouseDown && (
        <>
          <motion.div
            className="absolute rounded-full border-2 border-[var(--primary)]/40"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: 0,
              height: 0,
            }}
            initial={{ 
              width: 0, 
              height: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              width: 250,
              height: 250,
              x: -125,
              y: -125,
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute rounded-full border-2 border-[var(--accent)]/30"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: 0,
              height: 0,
            }}
            initial={{ 
              width: 0, 
              height: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              width: 180,
              height: 180,
              x: -90,
              y: -90,
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.2,
            }}
          />
        </>
      )}

      {/* Enhanced connection lines between nearby particles with new colors */}
      {particles.slice(0, 25).map((particle, i) => {
        const nearbyParticles = particles
          .slice(i + 1, Math.min(i + 12, particles.length))
          .filter(other => {
            const distance = Math.sqrt(
              Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
            )
            return distance < 120
          })

        return nearbyParticles.map((other, j) => (
          <motion.div
            key={`line-${particle.id}-${other.id}`}
            className="absolute h-px bg-gradient-to-r from-[var(--primary)]/25 to-[var(--secondary)]/25"
            style={{
              left: particle.x,
              top: particle.y,
              width: Math.sqrt(
                Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
              ),
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(other.y - particle.y, other.x - particle.x)}rad)`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))
      })}

      {/* Floating energy orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${
            i % 2 === 0 
              ? 'from-[var(--purple)]/40 to-[var(--pink)]/40' 
              : 'from-[var(--blue)]/40 to-[var(--teal)]/40'
          }`}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 12)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [0.8, 1.3, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
