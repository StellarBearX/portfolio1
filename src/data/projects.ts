export type Project = {
  title: string
  description: string
  tech: string[]
  repo: string
  demo?: string
  cover: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Cybersecurity with CIB Police Th',
    description:
      'Interception of communications, and tracking of crypto-financial data.(NLP)',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python'],
    repo: 'https://github.com/StellarBearX/',
    demo: '#',
    cover:
      'public/classicKK.JPG'
      },
  {
    title: 'Portfolio Starter',
    description: 'This site. Clean, fast, animated, accessible.',
    tech: ['Vite', 'React', 'Tailwind', 'Motion'],
    repo: 'https://github.com/StellarBearX/portfolio',
    demo: '#',
    cover: 'public/pj1.png', 
     
  },
  
  {
    title: 'DII-GEN6-CompoundSEC',
    description:
      'A web dashboard for compound SEC data analysis and visualization. Built for DII GEN6.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Chart.js'],
    repo: 'https://github.com/StellarBearX/DII-GEN6-CompoundSEC',
    demo: '#',
    cover:'public/java_oop12.jpg'
  },
]
