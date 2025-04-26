import Image from 'next/image'
import styles from './FullBleedImage.module.css'

interface FullBleedImageProps {
  src: string
  alt: string
  priority?: boolean
}

export default function FullBleedImage({ src, alt, priority = false }: FullBleedImageProps) {
  return (
    <div className={styles.fullBleedImage}>
      <Image src={src} alt={alt} fill priority={priority} className={styles.bleedImg} />
    </div>
  )
}
