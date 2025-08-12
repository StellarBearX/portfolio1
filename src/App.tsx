import React from "react";
import NavBar from "./components/NavBar";
import MobileMenu from "./components/MobileMenu";
import ScrollProgressBar from "./components/ScrollProgressBar";
import InteractiveBackground from "./components/InteractiveBackground";
import FloatingElements from "./components/FloatingElements";
import ParticleSystem from "./components/ParticleSystem";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import CompetitionExperience from "./sections/CompetitionExperience";
import Stack from "./sections/Stack";
import Contact from "./sections/Contact";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "./data/config";

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--primary)]/30 selection:text-white transition-colors duration-300 relative">
      {/* Enhanced background effects - lower z-index */}
      <div style={{ zIndex: 1 }}>
        <InteractiveBackground />
        <FloatingElements />
        <ParticleSystem />
      </div>
      
    
      <div className="fixed inset-0 pointer-events-none w-full h-full" style={{ zIndex: 2 }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 
                ? 'bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30'
                : i % 3 === 1
                ? 'bg-gradient-to-r from-[var(--accent)]/30 to-[var(--purple)]/30'
                : 'bg-gradient-to-r from-[var(--blue)]/30 to-[var(--teal)]/30'
            }`}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.5, 1.6, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Enhanced animated lines with new colors */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className={`absolute h-px w-40 bg-gradient-to-r from-transparent ${
              i % 2 === 0
                ? 'via-[var(--primary)]/40 to-transparent'
                : 'via-[var(--accent)]/40 to-transparent'
            }`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${30 + (i * 8)}%`,
              transform: `rotate(${45 + i * 15}deg)`,
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

        {/* New floating elements with different shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute w-4 h-4 ${
              i % 2 === 0 
                ? 'bg-gradient-to-r from-[var(--purple)]/25 to-[var(--pink)]/25 rounded-lg'
                : 'bg-gradient-to-r from-[var(--teal)]/25 to-[var(--blue)]/25 transform rotate-45'
            }`}
            style={{
              left: `${25 + (i * 18)}%`,
              top: `${45 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -35, 0],
              rotate: [0, 180, 360],
              scale: [0.7, 1.4, 0.7],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <ScrollProgressBar />
      <NavBar
        onMenuOpen={() => setMenuOpen(true)}
      />
      <AnimatePresence>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </AnimatePresence>
      
      <main id="home" className="mx-auto max-w-6xl px-4 pt-28 lg:px-6 relative z-10">
        <Hero />
        <About />
        <Projects />
        <CompetitionExperience />
        <Stack />
        <Contact />
      </main>
      
      <footer className="border-t border-[var(--border)] bg-[var(--card)] backdrop-blur-sm relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--fg)]/70 sm:flex-row lg:px-6">
          <motion.span 
            className="font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            © {year} {SITE.name}
          </motion.span>
          <motion.a 
            href="#home" 
            className="group flex items-center gap-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <motion.svg 
              className="w-4 h-4 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
