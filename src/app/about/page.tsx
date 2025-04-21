'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>OUR MISSION</h1>
        <p className={styles.subtitle}>Empowering strength, confidence, and peak performance</p>
      </section>
      
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <h2 className={styles.sectionTitle}>THE GLUTE PROJECT STORY</h2>
          <p className={styles.paragraph}>
            Founded in 2023, Glute Project was born from a passion to revolutionize performance wear. We recognized that the foundation of all athletic movement—the posterior chain—deserved specialized attention in both function and form.
          </p>
          <p className={styles.paragraph}>
            Our journey began with a simple mission: create apparel that celebrates strength while delivering uncompromising performance. We understand that when you feel powerful, you perform powerfully. Every piece we design represents this philosophy.
          </p>
          <p className={styles.paragraph}>
            We&apos;ve assembled a team of elite athletes, cutting-edge designers, and textile engineers who share our vision. Together, we craft products that seamlessly integrate into your fitness journey, whether you&apos;re setting personal records or embracing a new challenge.
          </p>
        </div>
        
        <div className={styles.imageContainer}>
          <Image 
            src="/glute-team.webp" 
            alt="The Glute Project Team" 
            fill
            className={styles.storyImage}
          />
        </div>
      </section>
      
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>OUR CORE VALUES</h2>
        
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>PERFORMANCE</h3>
            <p className={styles.valueDescription}>
              Every stitch, every fiber, every design element serves a purpose. We rigorously test our products to ensure they enhance rather than inhibit your natural movement.
            </p>
          </div>
          
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>CONFIDENCE</h3>
            <p className={styles.valueDescription}>
              We design apparel that makes you feel unstoppable. When you look your best, you unleash your potential and push beyond limitations.
            </p>
          </div>
          
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>SUSTAINABILITY</h3>
            <p className={styles.valueDescription}>
              Our commitment extends beyond performance. We continuously innovate to reduce our environmental footprint while creating products that last.
            </p>
          </div>
          
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>COMMUNITY</h3>
            <p className={styles.valueDescription}>
              Glute Project is more than apparel—it&apos;s a movement. We celebrate every individual who strives for excellence and embraces the journey of self-improvement.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.quoteSection}>
        <blockquote className={styles.quote}>
          &quot;The body achieves what the mind believes. Our mission is to create apparel worthy of that belief.&quot;
          <cite className={styles.quoteAuthor}>— Founder, Glute Project</cite>
        </blockquote>
      </section>
      
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>JOIN THE MOVEMENT</h2>
        <p className={styles.ctaText}>
          Experience the difference when form meets function and style meets strength.
        </p>
        <Link href="/" className={styles.ctaButton}>
          Shop Collection <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
        </Link>
      </section>
    </div>
  )
}
