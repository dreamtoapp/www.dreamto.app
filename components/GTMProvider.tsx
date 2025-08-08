'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview, initializeGTMOnInteraction } from '@/lib/gtm'
import { initializePerformanceMonitoring, testGTMPerformance } from '@/lib/gtm-config'
import { initializeDOMOptimization } from '@/lib/dom-optimization'

interface GTMProviderProps {
  children: React.ReactNode
  locale: string
}

export function GTMProvider({ children, locale }: GTMProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize GTM on user interaction for better performance
    initializeGTMOnInteraction()

    // Initialize performance monitoring
    initializePerformanceMonitoring()

    // Initialize DOM optimization
    initializeDOMOptimization()

    // Test GTM performance in development mode
    if (process.env.NODE_ENV === 'development') {
      // Test after a short delay to allow GTM to initialize
      const testTimer = setTimeout(() => {
        testGTMPerformance()
      }, 2000)

      return () => clearTimeout(testTimer)
    }
  }, [])

  useEffect(() => {
    // Track page views with performance optimization
    const trackPageview = async () => {
      try {
        await pageview(pathname, locale)

        // Log in development mode
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 GTM Pageview tracked:', pathname, locale)
        }
      } catch (error) {
        // Silent error handling for performance
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to track pageview:', error)
        }
      }
    }

    trackPageview()
  }, [pathname, locale])

  return <>{children}</>
}
