'use client'
import Link from 'next/link'

export default function SuccessPage() {
    return (
        <div className="text-section">
            <h1>Success!</h1>
            <p>Thank you for shopping at Marianas Apparel. Your purchase was successful.</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}
