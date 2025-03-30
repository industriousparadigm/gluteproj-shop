import { stripe } from '@/lib/stripe'
import { StripeProduct } from '@/lib/types'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { cart } = await req.json()
    console.log('🟠 Incoming cart data:', cart)

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map((item: StripeProduct) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        })

        console.log('✅ Checkout session created:', session.url)
        return NextResponse.json({ checkoutUrl: session.url })
    } catch (error) {
        console.error('❌ Stripe Checkout Error:', error)
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
    }
}
