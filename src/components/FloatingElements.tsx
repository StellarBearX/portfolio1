import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FloatingElement {
  id: string
  x: number
  y: number
  size: number
  type: 'circle' | 'square' | 'triangle' | 'diamond' | 'star' | 'hexagon'
  color: string
  delay: number
  duration: number
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      const colors = [
        'from-[var(--primary)]/25 to-[var(--secondary)]/25',
        'from-[var(--secondary)]/25 to-[var(--accent)]/25',
        'from-[var(--accent)]/25 to-[var(--purple)]/25',
        'from-[var(--purple)]/25 to-[var(--blue)]/25',
        'from-[var(--blue)]/25 to-[var(--teal)]/25',
        'from-[var(--teal)]/25 to-[var(--pink)]/25',
        'from-[var(--pink)]/25 to-[var(--indigo)]/25',
        'from-[var(--indigo)]/25 to-[var(--primary)]/25',
      ]
      const types: FloatingElement['type'][] = ['circle', 'square', 'triangle', 'diamond', 'star', 'hexagon']

      for (let i = 0; i < 30; i++) {
        newElements.push({
          id: `element-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 8,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 3,
          duration: Math.random() * 4 + 3,
        })
      }
      setElements(newElements)
    }

    generateElements()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const renderElement = (element: FloatingElement) => {
    const baseClasses = `absolute bg-gradient-to-br ${element.color}`
    
    switch (element.type) {
      case 'circle':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} rounded-full`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 25 - 12.5, 0],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.8,
              opacity: 1,
              transition: { duration: 0.3 },
            }}
          />
        )
      
      case 'square':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} rounded-lg`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [0.9, 1.2, 0.9],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.5,
              rotate: 45,
              transition: { duration: 0.3 },
            }}
          />
        )
      
      case 'triangle':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} w-0 h-0`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid currentColor`,
            }}
            animate={{
              y: [0, -60, 0],
              rotate: [0, 120, 240],
              scale: [0.7, 1.4, 0.7],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.6,
              rotate: 180,
              transition: { duration: 0.3 },
            }}
          />
        )
      
      case 'diamond':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} transform rotate-45`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -45, 0],
              rotate: [45, 225, 405],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.7,
              rotate: 90,
              transition: { duration: 0.3 },
            }}
          />
        )

      case 'star':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} w-0 h-0 relative`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -55, 0],
              rotate: [0, 144, 288],
              scale: [0.6, 1.5, 0.6],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.9,
              rotate: 360,
              transition: { duration: 0.3 },
            }}
          >
            <div 
              className="absolute w-0 h-0"
              style={{
                borderLeft: `${element.size / 2}px solid transparent`,
                borderRight: `${element.size / 2}px solid transparent`,
                borderBottom: `${element.size}px solid currentColor`,
                top: '0',
                left: '-50%',
              }}
            />
            <div 
              className="absolute w-0 h-0"
              style={{
                borderLeft: `${element.size / 2}px solid transparent`,
                borderRight: `${element.size / 2}px solid transparent`,
                borderTop: `${element.size}px solid currentColor`,
                bottom: '0',
                left: '-50%',
              }}
            />
          </motion.div>
        )

      case 'hexagon':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} relative`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 60, 120],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.6,
              rotate: 180,
              transition: { duration: 0.3 },
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(renderElement)}
      
      {/* Enhanced interactive cursor trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary)]/50 to-[var(--secondary)]/50 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: [0, 1.3, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Enhanced magnetic field effect */}
      <motion.div
        className="fixed w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-[var(--primary)]/8 to-[var(--secondary)]/8 blur-3xl pointer-events-none"
        style={{
          x: mousePosition.x - 224,
          y: mousePosition.y - 224,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional smaller magnetic field */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-[var(--accent)]/6 to-[var(--purple)]/6 blur-2xl pointer-events-none"
        style={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
