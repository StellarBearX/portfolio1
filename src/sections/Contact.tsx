import Section from '@/components/Section'
import SocialIcon from '@/components/SocialIcon'
import { SITE } from '@/data/config'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-[var(--fg)]/70 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and exciting projects. 
            Feel free to reach out if you'd like to collaborate or just want to say hello!
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <a 
              href={`mailto:${SITE.email}`} 
              className="block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-[var(--primary)]/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--fg)]/60 mb-1">Email</div>
                  <div className="text-lg font-semibold text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-300">
                    {SITE.email}
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Socials Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--secondary)]/20 to-[var(--accent)]/20 border border-[var(--secondary)]/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--fg)]/60">Socials</div>
                <div className="text-lg font-semibold text-[var(--fg)]">Connect with me</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {SITE.socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/20 border border-transparent transition-all duration-200 group"
                >
                  <SocialIcon name={social.icon} className="w-5 h-5 text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-200" />
                  <span className="font-medium text-[var(--fg)]/80 group-hover:text-[var(--primary)] transition-colors duration-200">
                    {social.label}
                  </span>
                  <svg className="w-4 h-4 ml-auto text-[var(--fg)]/40 group-hover:text-[var(--primary)] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--fg)]/60 mb-6">
            Let's build something amazing together!
          </p>
          <a 
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Start a conversation</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
