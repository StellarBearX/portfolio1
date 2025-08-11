import React from "react";
import NavBar from "./components/NavBar";
import MobileMenu from "./components/MobileMenu";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import CompetitionExperience from "./sections/CompetitionExperience";
import Stack from "./sections/Stack";
import Contact from "./sections/Contact";
import { useDarkMode } from "./lib/useDarkMode";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "./data/config";

function AnimatedBackgroundOrbs() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, 0, -80, 0],
          y: [0, -40, 0, 40, 0],
          scale: [1, 1.2, 1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-10vw] top-[-10vw] z-0 h-[32vw] w-[32vw] rounded-full bg-gradient-to-r from-fuchsia-500/30 via-indigo-500/20 to-cyan-400/30 blur-3xl"
        aria-hidden
      />
      <motion.div
        animate={{
          x: [0, -60, 0, 60, 0],
          y: [0, 30, 0, -30, 0],
          scale: [1, 0.8, 1, 1.1, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8vw] bottom-[-8vw] z-0 h-[24vw] w-[24vw] rounded-full bg-gradient-to-r from-cyan-400/30 via-fuchsia-500/20 to-indigo-500/30 blur-3xl"
        aria-hidden
      />
      <motion.div
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [0, 60, 0, -60, 0],
          scale: [1, 1.3, 1, 0.8, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[20vw] bottom-[-12vw] z-0 h-[28vw] w-[28vw] rounded-full bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 blur-3xl"
        aria-hidden
      />
    </>
  );
}

export default function App() {
  const { isDark, setIsDark } = useDarkMode();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--primary)]/30 selection:text-white transition-colors duration-300 relative overflow-hidden">
      <AnimatedBackgroundOrbs />
      <ScrollProgressBar />
      <NavBar
        isDark={isDark}
        setIsDark={setIsDark}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <AnimatePresence>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </AnimatePresence>
      <main id="home" className="mx-auto max-w-6xl px-4 pt-28 lg:px-6">
        <Hero />
        <About />
        <Projects />
        <CompetitionExperience />
        <Stack />
        <Contact />
      </main>
      <footer className="border-t border-[var(--border)] bg-[var(--card)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--fg)]/70 sm:flex-row lg:px-6">
          <span className="font-medium">© {year} {SITE.name}</span>
          <a 
            href="#home" 
            className="group flex items-center gap-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
