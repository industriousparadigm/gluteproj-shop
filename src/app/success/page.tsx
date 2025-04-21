'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CornerDownLeft, Check } from 'lucide-react'
import styles from './SuccessPage.module.css'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  quantity: number
}

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState<{
    total: string;
    items: number;
  } | null>(null)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]
    if (cart.length) {
      const itemCount = cart.reduce((acc: number, item: CartItem) => acc + (item.quantity || 1), 0)
      const total = cart.reduce((acc: number, item: CartItem) => 
        acc + (item.price * (item.quantity || 1)), 0).toFixed(2)
      
      setOrderDetails({ total: `€${total}`, items: itemCount })
      
      // Clear cart after successful order
      localStorage.removeItem('cart')
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.iconContainer}>
          <Check size={40} className={styles.icon} />
        </div>
        
        <h1 className={styles.title}>Order Confirmed!</h1>
        
        <p className={styles.message}>
          Thank you for your purchase. We&apos;re excited to get your order on its way!
        </p>
        
        {orderDetails && (
          <div className={styles.orderDetails}>
            <p>Your order of {orderDetails.items} item{orderDetails.items !== 1 ? 's' : ''} with a total of {orderDetails.total} has been confirmed.</p>
            <p>You&apos;ll receive an email confirmation shortly with tracking details.</p>
          </div>
        )}
        
        <div className={styles.nextSteps}>
          <h2>What&apos;s Next?</h2>
          <ul>
            <li>Order processing: 1-2 business days</li>
            <li>Shipping: 3-5 business days</li>
            <li>You&apos;ll receive tracking information by email</li>
          </ul>
        </div>
        
        <Link href="/" className={styles.returnButton}>
          <CornerDownLeft size={18} style={{ marginRight: '0.5rem' }} />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
