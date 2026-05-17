import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Elect ZVM',
  description: 'Terms of Use for the Zosia VanMeter for State Representative campaign website.'
}

const LAST_UPDATED = 'May 17, 2026'

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen w-full bg-bg-light dark:bg-bg-dark">
      {/* Hero */}
      <div className="w-full bg-hero-light dark:bg-hero-dark border-b border-white/10 pt-12 pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
            Legal · Elect ZVM
          </p>
          <h1 className="font-archivo text-4xl sm:text-5xl font-black uppercase text-white leading-none">
            Terms <span className="text-primary-dark">of Use</span>
          </h1>
          <p className="font-mono text-[11px] text-white/30 mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
        <div className="flex flex-col gap-12">
          <Section title="Acceptance of Terms">
            <p>
              By accessing or using the electzvm.com website (&ldquo;the Site&rdquo;), you agree to be bound by these
              Terms of Use. If you do not agree to these terms, please do not use this Site. These terms apply to all
              visitors and users of the Site.
            </p>
          </Section>

          <Section title="Purpose of This Site">
            <p>
              This website is operated by the Committee to Elect Zosia VanMeter for the purpose of providing information
              about Zosia VanMeter&rsquo;s campaign for State Representative of the 9th Essex District in Massachusetts.
              The Site is used to:
            </p>
            <ul className="flex flex-col gap-2 mt-4 pl-4 border-l border-border-light dark:border-border-dark">
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Share information about the candidate and her platform
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Allow supporters to sign up to volunteer
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Share campaign news and endorsements
              </li>
              <li className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                Direct visitors to donate via ActBlue
              </li>
            </ul>
          </Section>

          <Section title="Volunteer Form">
            <p>
              Submitting the volunteer contact form is entirely voluntary. By submitting the form, you consent to being
              contacted by the campaign via email or phone regarding volunteer opportunities and campaign updates. You
              may request to be removed from campaign communications at any time by contacting{' '}
              <a
                href="mailto:zosia@electzvm.com"
                className="text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                zosia@electzvm.com
              </a>
              .
            </p>
          </Section>

          <Section title="Cookies & Session Authentication">
            <p>
              This Site uses cookies exclusively for administrative authentication. Campaign team members who log into
              the admin dashboard will have a session cookie set to maintain their authenticated session. Public
              visitors to the Site are not subject to tracking cookies or advertising cookies of any kind.
            </p>
            <p className="mt-3">
              By using the admin dashboard, campaign team members consent to the use of session cookies for
              authentication purposes.
            </p>
          </Section>

          <Section title="Donations">
            <p>
              Donations are processed through ActBlue, a separate third-party platform. Clicking a donation link on this
              Site will redirect you to ActBlue&rsquo;s website. Donations are subject to ActBlue&rsquo;s own terms of
              service and privacy policy. The Committee to Elect Zosia VanMeter is not responsible for ActBlue&rsquo;s
              data practices.
            </p>
            <p className="mt-3">
              Political contributions are not tax deductible. Contributions are subject to Massachusetts campaign
              finance law limits and disclosure requirements.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on this Site — including text, images, graphics, and design — is owned by or licensed to the
              Committee to Elect Zosia VanMeter. You may not reproduce, distribute, or use any content from this Site
              without prior written permission, except for sharing links to public pages.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p>
              This Site is provided &ldquo;as is&rdquo; without warranties of any kind. The Committee to Elect Zosia
              VanMeter makes no guarantees regarding the accuracy or completeness of the information provided. We
              reserve the right to update, modify, or remove content at any time without notice.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, the Committee to Elect Zosia VanMeter shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of this Site.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms of Use are governed by the laws of the Commonwealth of Massachusetts. Any disputes arising
              from use of this Site shall be subject to the exclusive jurisdiction of the courts of Massachusetts.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              We reserve the right to update these Terms of Use at any time. Changes will be reflected by updating the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the Site after changes
              constitutes your acceptance of the updated terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>If you have questions about these Terms of Use, please contact us at:</p>
            <div className="mt-4 px-4 py-3 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex flex-col gap-1">
              <span className="font-archivo text-[10px] tracking-widests uppercase text-text-light dark:text-text-dark">
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

          {/* Paid for by */}
          <div className="px-4 py-3 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <p className="font-mono text-[10px] text-muted-light dark:text-muted-dark tracking-widest uppercase">
              Paid for by the Committee to Elect Zosia VanMeter · 9th Essex District · Massachusetts
            </p>
          </div>

          {/* Back to site */}
          <div className="flex items-center gap-4 pt-4 border-t border-border-light dark:border-border-dark">
            <Link
              href="/"
              className="font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              ← Back to Home
            </Link>
            <Link
              href="/privacy"
              className="font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              Privacy Policy →
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
    <section aria-labelledby={`section-${title.toLowerCase().replace(/[\s&]+/g, '-')}`} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 pb-4 border-b border-border-light dark:border-border-dark">
        <p
          id={`section-${title.toLowerCase().replace(/[\s&]+/g, '-')}`}
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
