'use client'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
    return (
        <section className={styles.hero}>
            <Image src="/hero.jpg" alt="Hero" layout="fill" objectFit="cover" priority className={styles.image} />
        </section>
    )
}
