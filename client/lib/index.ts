/**
 * Lib Module Barrel Export
 * 
 * Provides clean import paths for library utilities:
 * import { cn, SECTION_IDS, HERO } from '@/lib'
 * 
 * Alternatively, use specific imports:
 * import { cn } from '@/utils'
 * import { SECTION_IDS } from '@/constants'
 * import { HERO } from '@/messages'
 */

// Utilities
export { cn } from './utils'

// Constants
export {
    ANIMATION,
    LAYOUT,
    NAV_ITEMS,
    SECTION_IDS,
    COLORS,
    VALIDATION_PATTERNS,
    API_ENDPOINTS,
    EXTERNAL_LINKS,
} from './constants'

// Messages (i18n-ready content)
export {
    BRAND,
    NAVIGATION,
    HERO,
    WHY_CALENFIT,
    PRICING,
    CONTACT,
    FOOTER,
    ARIA,
    VALIDATION,
    FEEDBACK,
    AUTH,
} from './messages'

// Hooks
export {
    useTypewriter,
    useIntersectionObserver,
    useScrollPosition,
} from './hooks'
