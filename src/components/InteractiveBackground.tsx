import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  color: string
}

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingElements] = useState<FloatingElement[]>(() => {
    const colors = [
      'from-[var(--primary)]/30 to-[var(--secondary)]/30',
      'from-[var(--secondary)]/30 to-[var(--accent)]/30',
      'from-[var(--accent)]/30 to-[var(--purple)]/30',
      'from-[var(--purple)]/30 to-[var(--blue)]/30',
      'from-[var(--blue)]/30 to-[var(--teal)]/30',
      'from-[var(--teal)]/30 to-[var(--pink)]/30',
      'from-[var(--pink)]/30 to-[var(--indigo)]/30',
    ]
    
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2))
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Enhanced floating particles with new colors */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full bg-gradient-to-r ${element.color}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.5, 1.8, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 2,
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        />
      ))}

      {/* Enhanced mouse trail effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-[var(--primary)]/60 to-[var(--secondary)]/60 pointer-events-none"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          zIndex: 50,
        }}
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 0.9, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced magnetic grid effect with new colors */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/15 to-transparent"
            style={{
              left: `${(i / 25) * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleY: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-[var(--secondary)]/15 to-transparent"
            style={{
              top: `${(i / 20) * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced interactive orbs that follow mouse */}
      <motion.div
        className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-[var(--primary)]/8 to-[var(--secondary)]/8 blur-3xl"
        style={{
          x: useTransform(mouseX, [-1, 1], [-300, 300]),
          y: useTransform(mouseY, [-1, 1], [-300, 300]),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional smaller orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[var(--accent)]/6 to-[var(--purple)]/6 blur-2xl"
        style={{
          x: useTransform(mouseX, [-1, 1], [200, -200]),
          y: useTransform(mouseY, [-1, 1], [-200, 200]),
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced corner accents with new colors */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[var(--primary)]/25 to-transparent rounded-br-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[var(--secondary)]/25 to-transparent rounded-bl-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[var(--accent)]/25 to-transparent rounded-tr-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[var(--purple)]/25 to-transparent rounded-tl-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Floating geometric shapes with new colors */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className={`absolute w-4 h-4 bg-gradient-to-r ${
            i % 2 === 0 
              ? 'from-[var(--blue)]/30 to-[var(--teal)]/30' 
              : 'from-[var(--pink)]/30 to-[var(--indigo)]/30'
          } rounded-lg`}
          style={{
            left: `${20 + (i * 12)}%`,
            top: `${15 + (i * 10)}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Animated waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute h-px w-48 bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent"
          style={{
            left: `${10 + (i * 25)}%`,
            top: `${40 + (i * 15)}%`,
            transform: `rotate(${30 + i * 20}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scaleX: [0.5, 1.8, 0.5],
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
