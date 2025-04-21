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
    description,
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
      description: item.description,
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

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  console.log(`🔍 Fetching Sanity product by slug: ${slug}`)

  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    price,
    color,
    category,
    description,
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
    const product: SanityProduct = await client.fetch(query, { slug })
    console.log('✅ Got Sanity product by slug:', product)

    if (!product) {
      console.warn(`⚠️ No product found with slug: ${slug}`)
      return null
    }

    return {
      id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      color: product.color,
      category: product.category,
      description: product.description,
      images: (product.images || [])
        .map((img) => img.asset?.url)
        .filter((url): url is string => Boolean(url)),
    }
  } catch (err) {
    console.error('❌ Failed to fetch product by slug from Sanity:', err)
    return null
  }
}
