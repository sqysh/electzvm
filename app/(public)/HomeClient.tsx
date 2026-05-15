import { News } from '@prisma/client'
import Hero from '../components/Hero'
import HomePageSections from '../components/HomePageSections'
import { Footer } from '../components/Footer'
import { PrimaryDateMarquee } from '../components/PrimaryDateMarquee'

export function HomeClient({ news }: { news: News[] }) {
  return (
    <main>
      <Hero />
      <PrimaryDateMarquee />
      <HomePageSections news={news} />
      <Footer />
    </main>
  )
}
