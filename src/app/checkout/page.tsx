'use client'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Suspense } from 'react'

console.log('Stripe Publishable Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const productId = searchParams.get('product')

    const handleCheckout = async () => {
        const stripe = await stripePromise
        if (!stripe) {
            console.error('Stripe failed to initialize — check your API key.')
            return
        }

        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: productId || '', quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}/success?product=${productId}`,
            cancelUrl: `${window.location.origin}/cancel`
        })

        if (error) console.error('Stripe Error:', error.message)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <h1>Checkout</h1>
                <button onClick={handleCheckout}>Pay Now</button>
            </div>
        </Suspense>
    )
}
