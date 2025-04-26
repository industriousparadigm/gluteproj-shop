import { PortableTextBlock } from "@portabletext/types"

export type Variant = {
    color: string
    images: string[]
    slug: string
}

export type Product = {
    id: string
    name: string
    slug: string
    features: PortableTextBlock[]
    materialAndCare: PortableTextBlock[]
    gender: 'women' | 'men' | 'unisex'
    sizes: string[]
    price: number
    color: string // primary/default colour
    category: string | null
    description: string
    images: string[]
    variants: Variant[]
}

export type SanityImage = {
    asset: { url: string }
}

export type SanityVariant = {
    color: string
    price: number
    slug: string
    images: SanityImage[]
}

export type SanityProduct = {
    _id: string
    name: string
    slug: string // slug.current is projected into slug in GROQ (should this be optional?)
    description: string
    features: PortableTextBlock[]
    materialAndCare: PortableTextBlock[]
    gender: 'women' | 'men' | 'unisex'
    sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'> | null
    price: number         // base price
    color: string         // primary / default colour
    category: string | null
    isFeatured: boolean
    images: SanityImage[]
    variants?: SanityVariant[]
}

export type StripeProduct = {
    id: string
    name: string
    price: number
    image: string
    default_price_id: string
    color: string
    category?: string
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
