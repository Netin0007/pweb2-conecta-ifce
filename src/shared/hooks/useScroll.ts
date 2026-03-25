// src/hooks/useScroll.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function useScroll() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)

      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView()
        })
      }
      return
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0 })
    })
  }, [hash, key])
}
