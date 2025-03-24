import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    console.log('🔍 Incoming request to /api/stripe-product')

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
        console.warn('⚠️ Missing product ID in request.')
        return NextResponse.json({ error: 'Product ID missing' }, { status: 400 })
    }

    console.log(`✅ Received product ID: ${productId}`)

    try {
        const product = await stripe.products.retrieve(productId)
        console.log(`🟢 Successfully fetched product: ${product.name}`)

        const priceData = await stripe.prices.retrieve(product.default_price as string)

        return NextResponse.json({
            name: product.name,
            description: product.description,
            image: product.images[0] || '',
            price: (priceData.unit_amount || 0) / 100,
        })
    } catch (error) {
        console.error(`❌ Stripe API Error: ${error}`)
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    } finally {
        console.log('🔚 Finished processing request to /api/stripe-product')
    }
}
