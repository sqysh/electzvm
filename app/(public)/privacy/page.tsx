import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Elect ZVM',
  description: 'Privacy Policy for the Zosia VanMeter for State Representative campaign.'
}

const LAST_UPDATED = 'May 17, 2026'

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen w-full bg-bg-light dark:bg-bg-dark">
      {/* Hero */}
      <div className="w-full bg-hero-light dark:bg-hero-dark border-b border-white/10 pt-12 pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
            Legal · Elect ZVM
          </p>
          <h1 className="font-archivo text-4xl sm:text-5xl font-black uppercase text-white leading-none">
            Privacy <span className="text-primary-dark">Policy</span>
          </h1>
          <p className="font-mono text-[11px] text-white/30 mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
        <div className="flex flex-col gap-12">
          <Section title="Overview">
            <p>
              This Privacy Policy describes how the Committee to Elect Zosia VanMeter (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects information submitted through this
              website at electzvm.com. We are committed to protecting your privacy and handling your information with
              transparency.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              We collect information you voluntarily provide when you submit the volunteer contact form on this site.
              This may include:
            </p>
            <ul className="flex flex-col gap-2 mt-4 pl-4 border-l border-border-light dark:border-border-dark">
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Your first and last name
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Your email address
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Your phone number
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Your volunteer interests (mailing list, yard sign, door knocking)
              </li>
            </ul>
            <p className="mt-4">
              We do not collect any information from visitors who simply browse the site without submitting a form.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>Information submitted through the volunteer form is used solely for campaign purposes, including:</p>
            <ul className="flex flex-col gap-2 mt-4 pl-4 border-l border-border-light dark:border-border-dark">
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Coordinating volunteer activities and outreach
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Sending campaign updates and communications if you opted in
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Contacting you regarding yard sign placement if requested
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Organizing door knocking events if you expressed interest
              </li>
            </ul>
          </Section>

          <Section title="Third-Party Services">
            <p>We use the following third-party services to operate this site and manage campaign communications:</p>
            <div className="flex flex-col gap-3 mt-4 border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
              {[
                {
                  name: 'Mailchimp',
                  desc: 'If you opted into our mailing list, your name and email are stored in Mailchimp to send campaign emails. You may unsubscribe at any time using the link in any email.'
                },
                { name: 'Resend', desc: 'Used to send transactional emails such as your volunteer confirmation.' },
                {
                  name: 'Neon',
                  desc: 'Our PostgreSQL database provider where volunteer submissions are securely stored.'
                },
                { name: 'Vercel', desc: 'This site is hosted on Vercel. Standard web server logs may be collected.' },
                {
                  name: 'Google',
                  desc: 'Used for admin authentication only. Public visitors do not interact with Google services through this site.'
                }
              ].map((service) => (
                <div key={service.name} className="px-4 py-3 flex flex-col gap-1">
                  <span className="font-archivo text-[10px] tracking-widest uppercase text-text-light dark:text-text-dark">
                    {service.name}
                  </span>
                  <span className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                    {service.desc}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4">
              We do not sell, rent, or share your personal information with any other third parties for marketing or
              commercial purposes.
            </p>
          </Section>

          <Section title="Cookies & Session Storage">
            <p>
              This site uses cookies solely for admin authentication. If you are a campaign team member logging into the
              admin dashboard, a session cookie is set to maintain your authenticated session. This cookie is not used
              for tracking, advertising, or analytics purposes.
            </p>
            <p className="mt-3">
              Public visitors to this site are not tracked via cookies. We use{' '}
              <code className="font-mono text-xs bg-surface-light dark:bg-surface-dark px-1.5 py-0.5 border border-border-light dark:border-border-dark">
                sessionStorage
              </code>{' '}
              for a one-time intro animation on first visit — no personal data is stored.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              Volunteer submission data is retained for the duration of the campaign and used solely for campaign
              coordination. After the campaign concludes, data will be deleted or archived in accordance with
              Massachusetts campaign finance and data retention requirements.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="flex flex-col gap-2 mt-4 pl-4 border-l border-border-light dark:border-border-dark">
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Request access to the personal information we hold about you
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Request correction or deletion of your information
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Unsubscribe from campaign emails at any time
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{' '}
              <a
                href="mailto:zosia@electzvm.com"
                className="text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                zosia@electzvm.com
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected by updating the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of this site after changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact">
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-4 px-4 py-3 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex flex-col gap-1">
              <span className="font-archivo text-[10px] tracking-widest uppercase text-text-light dark:text-text-dark">
                Committee to Elect Zosia VanMeter
              </span>
              <a
                href="mailto:zosia@electzvm.com"
                className="font-inter text-sm text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                zosia@electzvm.com
              </a>
            </div>
          </Section>

          {/* Back to site */}
          <div className="flex items-center gap-4 pt-4 border-t border-border-light dark:border-border-dark">
            <Link
              href="/"
              className="font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              ← Back to Home
            </Link>
            <Link
              href="/terms"
              className="font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              Terms of Use →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// ── Section component ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 pb-4 border-b border-border-light dark:border-border-dark">
        <p
          id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
        >
          {title}
        </p>
      </div>
      <div className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </section>
  )
}
