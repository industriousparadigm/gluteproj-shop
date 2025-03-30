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

    const maleProducts = products.filter((product) => !!product.gender && product.gender !== 'women')
    const femaleProducts = products.filter((product) => !!product.gender && product.gender !== 'men')

    return (
        <div>
            <Hero />

            <TextSection
                title="Empower Your Workout"
                text="Discover stylish and comfortable activewear designed for performance. Whether you're hitting the gym or going for a run, our pieces keep you moving with confidence."
            />

            {femaleProducts.length > 0 && <ProductGrid products={femaleProducts} title="Women’s Clothing" />}

            <section className="mid-banner">
                <Image src="/mid-banner.jpg" alt="Mid banner" layout="fill" objectFit="cover" />
            </section>

            {maleProducts.length > 0 && <ProductGrid products={maleProducts} title="Men’s Clothing" />}

            <footer className="footer">
                <p>© 2025, footer business here. All rights reserved.</p>
            </footer>
        </div>
    )
}
