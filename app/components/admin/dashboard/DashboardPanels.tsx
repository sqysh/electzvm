import { EmailBlast, Event, News, Page, VolunteerSubmission } from '@prisma/client'
import EndorsementPanel from '../panels/EndorsementPanel'
import EventPanel from '../panels/EventPanel'
import { HelpPanel } from '../panels/HelpPanel'
import InquiriesPanel from '../panels/InquiriesPanel'
import NewsPanel from '../panels/NewsPanel'
import PageContentEditorPanel from '../panels/PageContentEditorPanel'
import SubscribersPanel from '../panels/SubscribersPanel'
import TeamPanel from '../panels/TeamPanel'
import VolunteerBlastPanel from '../panels/VolunteerBlastPanel'
import { MailchimpMember } from '@/types/mailchimp.types'
import { Session } from 'next-auth'
import { UserRecord } from '@/types/user.types'
import { Endorsement } from '@/types/endorsement.types'

interface Props {
  activePanel: string | null
  onClose: () => void
  users: UserRecord[]
  news: News[]
  members: MailchimpMember[]
  inquiries: VolunteerSubmission[]
  pages: Page[]
  session: Session | null
  setUsers: (users: UserRecord[]) => void
  setNews: React.Dispatch<React.SetStateAction<News[]>>
  endorsements: Endorsement[]
  setEndorsements: (endorsements: Endorsement[]) => void
  helpOpen: boolean
  setHelpOpen: React.Dispatch<React.SetStateAction<boolean>>
  blastHistory: EmailBlast[]
  setBlastHistory: React.Dispatch<React.SetStateAction<EmailBlast[]>>
  events: Event[]
  setEvents: (events: Event[]) => void
}

export function DashboardPanels({
  activePanel,
  onClose,
  users,
  news,
  members,
  inquiries,
  pages,
  session,
  setUsers,
  setNews,
  endorsements,
  setEndorsements,
  helpOpen,
  setHelpOpen,
  blastHistory,
  setBlastHistory,
  events,
  setEvents
}: Props) {
  return (
    <>
      <TeamPanel
        open={activePanel === 'team'}
        onClose={onClose}
        users={users}
        currentUserId={session?.user?.id}
        onUsersChange={setUsers}
      />

      <SubscribersPanel open={activePanel === 'subscribers'} onClose={onClose} members={members} />

      <NewsPanel open={activePanel === 'news'} onClose={onClose} news={news} onNewsChange={setNews} />

      <InquiriesPanel open={activePanel === 'inquiries'} onClose={onClose} inquiries={inquiries} />

      <PageContentEditorPanel open={activePanel === 'page'} onClose={onClose} pages={pages} />

      <EndorsementPanel
        open={activePanel === 'endorsement'}
        onClose={onClose}
        endorsements={endorsements}
        onEndorsementsChange={setEndorsements}
      />

      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />

      <VolunteerBlastPanel
        open={activePanel === 'blast'}
        onClose={onClose}
        volunteerCount={inquiries.length}
        blastHistory={blastHistory}
        onBlastChange={setBlastHistory}
      />

      <EventPanel events={events} onClose={onClose} onEventsChange={setEvents} open={activePanel === 'event'} />
    </>
  )
}
