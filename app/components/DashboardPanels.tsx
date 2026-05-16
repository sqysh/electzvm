import InquiriesPanel from './panels/InquiriesPanel'
import NewsPanel from './panels/NewsPanel'
import PageContentEditorPanel from './panels/PageContentEditorPanel'
import SubscribersPanel from './panels/SubscribersPanel'
import TeamPanel from './panels/TeamPanel'

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
  setNews
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
    </>
  )
}
