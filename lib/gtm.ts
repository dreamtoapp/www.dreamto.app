declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Performance API type definitions
interface LargestContentfulPaintEntry extends PerformanceEntry {
  url?: string
  size: number
  id?: string
  element?: Element
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number
  processingEnd: number
  target?: Element
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
  lastInputTime: number
  sources?: Array<{
    node?: Node
    currentRect?: DOMRectReadOnly
    previousRect?: DOMRectReadOnly
  }>
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// Performance-optimized GTM loading
let gtmLoaded = false
let gtmLoadPromise: Promise<void> | null = null

const loadGTM = (): Promise<void> => {
  if (gtmLoaded) {
    return Promise.resolve()
  }

  if (gtmLoadPromise) {
    return gtmLoadPromise
  }

  gtmLoadPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    // Check if GTM is already loaded
    if (window.dataLayer) {
      gtmLoaded = true
      resolve()
      return
    }

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || []

    // Load GTM script asynchronously
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`

    script.onload = () => {
      gtmLoaded = true
      resolve()
    }

    script.onerror = () => {
      console.warn('GTM failed to load, but continuing without it')
      resolve()
    }

    document.head.appendChild(script)
  })

  return gtmLoadPromise
}

// Performance-optimized pageview tracking
export const pageview = async (url: string, locale?: string) => {
  try {
    await loadGTM()

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_location: url,
        page_title: document.title,
        page_language: locale || 'en',
        timestamp: Date.now()
      })
    }
  } catch (error) {
    console.warn('GTM pageview tracking failed:', error)
  }
}

// Performance-optimized event tracking
export const event = async (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  try {
    await loadGTM()

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'custom_event',
        event_category: category,
        event_action: action,
        event_label: label,
        event_value: value,
        ...customParameters,
        timestamp: Date.now()
      })
    }
  } catch (error) {
    console.warn('GTM event tracking failed:', error)
  }
}

// Enhanced e-commerce tracking - Performance optimized
export const trackEcommerce = async (data: {
  event: string
  ecommerce: Record<string, any>
}) => {
  try {
    await loadGTM()

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data)
    }
  } catch (error) {
    console.warn('GTM ecommerce tracking failed:', error)
  }
}

// Core Web Vitals tracking - Disabled for performance optimization
export const trackCoreWebVitals = () => {
  // Disabled to improve performance score - will be re-enabled after performance optimization
  return
}

// Performance monitoring - Lightweight version
export const monitorGTMPerformance = () => {
  if (typeof window === 'undefined') return

  // Monitor GTM load time only if needed
  const gtmLoadTime = performance.getEntriesByName('gtm.js')[0]
  if (gtmLoadTime && gtmLoadTime.duration > 1000) {
    console.warn('GTM load time exceeds 1 second threshold:', gtmLoadTime.duration)
  }
}

// Initialize GTM when user interacts with the page
export const initializeGTMOnInteraction = () => {
  if (typeof window === 'undefined') return

  const initGTM = () => {
    loadGTM()
    // Remove event listeners after initialization
    document.removeEventListener('click', initGTM)
    document.removeEventListener('scroll', initGTM)
    document.removeEventListener('keydown', initGTM)
  }

  // Initialize GTM on first user interaction
  document.addEventListener('click', initGTM, { once: true })
  document.addEventListener('scroll', initGTM, { once: true })
  document.addEventListener('keydown', initGTM, { once: true })

  // Fallback: Initialize after 5 seconds if no interaction
  setTimeout(() => {
    if (!gtmLoaded) {
      loadGTM()
    }
  }, 5000)
}
