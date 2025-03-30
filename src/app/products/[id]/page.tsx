'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ProductPage() {
    const params = useParams() as { id?: string }
    const router = useRouter()

    const [productData, setProductData] = useState<{
        id: number
        name: string
        description: string
        image: string
        price: number
    } | null>(null)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`/api/stripe-product?id=${params.id}`)
                const data = await res.json()
                setProductData(data)
            } catch (error) {
                console.error('❌ Error fetching product data:', error)
            }
        }

        if (params.id) fetchProductDetails()
    }, [params.id])

    const handleAddToCart = () => {
        console.log('🛒 Add to Cart clicked!')

        if (!productData) {
            console.warn('⚠️ No product data available to add to cart.')
            return
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.push({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('✅ Product added to cart:', productData)

        alert(`${productData.name} added to cart!`) // 👈 Nice touch for feedback
        router.push('/cart')
    }

    if (!productData) return <div>Loading product details...</div>

    return (
        <div className="text-section">
            <h1>{productData.name}</h1>
            <Image src={productData.image} alt={productData.name} width={400} height={400} />
            <p>{productData.description}</p>
            <p>€{productData.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}
