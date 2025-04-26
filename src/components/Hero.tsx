'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

// Only use a single hero image
const heroImage = '/hero-wolv.webp'

export default function Hero() {
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
        <Link href="/products/women" className={styles.ctaButton}>
          Shop Women
        </Link>
        <Link href="/products/men" className={styles.ctaButton}>
          Shop Men
        </Link>
      </div>
    </section>
  )
}
