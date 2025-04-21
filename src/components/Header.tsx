'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          <Link href="/collections/men" className={styles.link}>Men</Link>
          <Link href="/collections/women" className={styles.link}>Women</Link>
          <Link href="/about" className={styles.link}>About</Link>
        </nav>

        <Link href="/" className={styles.logo}>
          GLUTE PROJECT
        </Link>

        <Link href="/cart" className={styles.cart}>
          <ShoppingBag size={24} />
        </Link>
      </div>
    </header>
  )
}
