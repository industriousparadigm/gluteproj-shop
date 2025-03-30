'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/lib/types'
import { fetchSanityProducts } from '@/lib/sanity'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sanityProducts = await fetchSanityProducts()
                setProducts(sanityProducts)
            } catch (error) {
                console.error('❌ Error fetching from Sanity:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <Hero />

            <TextSection
                title="Empower Your Workout"
                text="Discover stylish and comfortable activewear designed for performance. Whether you're hitting the gym or going for a run, our pieces keep you moving with confidence."
            />

            <ProductGrid products={products} title="Women’s Clothing" gender="women" />

            <section className="mid-banner">
                <Image src="/mid-banner.jpg" alt="Mid banner" layout="fill" objectFit="cover" />
            </section>

            <ProductGrid products={products} title="Men’s Clothing" gender="men" />

            <footer className="footer">
                <p>© 2025, footer business here. All rights reserved.</p>
            </footer>
        </div>
    )
}
