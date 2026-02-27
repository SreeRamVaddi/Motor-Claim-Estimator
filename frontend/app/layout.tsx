import type { Metadata } from 'next'
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ClaimAI — Instant Motor Claim Estimator',
  description:
    'AI-powered pre-approval damage assessment. Upload your car damage photo and get an instant cost estimate and pre-approval in under 10 seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Clash Display — not on Google Fonts, load from Fontshare CDN */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body className="bg-black antialiased overflow-x-hidden">
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
