import { News } from '@prisma/client'
import Hero from '../components/Hero'
import HomePageSections from '../components/HomePageSections'
import { Footer } from '../components/Footer'

export function HomeClient({ news }: { news: News[] }) {
  return (
    <main>
      <Hero />
      <HomePageSections news={news} />
      <Footer />
    </main>
  )
}
