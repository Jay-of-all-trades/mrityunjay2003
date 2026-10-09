import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteFooter, SiteNav } from '@/components/SiteNav'
import { profile } from '@/data/profile'

import '../styles.css'

const siteName = `${profile.name} — Data Science at IIT Madras`
const siteDescription =
  'Portfolio and coursework of Mrityunjay Chakraborty: BS in Data Science and Applications at IIT Madras, backend builder, co-founder of the RaSoR research society.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'author', content: profile.name },
      { name: 'theme-color', content: '#faf6ee' },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'profile' },
      { property: 'og:image', content: profile.wide },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..700&family=Karla:ital,wght@0,300..700;1,300..600&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div aria-hidden className="grain-overlay" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
