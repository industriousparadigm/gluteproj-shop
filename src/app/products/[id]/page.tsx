'use client'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import styles from './ProductDetail.module.css'
import { Product, Variant } from '@/lib/types'
import { fetchProductBySlug, fetchProducts } from '@/lib/sanity'
import SimpleProductGrid from '@/components/SimpleProductGrid'
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const colorParam = searchParams.get('color')
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  console.log('Product:', product)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        if (params.id) {
          const productData = await fetchProductBySlug(params.id)
          console.log('📦 Fetched product details:', productData)
          
          if (productData) {
            setProduct(productData)
            
            // Fetch and set related products
            const allProducts = await fetchProducts()
            // Filter by same gender, exclude current product and its variants
            const baseId = productData.id.split('__')[0]
            const filtered = allProducts.filter(
              p => p.gender === productData.gender && p.id.split('__')[0] !== baseId
            )
            // Shuffle and take up to 4
            const shuffled = filtered.sort(() => 0.5 - Math.random())
            setRelatedProducts(shuffled.slice(0, 4))
            
            // Check for color parameter and select variant if needed
            if (colorParam && productData.variants?.length) {
              const matchingVariant = productData.variants.find(
                v => v.color.toLowerCase() === colorParam.toLowerCase()
              )
              if (matchingVariant) {
                setSelectedVariant(matchingVariant)
              } else {
                setSelectedVariant(null)
              }
            } else {
              setSelectedVariant(null)
            }
            
            setSelectedImage(0)
          }
        }
      } catch (error) {
        console.error('❌ Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProductDetails()
  }, [params.id]) // Only re-fetch when the product ID changes, not the color

  // Separate effect just to handle URL color param changes without re-fetching data
  useEffect(() => {
    if (product && colorParam && product.variants?.length) {
      const matchingVariant = product.variants.find(
        v => v.color.toLowerCase() === colorParam.toLowerCase()
      )
      
      if (matchingVariant) {
        // Just update the selected variant without re-fetching
        setSelectedVariant(matchingVariant)
        setSelectedImage(0)
      }
    } else if (product && !colorParam) {
      // Reset to primary variant when color param is removed
      setSelectedVariant(null)
      setSelectedImage(0)
    }
  }, [colorParam, product]);

  const handleVariantChange = (variant: Variant) => {
    console.log('Selected variant:', variant)
    setSelectedVariant(variant)
    setSelectedImage(0) // Reset to first image when changing variant
    
    // Update URL with color parameter when variant changes - use replace with shallow option
    const newUrl = `/products/${params.id}?color=${variant.color.toLowerCase()}`
    router.replace(newUrl, { scroll: false })
  }

  // Handle selection of the primary/default color variant
  const handlePrimaryVariantSelect = () => {
    setSelectedVariant(null)
    setSelectedImage(0)
    
    // Update URL to remove color parameter when selecting the primary variant - use replace with shallow option
    const newUrl = `/products/${params.id}`
    router.replace(newUrl, { scroll: false })
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

  // Get current display images based on selected variant or main product
  const currentImages = selectedVariant?.images?.length ? 
    selectedVariant.images : 
    product?.images || []

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
          {/* Title/price with divider */}
          <div className={styles.headerColumn}>
            <h1 className={styles.title}>{product.name}</h1>
            <span className={styles.price} style={{ color: 'var(--text-primary, #222)' }}>€{product.price.toFixed(2)}</span>
          </div>
          <div className={styles.divider} />

          {/* Sizes from CMS as small buttons */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizesSection}>
              <div className={styles.sizesLabel}>Available sizes</div>
              <div className={styles.sizesList}>
                {product.sizes.map(size => (
                  <button key={size} className={styles.sizeButton} type="button">{size}</button>
                ))}
              </div>
            </div>
          )}

          {/* Description below sizes, above add to cart */}
          {product.description && (
            <p className={styles.description}>
              {product.description}
            </p>
          )}

          {/* Always show color variants selector, even if only one color */}
          <div className={styles.colorVariants}>
            <div className={styles.variantsLabel}>Options</div>
            <div className={styles.variantSwatches}>
              {/* Default color swatch (for single-color products or default variant) */}
              <button 
                className={`${styles.variantSwatch} ${!selectedVariant ? styles.variantSwatchActive : ''}`}
                style={{ backgroundColor: getColorDisplay(product.color) }}
                onClick={handlePrimaryVariantSelect}
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

          {/* Add to cart and wishlist styled buttons */}
          <div className={styles.buttons}>
            <button className={styles.addToCart} onClick={handleAddToCart} type="button">
              ADD TO CART
            </button>
            <button className={styles.wishlist} type="button" aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
          </div>

          {/* Collapsible sections below the button */}
          <CollapsibleSections features={product.features} materialAndCare={product.materialAndCare} />
        </div>
      </div>

      {/* You may also like section - limit to 3 */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>You may also like</h3>
          <SimpleProductGrid products={relatedProducts.slice(0, 3)} />
        </div>
      )}
    </div>
  )
}
