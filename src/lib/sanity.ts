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

  const query = /* groq */`
  *[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    gender,
    sizes,
    price,
    color,
    category,
    description,
    features,
    materialAndCare,
    "images": images[]{ asset->{ url, metadata{ dimensions } } },
    "variants": variants[]{
      color,
      "slug": slug.current,
      "images": images[]{ asset->{ url, metadata{ dimensions } } }
    }
  }`

  try {
    const rawProducts: SanityProduct[] = await client.fetch(query)
    console.log('✅ Got raw Sanity products:', rawProducts)

    if (!rawProducts?.length) {
      console.warn('⚠️ No products found in Sanity')
      return []
    }

    const products: Product[] = rawProducts
      .flatMap(p => {
        // Main product as a product
        const base = {
          id: p._id,
          name: p.name,
          slug: p.slug as string,
          gender: p.gender,
          sizes: p.sizes ?? [],
          price: p.price,
          color: p.color,
          category: p.category,
          description: p.description,
          features:        p.features        ?? [],
          materialAndCare: p.materialAndCare ?? [],
          images:   (p.images   ?? []).map(i => i.asset?.url),
          variants: (p.variants ?? []).map(v => ({
            color:  v.color,
            slug:   v.slug,
            images: (v.images ?? []).map(i => i.asset?.url)
          }))
        }
        // Each variant as its own product
        const variantProducts = (p.variants ?? [])
          .filter(v => v.slug && v.images && v.images.length)
          .map(v => ({
            ...base,
            id: `${p._id}__${v.slug}`,
            slug: v.slug,
            color: v.color,
            images: (v.images ?? []).map(i => i.asset?.url),
            // Remove variants from variants
            variants: [],
            // Store original product slug for variant linking
            parentSlug: p.slug
          }))
        return [base, ...variantProducts]
      })
    
    console.log('🧼 Normalized Sanity products:', products)
    return products
  } catch (err) {
    console.error('❌ Failed to fetch from Sanity:', err)
    return []
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  console.log(`🔍 Fetching Sanity product by slug: ${slug}`)

  // First, try to fetch by exact slug match
  const query = /* groq */`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    gender,
    sizes,
    price,
    color,
    category,
    description,
    features,
    materialAndCare,
    "images": images[]{ asset->{ url, metadata{ dimensions } } },
    "variants": variants[]{
      color,
      "slug": slug.current,
      "images": images[]{ asset->{ url, metadata{ dimensions } } }
    }
  }`

  try {
    let product: SanityProduct = await client.fetch(query, { slug })
    
    // If we can't find by direct slug, check if it could be a variant slug
    // This handles cases where we're using the old variant URLs that were generated
    if (!product) {
      console.log(`⚠️ No product found with slug: ${slug}, checking variants...`)
      
      // Query for products that have a variant with this slug
      const variantQuery = /* groq */`
      *[_type == "product" && $slug in variants[].slug.current][0]{
        _id,
        name,
        "slug": slug.current,
        gender,
        sizes,
        price,
        color,
        category,
        description,
        features,
        materialAndCare,
        "images": images[]{ asset->{ url, metadata{ dimensions } } },
        "variants": variants[]{
          color,
          "slug": slug.current,
          "images": images[]{ asset->{ url, metadata{ dimensions } } }
        }
      }`
      
      product = await client.fetch(variantQuery, { slug })
    }

    console.log('✅ Got Sanity product by slug:', product)

    if (!product) {
      console.warn(`⚠️ No product found with slug: ${slug}`)
      return null
    }

    return {
      id: product._id,
      name: product.name,
      slug: product.slug,
      gender: product.gender,
      sizes: product.sizes ?? [],
      price: product.price,
      color: product.color,
      category: product.category,
      description: product.description,
      features: product.features ?? [],
      materialAndCare: product.materialAndCare ?? [],
      images: (product.images || [])
        .map((img) => img.asset?.url)
        .filter((url): url is string => Boolean(url)),
      variants: (product.variants || []).map(v => ({
        color: v.color,
        slug: v.slug,
        images: (v.images || []).map(i => i.asset?.url).filter(Boolean)
      }))
    }
  } catch (err) {
    console.error('❌ Failed to fetch product by slug from Sanity:', err)
    return null
  }
}
