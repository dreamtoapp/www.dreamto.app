"use client"

import React, { useRef, useCallback, useMemo, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "./button"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

// Stable particle configuration
const PARTICLE_CONFIG = Array.from({ length: 20 }, (_, i) => {
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
          ease: "linear",
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
          ease: "linear",
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
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

// Optimized video component with performance enhancements
const OptimizedVideoBackground = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoLoad = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        src="https://framerusercontent.com/assets/1g8IkhtJmlWcC4zEYWKUmeGWzI.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.7) contrast(1.1)",
          transform: "scale(1.05)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />
    </>
  )
})

OptimizedVideoBackground.displayName = "OptimizedVideoBackground"

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
          ease: [0.25, 0.46, 0.45, 0.94],
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
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    }),
    [],
  )

  const textVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    [],
  )

  const buttonVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      },
      hover: {
        scale: 1.05,
        y: -2,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.1,
        },
      },
    }),
    [],
  )

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden text-center">
      {/* Optimized Video Background */}
      <OptimizedVideoBackground />

      {/* Animated Background Elements */}
      <AnimatedBackground />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        style={{ y: springY, scale }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
      >
        {/* Enhanced Logo Animation */}
        <motion.div
          variants={logoVariants}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src="/assets/dta.svg"
            alt="DTA Logo"
            width={160}
            height={120}
            className="mx-auto mb-8 max-w-[160px] w-full h-auto drop-shadow-2xl"
            style={{ filter: "invert(1) drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}
            priority
          />
        </motion.div>

        {/* Enhanced Headline */}
        <motion.h1
          className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight text-white"
          variants={textVariants}
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)",
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("slogon")}
          </motion.span>
        </motion.h1>

        {/* Enhanced Subheading */}
        <motion.p
          className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 font-medium"
          variants={textVariants}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
             {t("subHeader")}
            {/* Transform your ideas into reality with cutting-edge technology */}
          </motion.span>
        </motion.p>

        {/* Enhanced Quote */}
        <motion.blockquote
          className="mb-10 max-w-3xl mx-auto text-base md:text-xl italic font-medium text-white/95 relative"
          variants={fadeUpVariants}
        >
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
          <div className="pl-8 relative">
            <span className="text-pink-400 text-3xl absolute -top-2 -left-2">"</span>
            {t("subHeader2")}
            <span className="text-pink-400 text-3xl absolute -bottom-4 -right-2">"</span>
          </div>
        </motion.blockquote>

        {/* Enhanced CTA Button */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            className="rounded-full px-8 py-3 text-lg font-semibold border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl hover:shadow-white/25"
          >
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {t("ctaButton")}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{
            borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.5)"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
