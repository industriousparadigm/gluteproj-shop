'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import styles from './ProductDetail.module.css'
import { Product, Variant } from '@/lib/types'
import { fetchProductBySlug } from '@/lib/sanity'
import CollapsibleSections from './CollapsibleSections'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  quantity: number
}

export default function ProductPage() {
  const params = useParams() as { id?: string }
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  console.log('Product:', product)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        if (params.id) {
          const productData = await fetchProductBySlug(params.id)
          console.log('📦 Fetched product details:', productData)
          setProduct(productData)
          
          // Reset selected variant and image when product changes
          setSelectedVariant(null)
          setSelectedImage(0)
        }
      } catch (error) {
        console.error('❌ Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) fetchProductDetails()
  }, [params.id])

  // Get current display images based on selected variant or main product
  const currentImages = selectedVariant?.images?.length ? 
    selectedVariant.images : 
    product?.images || []

  const handleVariantChange = (variant: Variant) => {
    console.log('Selected variant:', variant)
    setSelectedVariant(variant)
    setSelectedImage(0) // Reset to first image when changing variant
  }

  const handleAddToCart = () => {
    if (!product) {
      console.warn('⚠️ No product data available to add to cart.')
      return
    }

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]
      const existingItem = cart.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: currentImages?.[0] || '',
          color: selectedVariant?.color || product.color,
          quantity: 1,
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      console.log('✅ Product added to cart:', product)
      alert(`${product.name} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Product not found</div>
        <Link href="/" className={styles.backLink}>
          Return to Home
        </Link>
      </div>
    )
  }

  // Get the color display for the swatch
  const getColorDisplay = (colorName: string) => {
    const colorMap: Record<string, string> = {
      black: '#000',
      white: '#fff',
      red: '#f44336',
      blue: '#2196f3',
      green: '#4caf50',
      yellow: '#ffeb3b',
      pink: '#e91e63',
      purple: '#9c27b0',
      orange: '#ff9800',
      gray: '#9e9e9e',
      brown: '#795548',
      teal: '#009688',
    }

    return colorMap[colorName.toLowerCase()] || '#ccc'
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.productLayout}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={currentImages?.[selectedImage] || '/product-placeholder.jpg'}
              alt={product.name}
              fill
              className={styles.mainImageInner}
            />
          </div>

          {currentImages && currentImages.length > 1 && (
            <div className={styles.thumbnails}>
              {currentImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.details}>
          {/* Streamlined title/price with divider */}
          <div className={styles.headerColumn}>
            <h1 className={styles.title}>{product.name}</h1>
            <span className={styles.price}>€{product.price.toFixed(2)}</span>
          </div>
          <div className={styles.divider} />

          {/* Always show color variants selector, even if only one color */}
          <div className={styles.colorVariants}>
            <div className={styles.variantsLabel}>
              Options
            </div>
            <div className={styles.variantSwatches}>
              {/* Default color swatch (for single-color products or default variant) */}
              <button 
                className={`${styles.variantSwatch} ${!selectedVariant ? styles.variantSwatchActive : ''}`}
                style={{ backgroundColor: getColorDisplay(product.color) }}
                onClick={() => setSelectedVariant(null)}
                aria-label={`Select ${product.color} color`}
                title={product.color}
              />
              {/* Variant color swatches (if any) */}
              {product.variants?.map((variant) => (
                <button
                  key={variant.slug}
                  className={`${styles.variantSwatch} ${selectedVariant?.color === variant.color ? styles.variantSwatchActive : ''}`}
                  style={{ backgroundColor: getColorDisplay(variant.color) }}
                  onClick={() => handleVariantChange(variant)}
                  aria-label={`Select ${variant.color} color`}
                  title={variant.color}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className={styles.sizes}>
            <div className={styles.sizesLabel}>Size</div>
            <div className={styles.sizeOptions}>
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={styles.sizeButton}
                  // TODO: Add selection logic
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.description}>
            {product.description ||
              'This premium quality product is designed for maximum performance and comfort. Made with high-quality, breathable materials that move with your body, it\'s perfect for intense workouts or casual wear. The sleek design offers both style and functionality, making it an essential addition to your athletic wardrobe.'}
          </p>

          <div className={styles.buttons}>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={styles.wishlist} aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
          </div>

          <CollapsibleSections />
        </div>
      </div>

      {/* REMOVE PRODUCT FEATURES SECTION */}
      {/* <div className={styles.productFeatures}>
        <h2 className={styles.featureTitle}>Product Features</h2>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            High-performance, breathable fabric
          </li>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            Moisture-wicking technology
          </li>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            Four-way stretch for maximum mobility
          </li>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            Flatlock seams to prevent chafing
          </li>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            UV protection
          </li>
          <li className={styles.featureItem}>
            <CheckCircle size={16} className={styles.featureIcon} />
            Machine washable
          </li>
        </ul>
      </div> */}

      <div className={styles.relatedProducts}>
        <h2 className={styles.relatedTitle}>You May Also Like</h2>
        {/* Related products would go here */}
      </div>
    </div>
  )
}
