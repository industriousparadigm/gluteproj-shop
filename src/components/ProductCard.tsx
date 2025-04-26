"use client"

import styles from './ProductGrid.module.css'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || '/product-placeholder.jpg'
  const secondImageUrl = product.images?.[1]

  // Check if this is a variant product
  const isVariant = Boolean(product.parentSlug)
  
  // Generate the link with color query parameter if it's a variant
  const productLink = isVariant
    ? `/products/${product.parentSlug}?color=${product.color.toLowerCase()}`
    : `/products/${product.slug}`

  return (
    <Link
      key={product.id}
      href={productLink}
      className={styles.product}
      tabIndex={0}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={product.name}
          className={secondImageUrl ? `${styles.image} ${styles.firstImage}` : styles.image}
          loading="lazy"
        />
        {secondImageUrl && (
          <img
            src={secondImageUrl}
            alt={product.name + ' alternate view'}
            className={`${styles.image} ${styles.secondImage}`}
            loading="lazy"
          />
        )}
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
}
