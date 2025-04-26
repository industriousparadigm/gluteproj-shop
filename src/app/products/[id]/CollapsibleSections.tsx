"use client"
import { useState } from "react"
import styles from "./ProductDetail.module.css"
import { ChevronDown, ChevronUp } from "lucide-react"
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export interface CollapsibleSectionsProps {
  features: PortableTextBlock[]
  materialAndCare: PortableTextBlock[]
}

export default function CollapsibleSections({ features, materialAndCare }: CollapsibleSectionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sections = [
    {
      title: 'Product features',
      content: <PortableText value={features} />,
    },
    {
      title: 'Material & care',
      content: <PortableText value={materialAndCare} />,
    },
    {
      title: 'Delivery & returns',
      content: (
        <p>
          We offer free delivery on all orders over €50. Returns are accepted within 30 days of delivery. Items must be unworn and in original packaging. Please see our returns policy for more information.
        </p>
      ),
    },
    {
      title: 'Ask a question',
      content: (
        <div>
          <p>Have a question? Email us at <a href="mailto:support@example.com">support@example.com</a> and we’ll get back to you soon!</p>
          <p>Or use our contact form for a quick response.</p>
        </div>
      ),
    },
  ]

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className={styles.collapsibleSections}>
      {sections.map((section, idx) => (
        <div className={styles.collapsibleSection} key={section.title}>
          <button
            className={styles.collapsibleHeader}
            onClick={() => handleToggle(idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`section-content-${idx}`}
            type="button"
          >
            <span>{section.title.toUpperCase()}</span>
            {openIndex === idx ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </button>
          <div
            id={`section-content-${idx}`}
            className={styles.collapsibleContent}
            style={{ display: openIndex === idx ? 'block' : 'none' }}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  )
}
