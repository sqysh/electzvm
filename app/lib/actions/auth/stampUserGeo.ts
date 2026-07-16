import prisma from '@/prisma/client'
import { RequestGeo } from '../../utils/_log.server.utils'

export async function stampUserGeo(userId: string | null | undefined, geo: RequestGeo) {
  if (!userId || geo.geoLatitude == null) return
  await prisma.user
    .update({
      where: { id: userId },
      data: {
        lastGeoLatitude: geo.geoLatitude,
        lastGeoLongitude: geo.geoLongitude,
        lastGeoCity: geo.geoCity,
        lastGeoRegion: geo.geoRegion,
        lastGeoCountry: geo.geoCountry
      }
    })
    .catch(() => {}) // best-effort — never block a checkout on geo
}
