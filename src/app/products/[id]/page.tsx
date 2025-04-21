'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, CheckCircle } from 'lucide-react'
import styles from './ProductDetail.module.css'
import { Product } from '@/lib/types'
import { fetchProductBySlug } from '@/lib/sanity'

export default function ProductPage() {
    const params = useParams() as { id?: string }
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState(0)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true)
                if (params.id) {
                    const productData = await fetchProductBySlug(params.id)
                    console.log('📦 Fetched product details:', productData)
                    setProduct(productData)
                }
            } catch (error) {
                console.error('❌ Error fetching product data:', error)
            } finally {
                setLoading(false)
            }
        }

        if (params.id) fetchProductDetails()
    }, [params.id])

    const handleAddToCart = () => {
        if (!product) {
            console.warn('⚠️ No product data available to add to cart.')
            return
        }

        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            const existingItem = cart.find((item: any) => item.id === product.id)
            
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || '',
                    color: product.color,
                    quantity: 1
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
                <Link href="/" className={styles.backLink}>Return to Home</Link>
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
            teal: '#009688'
        }
        
        return colorMap[colorName.toLowerCase()] || '#ccc'
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                <span>/</span>
                <span>Products</span>
                <span>/</span>
                <span>{product.name}</span>
            </div>
            
            <div className={styles.productLayout}>
                <div className={styles.imageGallery}>
                    <div className={styles.mainImage}>
                        <Image 
                            src={product.images?.[selectedImage] || '/product-placeholder.jpg'} 
                            alt={product.name}
                            className={styles.mainImageInner}
                            fill
                            priority
                        />
                    </div>
                    
                    {product.images && product.images.length > 1 && (
                        <div className={styles.thumbnails}>
                            {product.images.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`}
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
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.price}>€{product.price.toFixed(2)}</div>
                    
                    {product.color && (
                        <div className={styles.color}>
                            Color: 
                            <span 
                                className={styles.colorSwatch} 
                                style={{ backgroundColor: getColorDisplay(product.color) }}
                            ></span>
                            <span className={styles.colorName}>{product.color}</span>
                        </div>
                    )}
                    
                    <p className={styles.description}>
                        {product.description || 
                        "This premium quality product is designed for maximum performance and comfort. Made with high-quality, breathable materials that move with your body, it's perfect for intense workouts or casual wear. The sleek design offers both style and functionality, making it an essential addition to your athletic wardrobe."}
                    </p>
                    
                    <div className={styles.buttons}>
                        <button className={styles.addToCart} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className={styles.wishlist} aria-label="Add to wishlist">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={styles.productFeatures}>
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
            </div>
            
            <div className={styles.relatedProducts}>
                <h2 className={styles.relatedTitle}>You May Also Like</h2>
                {/* Related products would go here */}
            </div>
        </div>
    )
}
