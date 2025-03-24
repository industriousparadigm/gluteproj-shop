import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET() {
    console.log('🔍 Fetching all ACTIVE products from Stripe')

    try {
        const products = await stripe.products.list({
            expand: ['data.default_price'],
            active: true, // ✅ Filter for active products only
        })

        const productData = products.data.map((product) => {
            const priceData = product.default_price as any
            const priceId = typeof priceData === 'object' ? priceData.id : priceData  // ✅ Handle both cases

            return {
                id: product.id,
                name: product.name,
                price: priceData?.unit_amount ? priceData.unit_amount / 100 : 'N/A',
                image: product.images[0] || '',
                default_price_id: priceId,  // ✅ Always ensure this is a string
            }
        })

        return NextResponse.json(productData)
    } catch (error) {
        console.error('❌ Stripe API Error:', error)
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
    }
}
