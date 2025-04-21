import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Shop</h3>
          <Link href="/collections/men" className={styles.link}>Men</Link>
          <Link href="/collections/women" className={styles.link}>Women</Link>
          <Link href="/new-arrivals" className={styles.link}>New Arrivals</Link>
          <Link href="/sale" className={styles.link}>Sale</Link>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Company</h3>
          <Link href="/about" className={styles.link}>About Us</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          <Link href="/careers" className={styles.link}>Careers</Link>
          <Link href="/stores" className={styles.link}>Stores</Link>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Customer Service</h3>
          <Link href="/shipping" className={styles.link}>Shipping</Link>
          <Link href="/returns" className={styles.link}>Returns</Link>
          <Link href="/size-guide" className={styles.link}>Size Guide</Link>
          <Link href="/faq" className={styles.link}>FAQ</Link>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Connect With Us</h3>
          <div className={styles.newsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            <button className={styles.button}>Subscribe</button>
          </div>
          <div className={styles.social}>
            <Link href="https://instagram.com" className={styles.link}>
              <Instagram size={24} />
            </Link>
            <Link href="https://facebook.com" className={styles.link}>
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com" className={styles.link}>
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
