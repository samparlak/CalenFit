/**
 * Application Technical Constants & Configuration
 * 
 * Contains only technical/structural constants.
 * UI text/content is managed in messages.ts for i18n support.
 * Uses enums from types/index.ts for type safety.
 */

import { SectionId } from '@/types'

// ============================================================================
// ANIMATION DURATIONS (in milliseconds)
// ============================================================================
export const ANIMATION = {
    typewriter: {
        charDelay: 30,
        cursorBlinkInterval: 500,
        initialDelay: 500,
    },
    transition: {
        fast: 300,
        normal: 500,
        slow: 700,
    },
} as const

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
export const LAYOUT = {
    headerHeight: 80, // pixels, used for scroll offset
    maxContentWidth: '7xl',
    containerPadding: {
        mobile: 4,
        desktop: 6,
    },
} as const

// ============================================================================
// NAVIGATION ITEMS (Using SectionId enum for type safety)
// ============================================================================
export const NAV_ITEMS = [
    { label: 'Özellikler', href: `#${SectionId.FEATURES}`, sectionId: SectionId.FEATURES },
    { label: 'Fiyatlandırma', href: `#${SectionId.PRICING}`, sectionId: SectionId.PRICING },
    { label: 'İletişim', href: `#${SectionId.CONTACT}`, sectionId: SectionId.CONTACT },
] as const

// ============================================================================
// SECTION IDS (Re-exported from enum for convenience)
// ============================================================================
export const SECTION_IDS = {
    features: SectionId.FEATURES,
    pricing: SectionId.PRICING,
    contact: SectionId.CONTACT,
} as const

// ============================================================================
// COLORS (Used for programmatic color access)
// ============================================================================
export const COLORS = {
    primary: '#89342A',
    primaryDark: '#702a22',
    primaryLight: '#a84535',
    background: {
        cream: '#F9F4F0',
        warmWhite: '#FAF5F0',
        pricing: '#EAE0D5',
        footer: '#EAE0D5',
    },
    text: {
        primary: '#1a1a1a',
        secondary: '#5E231C',
    },
} as const

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================
export const VALIDATION_PATTERNS = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    phone: /^(\+90|0)?[0-9]{10}$/,
    name: /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]{2,50}$/,
} as const

// ============================================================================
// API ENDPOINTS (For future use)
// ============================================================================
export const API_ENDPOINTS = {
    contact: '/api/contact',
    subscribe: '/api/subscribe',
} as const

// ============================================================================
// EXTERNAL LINKS
// ============================================================================
export const EXTERNAL_LINKS = {
    appStore: 'https://apps.apple.com/app/calenfit',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.calenfit',
    social: {
        facebook: 'https://facebook.com/calenfit',
        twitter: 'https://twitter.com/calenfit',
        instagram: 'https://instagram.com/calenfit',
    },
} as const
