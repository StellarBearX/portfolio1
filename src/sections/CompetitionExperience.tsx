import Section from '@/components/Section'

const COMPETITIONS = [
  {
    name: 'Programming Challenge',
    year: 2024,
    award: 'Gold Medal',
    description: 'Competition in computer programming grades 10-12. National Arts and Crafts Student Competition, 70th Edition.',
    image: `${import.meta.env.BASE_URL}comp-ict.png`,
  },

  {
    name: 'CyberWarrior Hackathon',
    year: 2025,
    award: 'Participant',
    description: 'Web development and cybersecurity hackathon for university students.',
    image: `${import.meta.env.BASE_URL}classicKK.JPG`,
  },
]

export default function CompetitionExperience() {
  return (
    <Section id="competitions" title="Competition Experience">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETITIONS.map((c) => (
          <li key={c.name + c.year} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow flex flex-col items-center">
            {c.image && (
              <img src={c.image} alt={c.name + ' logo'} className="mb-3 h-20 w-20 object-cover rounded-full border border-[var(--border)] bg-white/10" />
            )}
            <div className="text-lg font-semibold text-[var(--primary)] text-center">{c.name}</div>
            <div className="mt-1 text-sm text-[var(--fg)]/80">{c.year} &middot; {c.award}</div>
            <div className="mt-2 text-sm text-[var(--fg)]/70 text-center">{c.description}</div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
