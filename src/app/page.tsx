'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/stripe-products')
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.error('❌ Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div>
            <div className="hero">
                <Image src="/hero.webp" alt="Marianas Apparel" layout="fill" objectFit="cover" priority />
            </div>

            <section className="text-section">
                <h2>Empower Your Workout</h2>
                <p>
                    Discover stylish and comfortable activewear designed for performance. Whether you're hitting the gym
                    or going for a run, our pieces keep you moving with confidence.
                </p>
            </section>

            <section className="product-grid">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="product-card">
                            <Image src={product.image} alt={product.name} width={300} height={300} />
                            <h3>{product.name}</h3>
                            <p>{product.price === 'N/A' ? 'Price on request' : `€${product.price}`}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    )
}
