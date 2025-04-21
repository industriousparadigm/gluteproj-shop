'use client'
import Link from 'next/link'
import { CheckCircle, Home } from 'lucide-react'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
    // Generate a random order number for demonstration purposes
    const orderNumber = `GP-${Math.floor(100000 + Math.random() * 900000)}`
    
    return (
        <div className={styles.container}>
            <div className={styles.checkmark}>
                <CheckCircle size={50} />
            </div>
            
            <h1 className={styles.title}>Order Confirmed</h1>
            
            <p className={styles.message}>
                Thank you for your purchase! We've received your order and are getting it ready to ship.
                A confirmation email has been sent to your email address.
            </p>
            
            <div className={styles.orderNumber}>
                Order #{orderNumber}
            </div>
            
            <div className={styles.infoBox}>
                <h2 className={styles.infoTitle}>What Happens Next?</h2>
                <p className={styles.infoText}>
                    1. You'll receive an order confirmation email with your order details.
                </p>
                <p className={styles.infoText}>
                    2. Once your order ships, we'll send you tracking information.
                </p>
                <p className={styles.infoText}>
                    3. You can check your order status anytime in your account.
                </p>
            </div>
            
            <Link href="/" className={styles.homeButton}>
                <Home size={16} style={{ marginRight: '0.5rem' }} />
                Continue Shopping
            </Link>
        </div>
    )
}
