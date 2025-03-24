import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
    title: 'Marianas Apparel',
    description: 'Your fitness fashion destination'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <header className="header">
                    <Link href="/">Marianas Apparel</Link>
                    <Link href="/cart">🛒 Cart</Link> {/* 👈 Added Cart link */}
                </header>
                {children}
            </body>
        </html>
    )
}
