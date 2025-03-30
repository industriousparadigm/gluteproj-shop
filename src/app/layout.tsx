import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import '@/styles/global.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['500', '600', '700'],
})


export const metadata: Metadata = {
    title: 'Gluteproj',
    description: 'Your fitness fashion destination'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
                <header className="header">
                    <Link href="/">Glute Project</Link>
                    <Link href="/cart">🛒 Cart</Link>
                </header>
                {children}
            </body>
        </html>
    )
}
