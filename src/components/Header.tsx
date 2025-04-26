'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // Check if user had previously set a theme preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark-mode')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark-mode')
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.style.colorScheme = 'dark'
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.style.colorScheme = 'light'
      localStorage.setItem('theme', 'light')
    }
  }

  const scrollToShop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault()
      const shopSection = document.querySelector('#shop-section')
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isHomePage || isScrolled ? styles.solid : ''}`

  return (
    <header className={headerClass}>
      <div className={styles.container}>
        <div className={styles.leftNav}>
          <button
            className={styles.menuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
            <Link href="/" className={styles.link} onClick={scrollToShop}>Shop Collection</Link>
            <Link href="/about" className={styles.link}>About</Link>
          </nav>
        </div>

        <Link href="/" className={styles.logo}>
          GLUTE PROJECT
          <span className={styles.logoApparel}>APPAREL</span>
        </Link>

        <div className={styles.rightNav}>
          <Link href="/cart" className={styles.cart}>
            <ShoppingBag size={24} />
          </Link>
          
          <button 
            className={styles.themeToggle}
            onClick={handleDarkModeToggle}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
