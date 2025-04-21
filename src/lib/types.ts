export type Category = 'men' | 'women' | 'unisex'

export type Product = {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
    color: string
    category?: Category
    default_price_id?: string // only for Stripe items
    description?: string
}

export type SanityProduct = {
    _id: string
    name: string
    slug: string
    price: number
    color: string
    category?: Category
    description?: string
    images?: {
        asset?: {
            url?: string
        }
    }[]
}

export type StripeProduct = {
    id: string
    name: string
    price: number
    image: string
    default_price_id: string
    color: string
    category?: Category | null
    description?: string
}

export type CartItem = {
    id: string
    name: string
    price: number
    image: string
    default_price_id: string
    quantity?: number
    color?: string
}
