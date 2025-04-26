'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import styles from './ProductGrid.module.css'

interface Props {
  products: Product[]
  className?: string
  selectedGender?: 'women' | 'men'
  onGenderToggle?: (gender: 'women' | 'men') => void
}

export default function ProductGrid({ products, className = '', selectedGender, onGenderToggle }: Props) {
  if (!products?.length) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.verticalHeading}>
          <span className={styles.shopLabel}>Shop</span>
          <h3 className={styles.title}>Our top picks</h3>
        </div>
        {/* Gender toggle (if handler provided) */}
        {onGenderToggle && (
          <div className={styles.genderToggle}>
            <button 
              className={`${styles.genderButton} ${selectedGender === 'women' ? styles.genderButtonActive : ''}`}
              onClick={() => onGenderToggle('women')}
              tabIndex={0}
            >
              Women
            </button>
            <button 
              className={`${styles.genderButton} ${selectedGender === 'men' ? styles.genderButtonActive : ''}`}
              onClick={() => onGenderToggle('men')}
              tabIndex={0}
            >
              Men
            </button>
          </div>
        )}
        <p className={styles.empty}>No products available</p>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.verticalHeading}>
        <span className={styles.shopLabel}>Shop</span>
        <h3 className={styles.title}>Our top picks</h3>
      </div>
      {/* Gender toggle (if handler provided) */}
      {onGenderToggle && (
        <div className={styles.genderToggle}>
          <button 
            className={`${styles.genderButton} ${selectedGender === 'women' ? styles.genderButtonActive : ''}`}
            onClick={() => onGenderToggle('women')}
            tabIndex={0}
          >
            Women
          </button>
          <button 
            className={`${styles.genderButton} ${selectedGender === 'men' ? styles.genderButtonActive : ''}`}
            onClick={() => onGenderToggle('men')}
            tabIndex={0}
          >
            Men
          </button>
        </div>
      )}
      <div className={styles.grid}>
        {products.map((product) => {
          // Use a placeholder image if no product image is available
          const imageUrl = product.images?.[0] || '/product-placeholder.jpg'
          
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={styles.product}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.viewDetails}>View Details</span>
                </div>
              </div>
              <div className={styles.info}>
                <h4 className={styles.name}>{product.name}</h4>
                <div className={styles.details}>
                  <span className={styles.color}>{product.color}</span>
                  <span className={styles.price}>€{product.price}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
