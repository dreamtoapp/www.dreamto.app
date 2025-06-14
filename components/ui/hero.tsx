"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, useSpring, easeInOut } from "framer-motion"
import { Button } from "./button"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

// Stable particle configuration
// Reduce to 8 particles for less main-thread work
const PARTICLE_CONFIG = Array.from({ length: 8 }, (_, i) => {
  // Use a deterministic seed for consistent positioning
  const seed1 = i * 123.456
  const seed2 = i * 789.012
  const seed3 = i * 345.678

  return {
    id: `particle-${i}`,
    left: (Math.sin(seed1) * 0.5 + 0.5) * 100,
    top: (Math.sin(seed2) * 0.5 + 0.5) * 100,
    delay: (Math.sin(seed3) * 0.5 + 0.5) * 2,
    duration: 3 + (Math.sin(seed1 + seed2) * 0.5 + 0.5) * 2,
  }
})

// Enhanced decorative background with stable particles
const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [0.6, 0.2])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: easeInOut,
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
        style={{ y: y2 }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: easeInOut,
        }}
      />

      {/* Floating particles - always render but with conditional animation */}
      {PARTICLE_CONFIG.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.left.toFixed(4)}%`,
            top: `${particle.top.toFixed(4)}%`,
          }}
          initial={{ opacity: 0 }}
          animate={
            mounted
              ? {
                  y: [-20, -100, -20],
                  opacity: [0, 1, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: particle.duration,
            repeat: mounted ? Number.POSITIVE_INFINITY : 0,
            delay: particle.delay,
            ease: easeInOut,
          }}
        />
      ))}
    </motion.div>
  )
}

// Optimized video component with performance enhancements
// Progressive background: static image first, then video enhancement
const ProgressiveBackground = React.memo(() => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Defer video until after first paint for Speed Index
    const timeout = setTimeout(() => setShowVideo(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Static fallback image for instant paint */}
      <Image
        src="/assets/dta.svg"
        alt="DreamToApp background"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.12 }}
        aria-hidden="true"
      />
      {/* Video loads after initial paint for progressive enhancement */}
      {showVideo && (
        <video
          ref={videoRef}
          src="https://framerusercontent.com/assets/1g8IkhtJmlWcC4zEYWKUmeGWzI.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.7) contrast(1.1)", transform: "scale(1.05)", zIndex: 1 }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none z-10" />
    </>
  );
});

ProgressiveBackground.displayName = "ProgressiveBackground";

const Hero: React.FC = () => {
  const t = useTranslations("homepage")
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Scroll-based animations
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  // Stable animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    }),
    [],
  )

  const fadeUpVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
        filter: "blur(10px)",
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: easeInOut,
        },
      },
    }),
    [],
  )

  const logoVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.5,
        rotate: -10,
        filter: "blur(20px)",
      },
      show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        transition: {
          duration: 1,
          ease: easeInOut,
        },
      },
    }),
    [],
  )

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ y: springY, scale }}
    >
      <ProgressiveBackground />
      <AnimatedBackground />

      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          variants={fadeUpVariants}
        >
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full"
            variants={logoVariants}
          >
            <Image
              src="/assets/dta.svg"
              alt={t('logo.alt')}
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            variants={fadeUpVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl"
            variants={fadeUpVariants}
          >
            {t('description')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeUpVariants}
          >
            <Link href="/contactus">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {t('cta.primary')}
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {t('cta.secondary')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Hero
