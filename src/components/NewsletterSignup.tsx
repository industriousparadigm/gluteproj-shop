"use client"

import { useState } from "react"
import styles from "./NewsletterSignup.module.css"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setSubmitted(true)
    // TODO: Integrate with backend/newsletter provider
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Sign up and save</h2>
      <p className={styles.subheading}>Subscribe for 10% off your first order</p>
      {submitted ? (
        <div className={styles.success}>Thank you for subscribing!</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <input
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email address"
            required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.button} type="submit">Subscribe</button>
        </form>
      )}
    </section>
  )
}
