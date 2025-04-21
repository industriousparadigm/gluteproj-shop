import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import type { Stripe } from 'stripe'
import type { Category, StripeProduct } from '@/lib/types'

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
                price: (priceData.unit_amount || 0)  / 100,
                image: product.images[0] || '',
                default_price_id: priceId,
                category: product.metadata?.category as Category || 'unisex',
                color: product.metadata?.color || 'n/a',
                description: product.description || '',
            }

            console.log(`🧢 Mapped: ${item.name} (${item.category}) → €${item.price}`)

            return item
        })

        return NextResponse.json(productData)
    } catch (error) {
        console.error('❌ Stripe API Error:', error)
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
    }
}
