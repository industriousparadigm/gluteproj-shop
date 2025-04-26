"use client"

import { Product } from '@/lib/types'
import styles from './ProductGrid.module.css'
import ProductCard from './ProductCard'

interface SimpleProductGridProps {
  products: Product[]
  className?: string
}

export default function SimpleProductGrid({ products, className = '' }: SimpleProductGridProps) {
  if (!products?.length) {
    return null
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
