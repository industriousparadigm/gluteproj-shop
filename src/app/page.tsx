'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/types'
import { fetchProducts } from '@/lib/sanity'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import styles from './page.module.css'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log('🔄 Starting to load products...')
        setLoading(true)
        setError(null)
        
        const data = await fetchProducts()
        console.log('📦 Received products:', data)
        
        if (!data || data.length === 0) {
          console.warn('⚠️ No products received from Sanity')
          setError('No products available')
        }
        
        setProducts(data)
      } catch (error) {
        console.error('❌ Error loading products:', error)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Don't filter by category if category is null
  // Instead, just display all products for now
  const allProducts = products || []

  return (
    <main className={styles.main}>
      <Hero />
      
      <section id="shop-section" className={styles.featuredSection}>
        <div className={styles.collections}>
          {loading ? (
            <div className={styles.loading}>Loading products...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <>
              <ProductGrid 
                title="SHOP ALL PRODUCTS" 
                products={allProducts}
                className={styles.collectionGrid} 
              />
            </>
          )}
        </div>
      </section>

      <section className={styles.brandStory}>
        <div className={styles.brandContent}>
          <h2>THE BODY ACHIEVES WHAT THE MIND BELIEVES</h2>
          <p>
            At Glute Project, we're more than just activewear. We're a commitment to excellence,
            pushing boundaries in both performance and style. Our premium sportswear is engineered
            to enhance your workouts and designed to make you look and feel unstoppable.
          </p>
        </div>
      </section>
    </main>
  )
}
