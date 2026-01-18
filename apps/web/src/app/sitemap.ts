import { MetadataRoute } from 'next'
import { roundService } from '@/shared/services/round.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arenadeelite.com.br'

  const routes = ['', '/ranking', '/calendario', '/regulamento'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const rounds = await roundService.getAll()
    const roundRoutes = rounds.map((round) => ({
      url: `${baseUrl}/rodada/${round.externalRoundId}`,
      lastModified: new Date(round.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...routes, ...roundRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return routes
  }
}
