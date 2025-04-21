'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import type { CartItem } from '@/lib/types'
import styles from './CartPage.module.css'

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

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
    
    const updateQuantity = (index: number, change: number) => {
        const updatedCart = [...cart]
        const item = updatedCart[index]
        const newQuantity = (item.quantity || 1) + change
        
        if (newQuantity < 1) return
        
        item.quantity = newQuantity
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
    
    const getSubtotal = () => {
        return cart.reduce((total, item) => {
            return total + item.price * (item.quantity || 1)
        }, 0)
    }
    
    const getTotal = () => {
        const subtotal = getSubtotal()
        // In a real app, you might calculate shipping, taxes, etc.
        return subtotal
    }

    const handleCheckout = async () => {
        setIsLoading(true)
        console.log('🟢 Sending cart to checkout:', cart)

        try {
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
        } catch (error) {
            console.error('❌ Checkout Error:', error)
            alert('An error occurred during checkout. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!cart.length) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Your Cart</h1>
                <div className={styles.emptyCart}>
                    <div className={styles.emptyMessage}>Your cart is currently empty</div>
                    <Link href="/" className={styles.continueShoppingBtn}>
                        <ShoppingBag size={16} style={{ marginRight: '0.5rem' }} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    const subtotal = getSubtotal()
    const total = getTotal()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Cart</h1>
            
            <div className={styles.cartList}>
                {cart.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src={item.image || '/product-placeholder.jpg'} 
                                alt={item.name} 
                                className={styles.image}
                                fill
                            />
                        </div>
                        
                        <div className={styles.itemDetails}>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <div className={styles.itemMeta}>
                                {item.color && <span>Color: {item.color}</span>}
                            </div>
                            <span className={styles.itemPrice}>€{item.price.toFixed(2)}</span>
                            
                            <div className={styles.itemActions}>
                                <div className={styles.quantity}>
                                    <button 
                                        className={styles.quantityButton}
                                        onClick={() => updateQuantity(index, -1)}
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className={styles.quantityValue}>{item.quantity || 1}</span>
                                    <button 
                                        className={styles.quantityButton}
                                        onClick={() => updateQuantity(index, 1)}
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            className={styles.removeButton} 
                            onClick={() => handleRemove(index)}
                            aria-label={`Remove ${item.name} from cart`}
                        >
                            <Trash2 size={18} />
                            <span>Remove</span>
                        </button>
                    </div>
                ))}
            </div>
            
            <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Subtotal</span>
                    <span className={styles.summaryValue}>€{subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Shipping</span>
                    <span className={styles.summaryValue}>Free</span>
                </div>
                <div className={styles.totalRow}>
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
                
                <button 
                    className={styles.checkoutButton} 
                    onClick={handleCheckout}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <Link href="/" className={styles.continueShopping}>
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}
