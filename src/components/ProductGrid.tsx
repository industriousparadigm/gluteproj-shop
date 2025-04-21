'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import styles from './ProductGrid.module.css'

interface Props {
  title: string
  products: Product[]
  className?: string
}

export default function ProductGrid({ title, products, className = '' }: Props) {
  if (!products?.length) {
    return (
      <div className={`${styles.container} ${className}`}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.empty}>No products available</p>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
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
