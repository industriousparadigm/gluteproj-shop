'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/types'
import { fetchProducts } from '@/lib/sanity'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import NewsletterSignup from '@/components/NewsletterSignup'
import FullBleedImage from '@/components/FullBleedImage'
import styles from './page.module.css'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<'women' | 'men'>('women')

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

  // Filter products by selected gender
  // Include 'unisex' products in both gender categories
  const filteredProducts = products.filter(
    product => product.gender === selectedGender || product.gender === 'unisex'
  )

  const handleGenderToggle = (gender: 'women' | 'men') => {
    setSelectedGender(gender)
  }

  // Clean implementation of the shop function that both scrolls and toggles gender
  const handleShopGender = (gender: 'women' | 'men') => {
    setSelectedGender(gender)
    // Smooth scroll to product grid
    const section = document.getElementById('shop-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const BrandStory = () => (
    <section className={styles.brandStory}>
      <div className={styles.brandContent}>
        <h2>The body achieves what the mind believes</h2>
        <p>
          At Glute Project, we believe that greatness starts in the mind. Every rep, every stride, every challenge you conquer begins with a single thought: belief in yourself. Our mission is to empower you to push past your limits, embrace the journey, and celebrate the strength that comes from within. Whether you&apos;re chasing a new PR or simply striving to feel your best, remember—the body will always follow where the mind leads. Welcome to a community where ambition meets action, and every day is an opportunity to become your strongest self.
        </p>
      </div>
    </section>
  )

  return (
    <main className={styles.main}>
      <Hero onShopGender={handleShopGender} />
      
      <section id="shop-section" className={styles.featuredSection}>
        <div className={styles.collections}>
          {loading ? (
            <div className={styles.loading}>Loading products...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <>
              <ProductGrid 
                products={filteredProducts}
                className={styles.collectionGrid}
                selectedGender={selectedGender}
                onGenderToggle={handleGenderToggle}
              />
            </>
          )}
        </div>
      </section>

      <FullBleedImage src="/hero-b.png" alt="Athletic wear" priority />

      <BrandStory />

      <FullBleedImage src="/hero-womanball.png" alt="Woman with medicine ball" priority />

      <NewsletterSignup />
    </main>
  )
}
