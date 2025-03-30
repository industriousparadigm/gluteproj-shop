'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductGrid.module.css'
import commonStyles from '@/styles/common.module.css'
import { Product } from '@/lib/types'

type Props = {
    title: string
    products: Product[]
}

export default function ProductGrid({ title, products }: Props) {
    return (
        <section className={styles.gridSection}>
            <div className={commonStyles.container}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.slug}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className={styles.image}
                                />

                                {product.images[1] && (
                                    <Image
                                        src={product.images[1]}
                                        alt={`${product.name} (alt view)`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className={`${styles.image} ${styles.secondary}`}
                                    />
                                )}
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{product.name}</h3>
                                {product.color && <p className={styles.color}>{product.color}</p>}
                                <p className={styles.price}>€{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
