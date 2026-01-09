/**
 * CalenFit Application Configuration
 * 
 * Central configuration file for environment-specific settings.
 * This file serves as the single source of truth for app configuration.
 * 
 * @module config/app
 */

// ============================================================================
// ENVIRONMENT DETECTION
// ============================================================================

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

// ============================================================================
// APP METADATA
// ============================================================================

export const APP_CONFIG = {
    /** Application name */
    name: 'CalenFit',

    /** Application version */
    version: '1.0.0',

    /** Application description */
    description: 'Fitness koçları için tasarlanmış randevu ve müşteri yönetim platformu',

    /** Default locale */
    locale: 'tr-TR',

    /** Default timezone */
    timezone: 'Europe/Istanbul',

    /** Environment flags */
    env: {
        isDevelopment,
        isProduction,
        isTest,
    },
} as const

// ============================================================================
// SEO CONFIGURATION
// ============================================================================

export const SEO_CONFIG = {
    /** Default page title */
    defaultTitle: 'CalenFit - Fitness Koçluğu İşinizi Otomatik Pilota Alın',

    /** Title template for pages */
    titleTemplate: '%s | CalenFit',

    /** Default meta description */
    defaultDescription: 'Koçluk işinizi yönetmenin en kolay yolu. Müşterilerinizi, randevularınızı ve antrenman programlarınızı tek yerden yönetin.',

    /** Open Graph defaults */
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        siteName: 'CalenFit',
    },

    /** Twitter card defaults */
    twitter: {
        cardType: 'summary_large_image',
        handle: '@calenfit',
    },
} as const

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

export const THEME_CONFIG = {
    /** Primary brand color (Burgundy) */
    primaryColor: '#89342A',

    /** Color palette */
    colors: {
        primary: {
            main: '#89342A',
            dark: '#702a22',
            light: '#a84535',
        },
        background: {
            default: '#F9F4F0',
            paper: '#FAF5F0',
            accent: '#EAE0D5',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#5E231C',
            muted: '#8C827D',
        },
    },

    /** Border radius scale */
    borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
    },

    /** Font families */
    fonts: {
        heading: 'Playfair Display, Georgia, serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'JetBrains Mono, monospace',
    },
} as const

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
    /** Enable dark mode toggle */
    enableDarkMode: false,

    /** Enable analytics tracking */
    enableAnalytics: isProduction,

    /** Enable contact form submission */
    enableContactForm: true,

    /** Enable app store links */
    enableAppStoreLinks: true,

    /** Enable social media links */
    enableSocialLinks: true,

    /** Show pricing section */
    showPricing: true,

    /** Enable scroll animations */
    enableScrollAnimations: true,
} as const

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
    /** Base URL for API requests */
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.calenfit.com',

    /** API version */
    version: 'v1',

    /** Request timeout (ms) */
    timeout: 30000,

    /** Retry configuration */
    retry: {
        maxRetries: 3,
        retryDelay: 1000,
    },

    /** Endpoints */
    endpoints: {
        contact: '/contact',
        subscribe: '/subscribe',
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
        },
    },
} as const

// ============================================================================
// EXTERNAL SERVICES
// ============================================================================

export const EXTERNAL_SERVICES = {
    /** App Store URL */
    appStore: 'https://apps.apple.com/app/calenfit',

    /** Google Play Store URL */
    googlePlay: 'https://play.google.com/store/apps/details?id=com.calenfit',

    /** Social media URLs */
    social: {
        facebook: 'https://facebook.com/calenfit',
        twitter: 'https://twitter.com/calenfit',
        instagram: 'https://instagram.com/calenfit',
        linkedin: 'https://linkedin.com/company/calenfit',
        youtube: 'https://youtube.com/@calenfit',
    },

    /** Support channels */
    support: {
        email: 'destek@calenfit.com',
        phone: '+90 850 123 4567',
    },
} as const

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_CONFIG = {
    /** Name field constraints */
    name: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/,
    },

    /** Email field constraints */
    email: {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },

    /** Phone field constraints */
    phone: {
        pattern: /^(\+90|0)?[0-9]{10}$/,
    },

    /** Message field constraints */
    message: {
        minLength: 10,
        maxLength: 1000,
    },
} as const

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export const ANIMATION_CONFIG = {
    /** Typewriter effect settings */
    typewriter: {
        charDelay: 30,
        cursorBlinkInterval: 500,
        initialDelay: 500,
    },

    /** Transition durations (ms) */
    transition: {
        fast: 150,
        normal: 300,
        slow: 500,
    },

    /** Intersection observer defaults */
    intersection: {
        threshold: 0.1,
        rootMargin: '0px',
    },
} as const

// ============================================================================
// LAYOUT CONFIGURATION
// ============================================================================

export const LAYOUT_CONFIG = {
    /** Header height (px) */
    headerHeight: 80,

    /** Footer height (px) */
    footerHeight: 200,

    /** Max content width */
    maxContentWidth: '1280px',

    /** Container padding */
    containerPadding: {
        mobile: '1rem',
        tablet: '1.5rem',
        desktop: '2rem',
    },

    /** Breakpoints */
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
} as const

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

const config = {
    app: APP_CONFIG,
    seo: SEO_CONFIG,
    theme: THEME_CONFIG,
    features: FEATURE_FLAGS,
    api: API_CONFIG,
    external: EXTERNAL_SERVICES,
    validation: VALIDATION_CONFIG,
    animation: ANIMATION_CONFIG,
    layout: LAYOUT_CONFIG,
} as const

export default config
