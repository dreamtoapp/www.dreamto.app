"use client"

import {
  useEffect,
  useState,
} from 'react';

export function useSmoothScroll() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolling(true)
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up")
      setLastScrollY(currentScrollY)

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
        setScrollDirection(null)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  return { isScrolling, scrollDirection }
}
