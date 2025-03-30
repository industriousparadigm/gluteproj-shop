'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CartItem } from '@/lib/types'

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const storedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
        console.log('🛒 Loaded cart data:', storedCart)
        setCart(storedCart)
    }, [])

    const handleRemove = (index: number) => {
        const updatedCart = [...cart]
        updatedCart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    if (!cart.length) return <div>Your cart is empty.</div>

    const handleCheckout = async () => {
        console.log('🟢 Sending cart to checkout:', cart)

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart })
        })

        const data = await res.json()
        console.log('🔄 Checkout response:', data)

        if (data.error) {
            console.error('❌ Checkout Error:', data.error)
            alert(`Error: ${data.error}`)
            return
        }

        window.location.href = data.checkoutUrl
    }

    return (
        <div className="text-section">
            <h1>Your Cart</h1>
            {cart.map((item, index) => (
                <div key={index} className="cart-item">
                    <Image src={item.image} alt={item.name} width={100} height={100} />
                    <div>
                        <h3>{item.name}</h3>
                        <p>€{item.price}</p>
                        <button onClick={() => handleRemove(index)}>Remove</button>
                    </div>
                </div>
            ))}
            <button onClick={handleCheckout} className="checkout-button">
                Proceed to Checkout
            </button>
            <Link href="/">Continue Shopping</Link>
        </div>
    )
}
