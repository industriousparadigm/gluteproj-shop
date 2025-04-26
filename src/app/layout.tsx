import type { Metadata } from 'next'
import { Inter, Syncopate } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syncopate = Syncopate({
  subsets: ['latin'],
  variable: '--font-syncopate',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GLUTE PROJECT APPAREL',
  description: 'Premium sportswear engineered for maximum gains'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syncopate.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
