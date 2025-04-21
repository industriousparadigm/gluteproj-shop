'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

const images = [
  '/hero-wolv.webp',
  '/hero-b.png',
  '/hero-womanball.png'
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      {images.map((src, index) => (
        <div
          key={src}
          className={`${styles.slide} ${index === currentImage ? styles.active : ''}`}
        >
          <Image
            src={src}
            alt="Glute Project"
            fill
            priority={index === 0}
            className={styles.image}
          />
        </div>
      ))}
      
      <div className={styles.content}>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentImage ? styles.activeDot : ''}`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
