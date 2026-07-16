import type { Metadata } from 'next'
import { Archivo_Narrow, Inter } from 'next/font/google'
import './globals.css'
import RootLayoutClient from './RootLayoutClient'
import Script from 'next/script'

const archiveNarrow = Archivo_Narrow({
  variable: '--font-archivo',
  subsets: ['latin']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://electzvm.com'),
  title: {
    default: 'Zosia VanMeter for State Representative',
    template: '%s | Zosia VanMeter'
  },
  description:
    'Zosia VanMeter is running for State Representative in the 9th Essex District of Massachusetts. Join the movement for housing, public safety, and education.',
  keywords: [
    'Zosia VanMeter',
    '9th Essex District',
    'Massachusetts State Representative',
    'Essex County',
    'Lynn MA',
    'Saugus MA',
    'Swampscott MA',
    'Wakefield MA',
    'MA primary 2026'
  ],
  authors: [{ name: 'Zosia VanMeter' }],
  creator: 'Zosia VanMeter',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://electzvm.com',
    siteName: 'Zosia VanMeter for State Representative',
    title: 'Zosia VanMeter for State Representative',
    description:
      'Zosia VanMeter is running for State Representative in the 9th Essex District of Massachusetts. Join the movement for housing, public safety, and education.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zosia VanMeter for State Representative — 9th Essex District, MA'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zosia VanMeter for State Representative',
    description: 'Zosia VanMeter is running for State Representative in the 9th Essex District of Massachusetts.',
    images: ['/og-image.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/favicon-180x180.png',
    other: [
      { rel: 'icon', url: '/favicon-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512' }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://electzvm.com'
  }
}
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archiveNarrow.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
