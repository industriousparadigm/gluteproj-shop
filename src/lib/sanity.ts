import { createClient } from '@sanity/client'
import { Product, SanityProduct } from './types'

export const client = createClient({
  projectId: 'rqcoyi7x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function fetchProducts(): Promise<Product[]> {
  console.log('🔍 Fetching Sanity products...')

  const query = `*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    price,
    color,
    category,
    "images": images[]{
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }`

  try {
    const rawProducts: SanityProduct[] = await client.fetch(query)
    console.log('✅ Got raw Sanity products:', rawProducts)

    if (!rawProducts?.length) {
      console.warn('⚠️ No products found in Sanity')
      return []
    }

    const products: Product[] = rawProducts.map((item) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      color: item.color,
      category: item.category,
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
