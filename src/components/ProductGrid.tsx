'use client'

import { Product } from '@/lib/types'
import styles from './ProductGrid.module.css'
import ProductCard from './ProductCard'

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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
