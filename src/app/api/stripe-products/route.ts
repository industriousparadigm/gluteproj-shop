import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import type { Stripe } from 'stripe'
import type { StripeProduct } from '@/types'

export async function GET() {
    console.log('🔍 Fetching all ACTIVE products from Stripe')

    try {
        const products = await stripe.products.list({
            expand: ['data.default_price'],
            active: true,
        })

        console.log(`✅ Found ${products.data.length} products`)

        const productData: StripeProduct[] = products.data.map((product) => {
            const priceData = product.default_price as Stripe.Price
            const priceId = priceData.id

            const item: StripeProduct = {
                id: product.id,
                name: product.name,
                price: priceData.unit_amount ? priceData.unit_amount / 100 : 'N/A',
                image: product.images[0] || '',
                default_price_id: priceId,
                gender: product.metadata?.gender || null,
            }

            console.log(`🧢 Mapped: ${item.name} (${item.gender}) → €${item.price}`)

            return item
        })

        return NextResponse.json(productData)
    } catch (error) {
        console.error('❌ Stripe API Error:', error)
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
    }
}
