import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  href, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig)

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseXFromCenter = event.clientX - centerX
    const mouseYFromCenter = event.clientY - centerY
    
    mouseX.set(mouseXFromCenter / (rect.width / 2))
    mouseY.set(mouseYFromCenter / (rect.height / 2))
  }, [disabled, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true)
    }
  }, [disabled])

  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/50"
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`

  // Memoize particle effects to prevent recreation
  const particleEffects = useMemo(() => (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ 
            x: -2, 
            y: -2, 
            scale: 0,
            opacity: 0 
          }}
          animate={{
            x: Math.cos(i * 120 * Math.PI / 180) * 30 - 2,
            y: Math.sin(i * 120 * Math.PI / 180) * 30 - 2,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </>
  ), [])

  const ButtonContent = (
    <motion.div
      className="relative z-10"
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
      }}
    >
      {children}
    </motion.div>
  )

  const commonProps = {
    className: buttonClasses,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    whileTap: disabled ? undefined : { scale: 0.95 },
    disabled,
    'aria-disabled': disabled,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        {...commonProps}
        tabIndex={disabled ? -1 : 0}
      >
        {ButtonContent}
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !disabled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered && !disabled ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        
        {/* Particle effects */}
        {isHovered && !disabled && particleEffects}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...commonProps}
    >
      {ButtonContent}
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !disabled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered && !disabled ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Particle effects */}
      {isHovered && !disabled && particleEffects}
    </motion.button>
  )
}
