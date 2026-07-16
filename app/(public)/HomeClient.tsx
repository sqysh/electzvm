import { News } from '@prisma/client'
import Hero from '../components/public/hero/Hero'
import HomePageSections from '../components/public/sections/HomePageSections'
import { PrimaryDateMarquee } from '../components/public/sections/PrimaryDateMarquee'
import { PageField } from '@/types/page.types'
import { getField } from '../lib/utils/page.utils'

export function HomeClient({ content, news }: { content: PageField[]; news: News[] }) {
  return (
    <main>
      <Hero
        eyebrow={getField(content, 'hero_eyebrow')}
        firstName={getField(content, 'hero_first_name')}
        lastName={getField(content, 'hero_last_name')}
      />
      <PrimaryDateMarquee />
      <HomePageSections content={content} news={news} />
    </main>
  )
}
