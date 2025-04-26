"use client"
import { useState } from "react"
import styles from "./ProductDetail.module.css"
import { ChevronDown, ChevronUp } from "lucide-react"

const sections = [
  {
    title: "Product features",
    content: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur.</p>
        <p>Aliquam erat volutpat. Nam vitae massa nec urna commodo cursus.</p>
      </div>
    ),
  },
  {
    title: "Material & care",
    content: (
      <div>
        <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.</p>
        <p>Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
      </div>
    ),
  },
  {
    title: "Delivery & returns",
    content: (
      <div>
        <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum.</p>
        <p>Donec sollicitudin molestie malesuada.</p>
      </div>
    ),
  },
  {
    title: "Ask a question",
    content: (
      <div>
        <p>Have a question? Email us at <a href="mailto:support@example.com">support@example.com</a> and we’ll get back to you soon!</p>
        <p>Or use our contact form for a quick response.</p>
      </div>
    ),
  },
]

export default function CollapsibleSections() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            style={{ display: openIndex === idx ? "block" : "none" }}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  )
}
