'use client'

import { motion } from 'framer-motion'
import { FacebookIcon } from '@/app/components/icons/FacebookIcon'
import { InstagramIcon } from '@/app/components/icons/InstagramIcon'
import { LinkedInIcon } from '@/app/components/icons/LinkedInIcon'
import Header from '@/app/components/public/layout/Header'
import PageHero from '@/app/components/public/layout/PageHero'
import { PrimaryDateMarquee } from '@/app/components/public/sections/PrimaryDateMarquee'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { VolunteerSubmissionForm } from '@/app/components/public/forms/VolunteerSubmissionForm'
import Picture from '@/app/components/elements/Picture'
import { PageField } from '@/types/page.types'
import { getField } from '@/app/lib/utils/page.utils'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'

export default function ContactPage({ content }: { content: PageField[] }) {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Cubes />
      <Header />

      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={getField(content, 'contact_hero_eyebrow', 'Forward. Together')}
          title={getField(content, 'contact_hero_title', 'Join the')}
          titleAccent={getField(content, 'contact_hero_title_accent', 'Team')}
          description={getField(
            content,
            'contact_hero_description',
            'Ready to make a difference in the 9th Essex District?'
          )}
          image="zosia-17.png"
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-16">
              <VolunteerSubmissionForm />

              {/* Election CTA */}
              <motion.div
                {...fadeUp(0.6)}
                className="relative overflow-hidden border border-border-light dark:border-border-dark"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative h-full flex items-end">
                    <Picture
                      src="/images/zosia-4.webp"
                      alt="Zosia VanMeter"
                      className="w-full h-full aspect-square object-cover scale-x-[-1]"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-surface-light dark:to-surface-dark hidden sm:block" />
                    <div className="absolute inset-0 bg-linear-to-t from-surface-light dark:from-surface-dark to-transparent sm:hidden" />
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark p-8 flex flex-col justify-center gap-5">
                    <div>
                      <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2">
                        {getField(content, 'contact_election_eyebrow', 'Primary Election')}
                      </p>
                      <p className="font-archivo text-3xl font-black uppercase text-text-light dark:text-text-dark leading-none">
                        {getField(content, 'contact_election_date', 'September 1, 2026')}
                      </p>
                    </div>
                    <div aria-hidden="true" className="w-10 h-px bg-border-light dark:bg-border-dark" />
                    <p className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                      {getField(
                        content,
                        'contact_election_body',
                        "Make sure you're registered to vote in Massachusetts before the August 12th deadline."
                      )}
                    </p>
                    <a
                      href="https://www.sec.state.ma.us/ovr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Register to vote in Massachusetts (opens in new tab)"
                      className="font-archivo px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-secondary-light dark:bg-secondary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light transition-opacity duration-200 min-h-11 flex items-center justify-center"
                    >
                      Register to Vote →
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Aside */}
            <motion.aside
              {...fadeUp(0.3)}
              aria-label="Connect with Zosia"
              className="flex flex-col gap-6 lg:sticky lg:top-8"
            >
              <div className="border-l-2 border-primary-light dark:border-primary-dark pl-5 py-1">
                <blockquote className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed italic">
                  {getField(content, 'contact_aside_quote')}
                </blockquote>
                <p className="font-archivo text-[10px] tracking-[0.15em] uppercase text-primary-light dark:text-primary-dark mt-3">
                  {getField(content, 'contact_aside_quote_attribution', '— Zosia VanMeter')}
                </p>
              </div>

              <div aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              <div className="flex flex-col gap-3">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  {getField(content, 'contact_aside_social_label', 'Follow the Campaign')}
                </p>
                {[
                  {
                    icon: FacebookIcon,
                    label: '@realzvm on Facebook',
                    href: 'https://www.facebook.com/realzvm',
                    ariaLabel: 'Follow Zosia on Facebook (opens in new tab)'
                  },
                  {
                    icon: InstagramIcon,
                    label: '@realzvm on Instagram',
                    href: 'https://www.instagram.com/realzvm',
                    ariaLabel: 'Follow Zosia on Instagram (opens in new tab)'
                  },
                  {
                    icon: LinkedInIcon,
                    label: '@zvm on LinkedIn',
                    href: 'https://www.linkedin.com/in/realzvm',
                    ariaLabel: 'Follow Zosia on LinkedIn (opens in new tab)'
                  }
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="flex items-center gap-3 text-sm font-inter text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                  >
                    <social.icon />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>

              <div aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              <div className="flex flex-col gap-3">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  {getField(content, 'contact_aside_donate_label', 'Support the Campaign')}
                </p>
                <p className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                  {getField(
                    content,
                    'contact_aside_donate_body',
                    'Every contribution helps us reach more voters across the 9th Essex District.'
                  )}
                </p>
                <a
                  href="https://secure.actblue.com/donate/2teamzvm "
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                  className="font-archivo px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-cta-light dark:bg-cta-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-light transition-opacity duration-200 min-h-11 flex items-center justify-center"
                >
                  Donate via ActBlue
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <PrimaryDateMarquee />
    </div>
  )
}
