import EndorsementPanel from '../panels/EndorsementPanel'
import { HelpPanel } from '../panels/HelpPanel'
import InquiriesPanel from '../panels/InquiriesPanel'
import NewsPanel from '../panels/NewsPanel'
import PageContentEditorPanel from '../panels/PageContentEditorPanel'
import SubscribersPanel from '../panels/SubscribersPanel'
import TeamPanel from '../panels/TeamPanel'
import VolunteerBlastPanel from '../panels/VolunteerBlastPanel'

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
  setBlastHistory
}: any) {
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
    </>
  )
}
