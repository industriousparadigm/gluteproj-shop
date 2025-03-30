export type Gender = 'men' | 'women' | 'unisex'

export type Product = {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
    color: string
    gender?: Gender
    default_price_id?: string // only for Stripe items
}

export type SanityProduct = {
    _id: string
    name: string
    slug: string
    price: number
    color: string
    gender?: Gender
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
    gender?: Gender | null
}

export type CartItem = {
    id: string
    name: string
    price: number
    image: string
    default_price_id: string
}
