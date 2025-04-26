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

      {/* Studio Video Section */}
      <section className={styles.studioVideoSection}>
        <div className={styles.studioVideoContainer}>
          <video
            className={styles.studioVideo}
            src="/glute-studio.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/studio-poster.jpg"
          />
        </div>
        <div className={styles.studioOverlayFixed}>
          <a
            href="https://instagram.com/glute_project"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.studioLink}
            tabIndex={0}
            style={{ color: 'var(--accent, #ff6b00)', fontSize: 'clamp(1.25rem, 4vw, 2.7rem)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textShadow: '0 6px 36px rgba(0,0,0,0.22)' }}
          >
            Visit our studio
          </a>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  )
}
