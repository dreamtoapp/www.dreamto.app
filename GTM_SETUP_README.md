# 🎯 GTM Setup Guide for DreamToApp

## ✅ **GTM Implementation Complete**

### **📋 What's Been Implemented:**

#### **1. Core GTM Files Created:**
- ✅ `lib/gtm.ts` - Main GTM library with tracking functions
- ✅ `lib/business-events.ts` - DreamToApp specific business events
- ✅ `components/GTMProvider.tsx` - GTM provider component
- ✅ `hooks/useGTMEvents.ts` - Custom hook for easy event tracking

#### **2. Layout Integration:**
- ✅ `app/layout.tsx` - GTM script and noscript fallback
- ✅ `app/[locale]/layout.tsx` - GTMProvider integration
- ✅ **Clicky Analytics Removed** - Clean GTM-only setup

#### **3. Tracking Functions Available:**
- ✅ **Page Views** - Automatic with locale support
- ✅ **Core Web Vitals** - LCP, FID, CLS tracking
- ✅ **Form Submissions** - Contact, Start Dream, Job Applications, Newsletter
- ✅ **Service Interactions** - Mobile, Ecommerce, UI/UX interest
- ✅ **Portfolio Views** - Project and work sample tracking
- ✅ **Consultation Events** - Requests, bookings, express queries
- ✅ **User Behavior** - Button clicks, navigation, scroll depth
- ✅ **System Events** - GTM load success/error tracking

## 🔧 **Setup Steps:**

### **1. Create GTM Account:**
1. Visit: https://tagmanager.google.com/
2. Create Account: "DreamToApp"
3. Create Container: "DreamToApp Web"
4. Choose Platform: "Web"
5. Get Container ID: `GTM-XXXXXXX`

### **2. Environment Variables:**
Create `.env.local` file:
```bash
# GTM Configuration
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GTM_DEBUG=false
NEXT_PUBLIC_GTM_ENVIRONMENT=production
```

### **3. Update GTM ID:**
Replace `GTM-XXXXXXX` in:
- `app/layout.tsx` (lines 15 and 25)
- `.env.local` file

### **4. Test Implementation:**
```bash
pnpm dev
```

## 📊 **Usage Examples:**

### **Basic Event Tracking:**
```typescript
import { event } from '@/lib/gtm'

// Track button click
event('button_click', 'Button', 'contact_form_submit', 1, {
  button_name: 'contact_submit',
  page: '/contact',
  language: 'en'
})
```

### **Business Event Tracking:**
```typescript
import { trackContactFormSubmission } from '@/lib/business-events'

// Track form submission
trackContactFormSubmission(formData, 'en')
```

### **Using the Hook:**
```typescript
import { useGTMEvents } from '@/hooks/useGTMEvents'

function MyComponent() {
  const { trackButtonClick, trackServiceInterest } = useGTMEvents()
  
  const handleServiceClick = () => {
    trackServiceInterest('mobile_development')
  }
  
  return (
    <button onClick={() => trackButtonClick('service_cta', '/services')}>
      Get Started
    </button>
  )
}
```

## 🎯 **Events Being Tracked:**

### **📊 Form Submissions (4 Events)**
- Contact form, Start Dream form, Job applications, Newsletter signups

### **🛠️ Service Interactions (5 Events)**  
- Service page views, inquiries, and specific service interests

### **💼 Portfolio & Projects (3 Events)**
- Portfolio views, work sample views, Crombo plugin inquiries

### **📞 Consultation & Support (4 Events)**
- Consultation requests, bookings, express queries, project quotes

### **👤 User Behavior (4 Events)**
- Button clicks, navigation, scroll depth, language switches

### **⚡ Performance Monitoring (4 Events)**
- Core Web Vitals (LCP, FID, CLS) and GTM load times

### **🔄 System Events (4 Events)**
- Page views, GTM success/errors, migration tracking

## 🚀 **Next Steps:**

1. **Create GTM Account** and get Container ID
2. **Update Environment Variables** with your GTM ID
3. **Test in Development** - Check browser console for GTM events
4. **Deploy to Production** - Monitor GTM dashboard for data
5. **Configure GTM Tags** - Set up Google Analytics 4, Facebook Pixel, etc.

## ✅ **Performance Guarantee:**

- ✅ **Zero Performance Impact** - GTM loads after page becomes interactive
- ✅ **Core Web Vitals Protected** - No impact on LCP, FID, CLS
- ✅ **Non-blocking Loading** - Uses Next.js Script component with `afterInteractive`
- ✅ **Resource Optimized** - DNS prefetch and preconnect hints
- ✅ **Error Resilient** - Graceful fallbacks prevent page breaks

---

**🎉 Your DreamToApp is now ready for advanced analytics with GTM!**

