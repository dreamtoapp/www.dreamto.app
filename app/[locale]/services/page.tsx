import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  TrendingUp,
  Eye,
  ArrowRight,
  Zap,
  Target,
  Sparkles,
  Star,
  CheckCircle,
  Award,
  Clock,
  Shield,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import React from "react"
import { getTranslations, getLocale } from "next-intl/server"
import Link from '@/components/link'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  color: string
  textColor: string
  bgColor: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

interface HeroSectionProps {
  t: any
  locale: string
}

interface ServicesSectionProps {
  t: any
  services: Service[]
}

interface WhyChooseUsSectionProps {
  t: any
}

interface TestimonialsSectionProps {
  t: any
  testimonials: Testimonial[]
}

interface CTASectionProps {
  t: any
  locale: string
}

interface StatsSectionProps {
  t: any
}

// ============================================================================
// SEO STRUCTURED DATA
// ============================================================================

const getStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DreamToApp",
  alternateName: "دريم تو آب",
  description: "We combine creativity and technology to provide customized solutions for your business in Jeddah, Saudi Arabia",
  url: "https://dreamtoapp.com",
  logo: "https://dreamtoapp.com/assets/dreamtoapp/dreamToApp.svg",
  image: "https://dreamtoapp.com/assets/dreamtoapp/dreamToApp.svg",
  telephone: "+966554113107",
  email: "info@dreamto.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jeddah",
    addressLocality: "Jeddah",
    addressRegion: "Makkah Province",
    addressCountry: "SA",
    postalCode: "20000"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "21.4858",
    longitude: "39.1925"
  },
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia"
  },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "21.4858",
      longitude: "39.1925"
    },
    geoRadius: "50000"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966554113107",
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"],
    areaServed: "SA"
  },
  sameAs: [
    "https://facebook.com/dreamtoapp",
    "https://twitter.com/dreamtoapp",
    "https://linkedin.com/company/dreamtoapp",
    "https://instagram.com/dreamtoapp"
  ],
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description: "We turn your ideas into exceptional websites that impress visitors and engage them with your brand",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Application Development",
          description: "We create innovative and user-friendly applications that allow your clients to access your services easily",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce Development",
          description: "We build a complete online store that reflects your brand identity",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description: "We provide innovative modern designs that focus on user experience",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
          description: "We position your brand at the forefront of competition through integrated marketing strategies",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Visual Identity Design",
          description: "We create a unique visual identity that reflects your brand's personality",
        },
      }
    ]
  }
});

// ============================================================================
// HERO SECTION COMPONENTS
// ============================================================================

const HeroBadge: React.FC<{ t: any }> = ({ t }) => (
  <Badge variant="secondary" className="w-fit mb-2">
    <Sparkles className="w-4 h-4 mr-2" />
    {t("heroBadge")}
  </Badge>
)

const HeroTitle: React.FC<{ t: any }> = ({ t }) => (
  <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-foreground mt-0">
    <span className="text-primary">{t("heroTitle1")}</span>
    <br />
    <span className="text-secondary">{t("heroTitle2")}</span>
  </h1>
)

const HeroDescription: React.FC<{ t: any }> = ({ t }) => (
  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
    {t("heroDescription")}
  </p>
)

const HeroCTAs: React.FC<{ t: any; locale: string }> = ({ t, locale }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <Link href={`/${locale}/contactus`} passHref>
      <Button size="lg" className="bg-primary hover:bg-primary/90">
        <Target className="w-5 h-5 mr-2" />
        {t("ctaGetQuoteNow")}
      </Button>
    </Link>
    <Link href={`/${locale}/worksample`} passHref>
      <Button size="lg" variant="outline">
        {t("ctaViewPortfolio")}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </Link>
  </div>
)

const HeroStats: React.FC<{ t: any }> = ({ t }) => (
  <div className="flex items-center gap-6 pt-4">
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <Avatar key={i} className="border-2 border-background w-8 h-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
            <AvatarFallback>U{i}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{t("happyClients")}</span>
    </div>
    <Separator orientation="vertical" className="h-6" />
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-4 h-4 fill-accent text-accent" />
      ))}
      <span className="text-sm text-muted-foreground ml-2">{t("rating")}</span>
    </div>
  </div>
)

const HeroImage: React.FC = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
    <Card className="relative border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <Image
          src="/assets/dreamtoapp/dreamToApp.svg"
          alt="Innovative Technology Solutions - Website Development, Mobile Apps, and Digital Marketing Services"
          width={600}
          height={500}
          className="rounded-lg"
          priority
        />
      </CardContent>
    </Card>
  </div>
)

const HeroSection: React.FC<HeroSectionProps> = ({ t, locale }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="relative container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <HeroBadge t={t} />
              <HeroTitle t={t} />
              <HeroDescription t={t} />
            </div>
            <HeroCTAs t={t} locale={locale} />
            <HeroStats t={t} />
          </div>
          <HeroImage />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SERVICES SECTION COMPONENTS
// ============================================================================

const ServicesHeader: React.FC<{ t: any }> = ({ t }) => (
  <header className="text-center mb-16">
    <Badge variant="outline" className="mb-4">
      <Zap className="w-4 h-4 mr-2" />
      {t("professionalServices")}
    </Badge>
    <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
      {t("tecnoUsed")}
    </h2>
    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      {t("blendingCreativity")}
    </p>
  </header>
)

const ServiceIcon: React.FC<{ service: Service }> = ({ service }) => (
  <div className="flex justify-center mt-6 mb-2">
    <div className={`${service.bgColor} p-4 rounded-full border shadow-sm group-hover:scale-110 transition-transform duration-300`}>
      {React.createElement(service.icon, { className: `w-10 h-10 ${service.textColor}` })}
    </div>
  </div>
)

const ServiceFeatures: React.FC<{ service: Service; t: any }> = ({ service, t }) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-primary" />
      {t("keyFeatures")}
    </h4>
    <div className="grid grid-cols-2 gap-2">
      {service.features.map((feature: string, featureIndex: number) => (
        <div key={featureIndex} className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
          <CheckCircle className={`w-3 h-3 ${service.textColor} flex-shrink-0`} />
          <span className="text-xs text-muted-foreground">{feature}</span>
        </div>
      ))}
    </div>
  </div>
)

const ServiceCard: React.FC<{ service: Service; t: any }> = ({ service, t }) => (
  <Card className="group hover:shadow-xl transition-all duration-500 border hover:border-primary/20 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
    <ServiceIcon service={service} />
    <CardHeader className="pb-4">
      <CardTitle className={`text-xl font-bold group-hover:${service.textColor} transition-colors`}>
        {service.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <CardDescription className="text-muted-foreground leading-relaxed text-sm">
        {service.description}
      </CardDescription>
      <ServiceFeatures service={service} t={t} />
      <Button className={`w-full group-hover:${service.bgColor} group-hover:text-foreground transition-colors`}>
        {t("learnMoreAbout", { service: service.title })}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardContent>
  </Card>
)

const ServicesSection: React.FC<ServicesSectionProps> = ({ t, services }) => {
  return (
    <section className="py-24 bg-muted/30" id="services">
      <div className="container mx-auto px-4">
        <ServicesHeader t={t} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// WHY CHOOSE US SECTION COMPONENTS
// ============================================================================

const WhyChooseUsHeader: React.FC<{ t: any }> = ({ t }) => (
  <div className="space-y-4">
    <Badge variant="outline">
      <Award className="w-4 h-4 mr-2" />
      {t("whyChooseUs")}
    </Badge>
    <h2 className="text-4xl font-bold text-foreground">{t("innovateFutureSolutions")}</h2>
    <p className="text-lg text-muted-foreground leading-relaxed">
      {t("whyChooseUsDesc")}
    </p>
  </div>
)

const WhyChooseUsItem: React.FC<{ item: { icon: React.ComponentType<{ className?: string }>; title: string; description: string } }> = ({ item }) => (
  <div className="flex gap-4">
    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
      <item.icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  </div>
)

const WhyChooseUsImage: React.FC = () => (
  <div className="relative">
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardContent className="p-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 opacity-70 blur-sm z-10 pointer-events-none" />
        <Image
          src="/assets/dta.svg"
          alt="DreamToApp Logo - Professional team working on innovative technology solutions"
          width={500}
          height={400}
          className="rounded-lg opacity-80 relative z-20"
          loading="lazy"
        />
      </CardContent>
    </Card>
  </div>
)

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ t }) => {
  const whyChooseItems = [
    {
      icon: Rocket,
      title: t("fastDelivery"),
      description: t("fastDeliveryDesc"),
    },
    {
      icon: Shield,
      title: t("secureSolutions"),
      description: t("secureSolutionsDesc"),
    },
    {
      icon: Clock,
      title: t("support247"),
      description: t("support247Desc"),
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <WhyChooseUsHeader t={t} />
            <div className="grid gap-6">
              {whyChooseItems.map((item, index) => (
                <WhyChooseUsItem key={index} item={item} />
              ))}
            </div>
          </div>
          <WhyChooseUsImage />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TESTIMONIALS SECTION COMPONENTS
// ============================================================================

const TestimonialsHeader: React.FC<{ t: any }> = ({ t }) => (
  <header className="text-center mb-16">
    <Badge variant="outline" className="mb-4">
      <Star className="w-4 h-4 mr-2" />
      {t("clientTestimonials")}
    </Badge>
    <h2 className="text-4xl font-bold text-foreground mb-4">{t("whatOurClientsSay")}</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      {t("testimonialsIntro")}
    </p>
  </header>
)

const TestimonialRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
)

const TestimonialAuthor: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="flex items-center gap-3 pt-4">
    <Avatar>
      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
      <AvatarFallback>
        {testimonial.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="font-semibold text-foreground">{testimonial.name}</div>
      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
    </div>
  </div>
)

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
    <CardContent className="p-6 space-y-4">
      <TestimonialRating rating={testimonial.rating} />
      <blockquote className="text-muted-foreground italic leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      <TestimonialAuthor testimonial={testimonial} />
    </CardContent>
  </Card>
)

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ t, testimonials }) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <TestimonialsHeader t={t} />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA & STATS SECTION COMPONENTS
// ============================================================================

const CTAContent: React.FC<{ t: any; locale: string }> = ({ t, locale }) => (
  <div className="max-w-4xl mx-auto space-y-8">
    <Badge className="bg-background/20 text-primary-foreground border-primary-foreground/30">
      <Sparkles className="w-4 h-4 mr-2" />
      {t("limitedTimeOffer")}
    </Badge>
    <h2 className="text-4xl lg:text-5xl font-bold">{t("highDiscounts")}</h2>
    <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
      {t("ctaReady")}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href={`/${locale}/contactus`} passHref>
        <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
          <Target className="w-5 h-5 mr-2" />
          {t("ctaFreeQuote")}
        </Button>
      </Link>
      <Link href={`/${locale}/contactus`} passHref>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground text-primary-foreground bg-accent hover:bg-accent/90"
        >
          {t("ctaScheduleConsultation")}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  </div>
)

const CTASection: React.FC<CTASectionProps> = ({ t, locale }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 text-center">
        <CTAContent t={t} locale={locale} />
      </div>
    </section>
  )
}

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="space-y-2">
    <div className="text-3xl lg:text-4xl font-bold text-primary">{value}</div>
    <div className="text-muted-foreground">{label}</div>
  </div>
)

const StatsSection: React.FC<StatsSectionProps> = ({ t }) => {
  const stats = [
    { value: "500+", label: t("projectsCompleted") },
    { value: "98%", label: t("clientSatisfaction") },
    { value: "24/7", label: t("supportAvailable") },
    { value: "5+", label: t("yearsExperience") },
  ]

  return (
    <section className="py-16 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function ServicesPage() {
  const t = await getTranslations("services")
  const locale = await getLocale()
  const services = [
    {
      icon: Globe,
      title: t("websiteDevelopmentTitle"),
      description: t("websiteDevelopmentDescription"),
      features: [t("responsiveDesign"), t("fastLoading"), t("seoOptimized"), t("userFriendly")],
      color: "bg-primary",
      textColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Smartphone,
      title: t("mobileAppDevelopmentTitle"),
      description: t("mobileAppDevelopmentDescription"),
      features: [t("crossPlatform"), t("nativePerformance"), t("pushNotifications"), t("offlineSupport")],
      color: "bg-secondary",
      textColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: ShoppingCart,
      title: t("ecommerceDevelopmentTitle"),
      description: t("ecommerceDevelopmentDescription"),
      features: [t("securePayments"), t("inventoryManagement"), t("multiCurrency"), t("analyticsDashboard")],
      color: "bg-destructive",
      textColor: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Palette,
      title: t("uiUxDesignTitle"),
      description: t("uiUxDesignDescription"),
      features: [t("userResearch"), t("prototyping"), t("designSystems"), t("usabilityTesting")],
      color: "bg-muted",
      textColor: "text-muted-foreground",
      bgColor: "bg-muted/50",
    },
    {
      icon: TrendingUp,
      title: t("digitalMarketingTitle"),
      description: t("digitalMarketingDescription"),
      features: [t("seoOptimization"), t("socialMedia"), t("ppcCampaigns"), t("contentStrategy")],
      color: "bg-accent",
      textColor: "text-accent-foreground",
      bgColor: "bg-accent/10",
    },
    {
      icon: Eye,
      title: t("visualIdentityTitle"),
      description: t("visualIdentityDescription"),
      features: [t("logoDesign"), t("brandGuidelines"), t("marketingMaterials"), t("brandStrategy")],
      color: "bg-primary",
      textColor: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "Their website development service transformed our online presence completely. The results exceeded our expectations!",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowthCo",
      content: "The mobile app they developed for us increased our customer engagement by 300%. Highly recommended!",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, E-Shop Plus",
      content: "Our e-commerce store built by their team generated 250% more sales in the first quarter. Amazing work!",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }} />
      <div className="min-h-screen bg-background">
        <HeroSection t={t} locale={locale} />
        <ServicesSection t={t} services={services} />
        <WhyChooseUsSection t={t} />
        <TestimonialsSection t={t} testimonials={testimonials} />
        <CTASection t={t} locale={locale} />
        <StatsSection t={t} />
      </div>
    </>
  )
}
