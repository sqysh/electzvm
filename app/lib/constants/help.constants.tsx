import { HelpSection } from '@/types/help.types'

export const HELP_SECTIONS: HelpSection[] = [
  {
    title: 'Getting Started',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Welcome to your Campaign Control dashboard. This is your central hub for managing everything — from volunteer
          inquiries to canvassing pins dropped in real time across the 9th Essex District.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Sign in with your Gmail account. Only team members added by an admin can access the dashboard. If you
          can&apos;t sign in, contact Sqysh.
        </p>
        <div className="flex flex-col gap-2 border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
          {[
            {
              label: 'Dashboard',
              desc: 'Your home base — live map overview, campaign stats, countdown to primary, and quick access to all panels via the stat pills on the left.'
            },
            {
              label: 'Canvassing Map',
              desc: 'The full interactive war room. Left panel shows campaign progress and recent activity. Center is the live map where pins are dropped. Right panel shows pin details.'
            }
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 px-3 py-2.5">
              <span className="font-archivo text-[10px] tracking-widest uppercase text-text-light dark:text-text-dark">
                {item.label}
              </span>
              <span className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The entire site — both the public pages and this dashboard — automatically switches between{' '}
          <strong className="text-text-light dark:text-text-dark">light and dark mode</strong>&nbsp;based on your
          device&apos;s appearance setting. To change it, go to your device&apos;s System Settings and toggle between
          Light and Dark appearance.
        </p>
      </div>
    )
  },
  {
    title: 'Canvassing Map',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The canvassing map is a live war room — your whole team can drop pins in real time as they knock doors across
          the district. Every pin appears instantly for everyone watching.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To drop a pin:</strong> Click anywhere on the map, or
          search for an address in the search bar. Fill in the status, doors knocked, and any notes.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">Pin statuses:</strong>
        </p>
        <div className="flex flex-col gap-1.5 border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
          {[
            { color: '#0096b4', darkColor: '#00e5ff', label: 'Knocked', desc: 'Door was answered' },
            { color: '#5b2d8e', darkColor: '#a855f7', label: 'Interested', desc: 'Voter expressed support' },
            { color: '#6b5a8a', darkColor: '#9d7fc4', label: 'No Answer', desc: 'No one came to the door' },
            { color: '#dc2626', darkColor: '#ef4444', label: 'Hostile', desc: 'Not a supporter' }
          ].map((status) => (
            <div key={status.label} className="flex items-center gap-3 px-3 py-2.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: status.darkColor }}
                aria-hidden="true"
              />
              <span className="font-archivo text-[10px] tracking-widest uppercase text-text-light dark:text-text-dark shrink-0">
                {status.label}
              </span>
              <span className="font-inter text-xs text-muted-light dark:text-muted-dark">— {status.desc}</span>
            </div>
          ))}
        </div>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Use the filter buttons in the header to show only certain statuses. Click{' '}
          <strong className="text-text-light dark:text-text-dark">District View</strong> to zoom to the full 9th Essex
          boundary.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Click any pin to see its details. From the detail panel you can delete a pin if needed.
        </p>
      </div>
    )
  },
  {
    title: 'News',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The News panel lets you create, edit, and publish articles that appear on the public News page at
          electzvm.com/news.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To create an article:</strong> Click the News stat
          pill, then click <strong className="text-text-light dark:text-text-dark">New</strong>. Fill in the title,
          excerpt, and body copy.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">Adding an image:</strong> Click the image upload area
          and select a photo from your device — JPG, PNG, or WebP up to 10MB. The image will appear at the top of the
          article on the public site.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">External link:</strong> If the article lives on
          another site like a newspaper, paste the URL in the External Link field and it will link out instead of
          showing the full body.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Articles start as <strong className="text-text-light dark:text-text-dark">Draft</strong> — saved but not
          visible to the public. Toggle <strong className="text-text-light dark:text-text-dark">Published</strong> to
          make them live on the site.
        </p>
      </div>
    )
  },
  {
    title: 'Endorsements',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Add endorsements from community leaders, organizations, and neighbors. Published endorsements appear on the
          public Endorsements page at electzvm.com/endorsements.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To add an endorsement:</strong> Click the Endorsements
          stat pill, then click <strong className="text-text-light dark:text-text-dark">Add</strong>. Fill in the name,
          title, organization, and optionally a headshot image URL.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Like articles, endorsements start as Draft. Toggle{' '}
          <strong className="text-text-light dark:text-text-dark">Published</strong> to make them visible publicly.
        </p>
      </div>
    )
  },
  {
    title: 'Page Content',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The Page Content Editor lets you update text across all public pages — hero headings, body copy, stats, and
          more — without touching any code.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To edit:</strong> Click the Pages stat pill, select a
          page from the tabs at the top, expand a section, edit the fields, then click{' '}
          <strong className="text-text-light dark:text-text-dark">Save</strong>.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Changes go live on the public site immediately after saving. Always double-check the public page after saving
          to make sure everything looks right.
        </p>
      </div>
    )
  },
  {
    title: 'Volunteers & Inquiries',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          When someone fills out the volunteer form at electzvm.com/contact, their submission appears here. You and the
          team also receive an email notification immediately.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">Interest badges:</strong>
        </p>
        <ul className="flex flex-col gap-1.5 pl-3">
          <li className="font-inter text-sm text-muted-light dark:text-muted-dark">
            <strong className="text-text-light dark:text-text-dark">L</strong> — joined the mailing list
          </li>
          <li className="font-inter text-sm text-muted-light dark:text-muted-dark">
            <strong className="text-text-light dark:text-text-dark">S</strong> — wants a yard sign
          </li>
          <li className="font-inter text-sm text-muted-light dark:text-muted-dark">
            <strong className="text-text-light dark:text-text-dark">D</strong> — wants to knock doors
          </li>
        </ul>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Click any row to expand and see their full contact info including a clickable email and phone number.
        </p>
      </div>
    )
  },
  {
    title: 'Mailing List',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Your mailing list is managed through Mailchimp. When someone checks &quot;Join the mailing list&quot; on the
          volunteer form, they are automatically added to your Mailchimp audience.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The Mailing List panel shows all subscribers with their status —{' '}
          <strong className="text-text-light dark:text-text-dark">Subscribed</strong> means they are actively receiving
          emails, <strong className="text-text-light dark:text-text-dark">Unsubscribed</strong> means they opted out.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          To manually add someone, use the{' '}
          <strong className="text-text-light dark:text-text-dark">Add to Mailchimp</strong> quick link in the left
          panel. To send an email campaign, go directly to Mailchimp at mailchimp.com.
        </p>
      </div>
    )
  },
  {
    title: 'Team Members',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Team members are people who have access to this dashboard. Only Gmail accounts can be added — sign in is
          through Google.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To add someone:</strong> Click the Team stat pill,
          then click <strong className="text-text-light dark:text-text-dark">Add Member</strong>. Enter their full name
          and Gmail address. They can sign in at electzvm.com/login immediately.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          To remove someone, click their name to expand the row and click{' '}
          <strong className="text-text-light dark:text-text-dark">Remove Member</strong>. You cannot remove your own
          account.
        </p>
      </div>
    )
  },
  {
    title: 'Need More Help?',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          If something isn&apos;t working or you need a feature added, reach out to Sqysh.
        </p>
        <a
          href="mailto:greg@sqysh.io"
          className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          sqysh@sqysh.io →
        </a>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Built and maintained by <strong className="text-text-light dark:text-text-dark">Sqysh</strong> · electzvm.com
          is hosted on Vercel and backed by a Neon PostgreSQL database.
        </p>
      </div>
    )
  },
  {
    title: 'Send Volunteer Blast',
    content: (
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          The Volunteer Blast lets you send a campaign email to every volunteer who submitted the contact form — all at
          once, straight from the dashboard.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          <strong className="text-text-light dark:text-text-dark">To send a blast:</strong> Click the Send Blast stat
          pill, write your subject line and message, confirm your sign-off name, and hit{' '}
          <strong className="text-text-light dark:text-text-dark">Send</strong>. Emails go out immediately.
        </p>
        <div className="flex flex-col gap-1.5 border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark">
          {[
            { label: 'Subject', desc: 'The email subject line — keep it short and compelling' },
            { label: 'Message', desc: 'The body of your email — use separate lines for paragraphs' },
            { label: 'Sign-off', desc: 'Defaults to Zosia VanMeter — change if someone else is sending' }
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-0.5 px-3 py-2.5">
              <span className="font-archivo text-[10px] tracking-widests uppercase text-text-light dark:text-text-dark">
                {field.label}
              </span>
              <span className="font-inter text-xs text-muted-light dark:text-muted-dark">{field.desc}</span>
            </div>
          ))}
        </div>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Emails are sent in batches of 50 to stay within rate limits. The&nbsp;
          <strong className="text-text-light dark:text-text-dark">Send History</strong>&nbsp;section below the form
          shows every blast that&apos;s been sent — subject, date, and how many people received it.
        </p>
        <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
          Emails are sent from <strong className="text-text-light dark:text-text-dark">noreply@electzvm.com</strong> and
          display as coming from Zosia VanMeter.
        </p>
      </div>
    )
  }
]
