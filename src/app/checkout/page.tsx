'use client'

import { Suspense } from 'react'
import Checkout from '@/components/Checkout'

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
        </Suspense>
    )
}
