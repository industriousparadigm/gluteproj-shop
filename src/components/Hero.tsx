'use client'

import Image from 'next/image'
import styles from './Hero.module.css'

// Only use a single hero image
const heroImage = '/hero-wolv.webp'

export default function Hero({ onShopGender }: { onShopGender: (gender: 'women' | 'men') => void }) {
  const handleShop = (gender: 'women' | 'men', e: React.MouseEvent) => {
    e.preventDefault()
    onShopGender(gender)
  }
  return (
    <section className={styles.hero}>
      <Image
        src={heroImage}
        alt="Glute Project Hero"
        fill
        priority
        className={styles.image}
      />
      <div className={styles.overlayCtas}>
        <a href="#shop-section" className={styles.ctaButton} onClick={e => handleShop('women', e)}>
          Shop Women
        </a>
        <a href="#shop-section" className={styles.ctaButton} onClick={e => handleShop('men', e)}>
          Shop Men
        </a>
      </div>
    </section>
  )
}
