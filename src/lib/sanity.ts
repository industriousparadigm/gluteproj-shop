import { createClient } from '@sanity/client'
import { Product, SanityProduct } from './types'

export const sanity = createClient({
    projectId: 'rqcoyi7x',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

export async function fetchSanityProducts(): Promise<Product[]> {
    console.log('🔍 Fetching Sanity products...')

    try {
        const query = `*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      price,
      color,
      gender,
      images[]{ asset->{url} }
    }`

        const rawProducts: SanityProduct[] = await sanity.fetch(query)
        console.log('✅ Got raw Sanity products:', rawProducts)

        const products: Product[] = rawProducts.map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            color: item.color,
            gender: item.gender,
            images: (item.images || [])
                .map((img) => img.asset?.url)
                .filter((url): url is string => Boolean(url)),
        }))

        console.log('🧼 Normalized Sanity products:', products)
        return products
    } catch (err) {
        console.error('❌ Failed to fetch from Sanity:', err)
        return []
    }
}
