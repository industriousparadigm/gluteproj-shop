'use client'
import styles from './TextSection.module.css'
import commonStyles from '@/styles/common.module.css'

type Props = {
    title: string
    text: string
}

export default function TextSection({ title, text }: Props) {
    return (
<section className={`${styles.section} ${commonStyles.narrowContainer}`}>
<h2>{title}</h2>
            <p>{text}</p>
        </section>
    )
}
