"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import {
  ArrowRight,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Image from 'next/image';

import Link from '@/components/link';
import Text from '@/components/Text';
import { buttonVariants } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { cn } from '@/lib/utils';

// Ultra-smooth spring configurations
const ultraSmoothSpring = {
  stiffness: 320,
  damping: 45,
  restDelta: 0.0001,
  restSpeed: 0.0001,
}

const smoothSpring = {
  stiffness: 420,
  damping: 38,
  restDelta: 0.001,
}

const gentleSpring = {
  stiffness: 220,
  damping: 55,
  restDelta: 0.0001,
}

const EnhancedCareerBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const t = useTranslations("homepage")
  const locale = useLocale()
  const { isScrolling, scrollDirection } = useSmoothScroll()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Enhanced scroll tracking with smoother offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Multiple layers of smooth springs for different elements
  const ultraSmoothProgress = useSpring(scrollYProgress, ultraSmoothSpring)
  const smoothProgress = useSpring(scrollYProgress, smoothSpring)
  const gentleProgress = useSpring(scrollYProgress, gentleSpring)

  // Velocity-based smooth animations
  const scrollVelocity = useVelocity(scrollYProgress)
  const smoothVelocity = useSpring(scrollVelocity, ultraSmoothSpring)
  const clampedVelocity = useTransform(smoothVelocity, [-2, 0, 2], [-1, 0, 1])

  // Custom motion values for ultra-smooth animations
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, ultraSmoothSpring)
  const smoothMouseY = useSpring(mouseY, ultraSmoothSpring)

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion) {
        mouseX.set((e.clientX - window.innerWidth / 2) * 0.008)
        mouseY.set((e.clientY - window.innerHeight / 2) * 0.008)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, prefersReducedMotion])

  // Hero section animations with enhanced transitions
  const heroScale = useTransform(ultraSmoothProgress, [0, 0.6], [1, 0.92])
  const heroY = useTransform(smoothProgress, [0, 0.6], [0, -5])
  const heroOpacity = useTransform(gentleProgress, [0.4, 0.7], [1, 0.4])
  const heroRotate = useTransform(ultraSmoothProgress, [0, 0.5], [0, -0.8])

  // Enhanced logo animations with depth effect
  const logoScale = useTransform(ultraSmoothProgress, [0, 0.3, 0.6], [1, 1.08, 0.97])
  const logoY = useTransform(smoothProgress, [0, 0.5], [0, -15])
  const logoRotate = useTransform(gentleProgress, [0, 1], [0, 8])
  const logoOpacity = useTransform(ultraSmoothProgress, [0.5, 0.8], [1, 0.8])

  // Background animations with enhanced parallax
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1.05, 1.15])
  const backgroundY = useTransform(gentleProgress, [0, 1], [0, -15])
  const backgroundRotate = useTransform(ultraSmoothProgress, [0, 1], [0, 3])

  // Mouse-based subtle parallax
  const backgroundParallaxX = useTransform(smoothMouseX, [-50, 50], [-2, 2])
  const backgroundParallaxY = useTransform(smoothMouseY, [-50, 50], [-2, 2])

  // Dynamic gradient based on scroll
  const gradientOpacity = useTransform(ultraSmoothProgress, [0, 0.3, 0.7], [0.1, 0.65, 1])
  const gradientHue = useTransform(smoothProgress, [0, 1], [220, 290])

  // Text section with smoother animations
  const textOpacity = useTransform(gentleProgress, [0.25, 0.55], [0, 1])
  const textY = useTransform(smoothProgress, [0.25, 0.55], [80, 0])
  const textScale = useTransform(ultraSmoothProgress, [0.25, 0.55], [0.97, 1])

  // Floating elements with organic movement
  const floatingY = useTransform(gentleProgress, [0, 1], [0, -20])
  const floatingRotate = useTransform(smoothProgress, [0, 1], [0, 10])

  // Dynamic blur with velocity response
  const backdropBlur = useTransform([ultraSmoothProgress, clampedVelocity], ([progress, velocity]) => {
    const baseBlur = (progress as number) * 15
    const velocityBlur = Math.abs(velocity as number) * 4
    return Math.min(baseBlur + velocityBlur, 20)
  })

  // Velocity-based dynamic scaling
  const dynamicScale = useTransform(clampedVelocity, [-1, 0, 1], [0.99, 1, 1.01])

  // Scroll direction-based tilt
  const scrollTilt = useTransform(clampedVelocity, [-1, 0, 1], [0.5, 0, -0.5])

  // Create transform functions for percentage values
  const heroYTransform = useTransform(heroY, (value) => `${value}%`)
  const backgroundYTransform = useTransform(backgroundY, (value) => `${value}%`)
  const textYTransform = useTransform(textY, (value) => `${value}%`)
  const floatingYTransform = useTransform(floatingY, (value) => `${value}%`)
  const logoYTransform = useTransform(logoY, (value) => `${value}px`)

  // Create dynamic gradient transform
  const dynamicGradient = useTransform(
    gradientHue,
    (hue) => `linear-gradient(135deg, 
      hsl(${hue}, 65%, 97%) 0%, 
      hsl(${hue + 30}, 55%, 95%) 50%, 
      hsl(${hue + 60}, 60%, 93%) 100%)`,
  )

  // Enhanced background overlay gradients
  const backgroundOverlay = useTransform(
    gradientHue,
    (hue) => `radial-gradient(ellipse at center, 
      hsla(${hue}, 75%, 25%, 0.1) 0%, 
      hsla(${hue + 40}, 65%, 35%, 0.25) 50%, 
      hsla(${hue + 80}, 55%, 45%, 0.4) 100%)`,
  )

  const glassBackground = useTransform(
    [gradientHue, gradientOpacity],
    ([hue, opacity]) => `linear-gradient(135deg, 
      hsla(${hue}, 35%, 100%, ${(opacity as number) * 0.2}) 0%, 
      hsla(${(hue as number) + 30}, 25%, 100%, ${(opacity as number) * 0.1}) 100%)`,
  )

  const backdropBlurTransform = useTransform(backdropBlur, (blur) => `blur(${blur}px) saturate(1.3)`)

  // Loading handlers
  const handleBackgroundLoad = useCallback(() => {
    setBackgroundLoaded(true)
  }, [])

  const handleLogoLoad = useCallback(() => {
    setLogoLoaded(true)
  }, [])

  // Memoized transform values for performance
  const transforms = useMemo(
    () => ({
      heroScale,
      heroY: heroYTransform,
      heroOpacity,
      heroRotate,
      logoScale,
      logoY: logoYTransform,
      logoRotate,
      logoOpacity,
      backgroundScale,
      backgroundY: backgroundYTransform,
      backgroundRotate,
      backgroundParallaxX,
      backgroundParallaxY,
      gradientOpacity,
      gradientHue,
      textOpacity,
      textY: textYTransform,
      textScale,
      floatingY: floatingYTransform,
      floatingRotate,
      backdropBlur: backdropBlurTransform,
      dynamicScale,
      scrollTilt,
      dynamicGradient,
      backgroundOverlay,
      glassBackground,
    }),
    [
      heroScale,
      heroYTransform,
      heroOpacity,
      heroRotate,
      logoScale,
      logoYTransform,
      logoRotate,
      logoOpacity,
      backgroundScale,
      backgroundYTransform,
      backgroundRotate,
      backgroundParallaxX,
      backgroundParallaxY,
      gradientOpacity,
      gradientHue,
      textOpacity,
      textYTransform,
      textScale,
      floatingYTransform,
      floatingRotate,
      backdropBlurTransform,
      dynamicScale,
      scrollTilt,
      dynamicGradient,
      backgroundOverlay,
      glassBackground,
    ],
  )

  // Ultra-smooth floating animation
  const floatingAnimation = useCallback(
    (delay = 0) => ({
      y: [0, -12, 0],
      rotate: [0, 2, -2, 0],
      scale: [1, 1.03, 1],
      transition: {
        duration: prefersReducedMotion ? 0 : 7,
        repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      },
    }),
    [prefersReducedMotion],
  )

  // Staggered animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        ...ultraSmoothSpring,
        duration: 0.8,
      },
    },
  }

  // Optimized dot component
  const Dot = ({ index }: { index: number }) => {
    const opacity = useTransform(gradientOpacity, [0, 1], [0.2, 0.7])
    const scale = useTransform(dynamicScale, [0.98, 1.02], [0.85, 1.15])

    return (
      <motion.div
        className="w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        style={{
          opacity,
          scale,
        }}
      />
    )
  }

  const FloatingElements = () => {
    return [...Array(20)].map((_, i) => {
      const floatingElementY = useTransform(floatingY, [0, -20], [0, -4 * (i + 1)])

      return (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 5}%`,
            top: `${3 + i * 5}%`,
            y: floatingElementY,
            rotate: transforms.floatingRotate,
            x: transforms.backgroundParallaxX,
          }}
          animate={floatingAnimation(i * 0.12)}
        >
          <Dot index={i} />
        </motion.div>
      )
    })
  }

  return (
    <div ref={containerRef} className="relative h-[220vh] overflow-hidden">
      {/* Enhanced dynamic background gradient */}
      <motion.div
        className="fixed inset-0"
        style={{
          opacity: transforms.gradientOpacity,
          background: transforms.dynamicGradient,
        }}
      />

      {/* Particle overlay for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/subtle-pattern.svg')] bg-[length:180px] opacity-10" />
        <FloatingElements />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Hero Section with Enhanced Glass Effect */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            scale: transforms.dynamicScale,
            rotateX: transforms.scrollTilt,
          }}
        >
          {/* Optimized Background Pattern */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              scale: transforms.backgroundScale,
              y: transforms.backgroundY,
              rotate: transforms.backgroundRotate,
              x: transforms.backgroundParallaxX,
              rotateY: transforms.backgroundParallaxY,
            }}
          >
            <div className="relative w-full h-full">
              {/* Geometric background pattern */}
              <div className="absolute inset-0 opacity-15">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 45%),
                                   radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 45%),
                                   radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 45%)`,
                    backgroundSize: "400px 400px",
                  }}
                />
              </div>

              {/* Dynamic gradient overlays */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: transforms.backgroundOverlay,
                }}
              />
            </div>
          </motion.div>

          {/* Main hero container with enhanced glass morphism */}
          <motion.div
            className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
            style={{
              scale: transforms.heroScale,
              y: transforms.heroY,
              opacity: transforms.heroOpacity,
              rotate: transforms.heroRotate,
            }}
          >
            {/* Ultra-smooth glass morphism background */}
            <motion.div
              className="absolute inset-0 bg-white/15 rounded-3xl sm:rounded-4xl border border-white/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
              style={{
                backdropFilter: transforms.backdropBlur,
                background: transforms.glassBackground,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            />

            {/* Content with enhanced logo integration */}
            <motion.div
              className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 flex flex-col items-center text-center"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Enhanced Logo Section */}
              <motion.div
                className="mb-8 sm:mb-12 relative"
                variants={staggerItem}
                style={{
                  scale: transforms.logoScale,
                  y: transforms.logoY,
                  rotate: transforms.logoRotate,
                  opacity: transforms.logoOpacity,
                }}
              >
                {/* Logo glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Logo container with depth effect */}
                <motion.div
                  className="relative bg-white/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl border border-white/30"
                  whileHover={{
                    scale: 1.03,
                    rotate: 1,
                    transition: { type: "spring", ...ultraSmoothSpring },
                  }}
                >
                  {/* Animated loading shimmer */}
                  {!logoLoaded && (
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer bg-[length:200%_100%]" />
                    </div>
                  )}

                  {/* Enhanced DTA Logo with depth */}
                  <div className="relative w-24 h-20 sm:w-32 sm:h-28 md:w-40 md:h-36 lg:w-48 lg:h-44 xl:w-56 xl:h-52 2xl:w-64 2xl:h-60">
                    <Image
                      src="/assets/dta.svg"
                      alt="Dream To App Logo"
                      fill
                      priority
                      quality={100}
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, (max-width: 1536px) 224px, 256px"
                      className={cn(
                        "object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-lg",
                        logoLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      )}
                      onLoad={handleLogoLoad}
                    />
                  </div>

                  {/* Reflective highlight */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent rounded-t-3xl opacity-30"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Brand badge with enhanced styling */}
              <motion.div
                className="mb-6 sm:mb-8"
                variants={staggerItem}
                whileHover={{
                  scale: 1.03,
                  transition: { type: "spring", ...ultraSmoothSpring },
                }}
              >
                <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white bg-white/25 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/30 shadow-lg">
                  <motion.div animate={floatingAnimation(0)}>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                  </motion.div>
                  Dream To App
                </span>
              </motion.div>

              {/* Enhanced title with depth */}
              <motion.div className="mb-6 sm:mb-8" variants={staggerItem}>
                <motion.div
                  style={{
                    x: transforms.backgroundParallaxX,
                    y: transforms.backgroundParallaxY,
                  }}
                >
                  <Text
                    variant="h1"
                    locale={locale}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                    cairoFont
                  >
                    {t("slogon")}
                  </Text>
                </motion.div>
                <motion.div
                  className="mt-4 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"
                  style={{
                    width: useTransform(heroOpacity, [0.4, 1], [60, 220]),
                  }}
                  animate={{
                    background: [
                      "linear-gradient(90deg, #60a5fa, #a855f7)",
                      "linear-gradient(90deg, #a855f7, #ec4899)",
                      "linear-gradient(90deg, #ec4899, #60a5fa)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Subtitle with enhanced typography */}
              <motion.div className="mb-8 sm:mb-10" variants={staggerItem}>
                <Text
                  variant="p"
                  locale={locale}
                  className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  cairoFont
                >
                  Transform your ideas into reality with cutting-edge technology
                </Text>
              </motion.div>

              {/* Enhanced floating action icons */}
              <motion.div className="flex gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10" variants={staggerItem}>
                {[Zap, Rocket, Sparkles].map((Icon, index) => {
                  const floatingElementY = useTransform(floatingY, [0, -20], [0, -6 * (index + 1)])

                  return (
                    <motion.div
                      key={index}
                      className="p-4 sm:p-5 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm rounded-full text-white shadow-xl border border-white/20"
                      animate={floatingAnimation(index * 0.3)}
                      whileHover={{
                        scale: 1.15,
                        rotate: 8,
                        transition: { type: "spring", ...ultraSmoothSpring },
                      }}
                      whileTap={{
                        scale: 0.92,
                        transition: { type: "spring", ...ultraSmoothSpring },
                      }}
                      style={{
                        y: floatingElementY,
                      }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Enhanced CTA Button */}
              <motion.div
                variants={staggerItem}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { type: "spring", ...ultraSmoothSpring },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { type: "spring", ...ultraSmoothSpring },
                }}
              >
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group border border-white/30 backdrop-blur-sm relative overflow-hidden",
                  )}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: [-100, 100],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>

                  <Text variant="h2" locale={locale} className="text-lg sm:text-xl md:text-2xl font-semibold relative z-10" cairoFont>
                    Get Started Now
                  </Text>
                  <motion.div
                    className="ml-3 relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Text Section with Smooth Transitions */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center p-2 sm:p-4"
          style={{
            opacity: transforms.textOpacity,
            y: transforms.textY,
            scale: transforms.textScale,
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 100
          }}
          transition={{
            type: "spring",
            ...ultraSmoothSpring,
            delay: 0.3,
          }}
        >
          <motion.div
            className="bg-white/97 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-14 rounded-t-3xl sm:rounded-t-4xl shadow-2xl w-full max-w-6xl mx-auto border-t border-white/60"
            style={{
              backdropFilter: `blur(${Math.min(backdropBlur.get(), 18)}px) saturate(1.4)`,
              boxShadow: "0 -10px 50px -10px rgba(0,0,0,0.1)",
            }}
          >
            <motion.div
              className="max-w-4xl mx-auto text-center"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Enhanced section header */}
              <motion.div className="mb-6 sm:mb-8 md:mb-10" variants={staggerItem}>
                <motion.div
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6"
                  whileHover={{
                    scale: 1.03,
                    transition: { type: "spring", ...ultraSmoothSpring },
                  }}
                >
                  <motion.div animate={floatingAnimation(0)}>
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  Transform Your Vision
                </motion.div>

                <Text
                  variant="h2"
                  locale={locale}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
                  cairoFont
                >
                  {t("fromIdeaTitle")}
                </Text>
              </motion.div>

              {/* Enhanced description */}
              <motion.div className="mb-8 sm:mb-10 md:mb-12" variants={staggerItem}>
                <Text
                  variant="p"
                  locale={locale}
                  className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
                  cairoFont
                >
                  {t("fromIdeaContent")}
                </Text>
              </motion.div>

              {/* Enhanced CTA button with shine effect */}
              <motion.div
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  transition: { type: "spring", ...ultraSmoothSpring },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { type: "spring", ...ultraSmoothSpring },
                }}
              >
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group w-full sm:w-auto relative overflow-hidden",
                  )}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: [-100, 100],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>

                  <Text
                    variant="h2"
                    locale={locale}
                    className="text-base sm:text-lg md:text-xl font-semibold relative z-10"
                    cairoFont
                  >
                    {t("fromIdeaButton")}
                  </Text>
                  <motion.div
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Enhanced trust indicators */}
              <motion.div
                className="mt-8 sm:mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 text-sm sm:text-base text-gray-500"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { color: "green", text: "Trusted by 10k+ users" },
                  { color: "blue", text: "99.9% Uptime" },
                  { color: "purple", text: "24/7 Support" },
                ].map((item, index) => (
                  <motion.div key={index} className="flex items-center gap-2" variants={staggerItem}>
                    <motion.div
                      className={`w-2 h-2 bg-${item.color}-400 rounded-full`}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                      }}
                    />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default EnhancedCareerBlock