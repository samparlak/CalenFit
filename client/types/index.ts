/**
 * CalenFit Application Type Definitions
 * 
 * Centralized type system for improved:
 * - Type safety across the application
 * - IntelliSense support
 * - Compile-time error detection
 * - Code documentation
 * 
 * Organization:
 * 1. Enums - For fixed sets of values
 * 2. Interfaces - For object structures
 * 3. Types - For unions and utility types
 */

// ============================================================================
// ENUMS - Fixed Value Sets
// ============================================================================

/**
 * Section identifiers for navigation
 * Ensures type-safe section references across the app
 */
export enum SectionId {
    FEATURES = 'ozellikler',
    PRICING = 'fiyatlandirma',
    CONTACT = 'iletisim',
}

/**
 * Pricing plan tiers
 * Used for plan identification and conditional rendering
 */
export enum PlanTier {
    FREE = 'free',
    PRO = 'pro',
    ELITE = 'elite',
}

/**
 * Benefit/Feature categories
 * Maps to icon components and styling
 */
export enum BenefitType {
    TIME_SAVING = 'timeSaving',
    PERFORMANCE = 'performance',
    PROFESSIONAL = 'professional',
    PAYMENT = 'payment',
}

/**
 * Form input types
 * Restricts input type prop to valid HTML input types
 */
export enum FormInputType {
    TEXT = 'text',
    EMAIL = 'email',
    TEL = 'tel',
    PASSWORD = 'password',
}

/**
 * Social media platforms
 * Used for social link rendering and tracking
 */
export enum SocialPlatform {
    FACEBOOK = 'facebook',
    TWITTER = 'twitter',
    INSTAGRAM = 'instagram',
    LINKEDIN = 'linkedin',
    YOUTUBE = 'youtube',
}

/**
 * App store types
 * Used for download button rendering
 */
export enum AppStore {
    APP_STORE = 'appStore',
    GOOGLE_PLAY = 'googlePlay',
}

/**
 * Animation states
 * Used for controlling animation flow
 */
export enum AnimationState {
    IDLE = 'idle',
    RUNNING = 'running',
    FINISHED = 'finished',
    PAUSED = 'paused',
}

/**
 * Button visual variants
 * Matches shadcn/ui button component variants
 */
export enum ButtonVariant {
    DEFAULT = 'default',
    GHOST = 'ghost',
    OUTLINE = 'outline',
    SECONDARY = 'secondary',
    DESTRUCTIVE = 'destructive',
    LINK = 'link',
}

/**
 * Button size options
 * Matches shadcn/ui button component sizes
 */
export enum ButtonSize {
    DEFAULT = 'default',
    SM = 'sm',
    LG = 'lg',
    ICON = 'icon',
}

/**
 * Form submission status
 * Used for form state management
 */
export enum FormStatus {
    IDLE = 'idle',
    SUBMITTING = 'submitting',
    SUCCESS = 'success',
    ERROR = 'error',
}

/**
 * Scroll direction
 * Used for scroll-based UI changes
 */
export enum ScrollDirection {
    UP = 'up',
    DOWN = 'down',
    NONE = 'none',
}

// ============================================================================
// INTERFACES - Object Structures
// ============================================================================

/**
 * Navigation item structure
 */
export interface INavItem {
    /** Display label for the nav item */
    label: string
    /** Target href (anchor or route) */
    href: string
    /** Optional section ID for scroll navigation */
    sectionId?: SectionId
}

/**
 * Benefit/Feature card data
 */
export interface IBenefit {
    /** Unique identifier */
    id: string
    /** Benefit type for icon mapping */
    type: BenefitType
    /** Display title */
    title: string
    /** Descriptive text */
    description: string
}

/**
 * Pricing feature item
 */
export interface IPricingFeature {
    /** Feature description text */
    text: string
    /** Whether this feature is included in the plan */
    included: boolean
}

/**
 * Pricing plan structure
 */
export interface IPricingPlan {
    /** Unique identifier */
    id: string
    /** Plan tier enum value */
    tier: PlanTier
    /** Display name */
    name: string
    /** Price value (string for formatting flexibility) */
    price: string
    /** Short description */
    description: string
    /** Capacity limit text */
    capacity: string
    /** List of features */
    features: IPricingFeature[]
    /** Call-to-action button text */
    cta: string
    /** Whether this is the featured/popular plan */
    isPopular: boolean
}

/**
 * Contact form data structure
 */
export interface IContactFormData {
    /** User's full name */
    name: string
    /** User's email address */
    email: string
    /** Optional phone number */
    phone: string
    /** Message content */
    message: string
}

/**
 * Social link configuration
 */
export interface ISocialLink {
    /** Social platform identifier */
    platform: SocialPlatform
    /** Link URL */
    href: string
    /** Accessibility label */
    ariaLabel: string
}

/**
 * App store button configuration
 */
export interface IAppStoreButton {
    /** Store identifier */
    store: AppStore
    /** Button text */
    label: string
    /** Link URL */
    href: string
}

/**
 * Typewriter hook options
 */
export interface ITypewriterOptions {
    /** Delay before starting animation (ms) */
    delay?: number
    /** Delay between each character (ms) */
    charDelay?: number
    /** Whether the animation should start */
    enabled?: boolean
}

/**
 * Typewriter hook return value
 */
export interface ITypewriterResult {
    /** Current displayed text */
    displayText: string
    /** Whether animation is complete */
    isFinished: boolean
    /** Whether cursor should be visible */
    showCursor: boolean
    /** Reset the animation */
    reset: () => void
}

/**
 * Intersection observer hook options
 */
export interface IIntersectionObserverOptions {
    /** Threshold for intersection (0-1) */
    threshold?: number
    /** Root margin for earlier/later triggering */
    rootMargin?: string
    /** Whether to trigger only once */
    triggerOnce?: boolean
}

/**
 * Scroll position hook options
 */
export interface IScrollPositionOptions {
    /** Threshold in pixels to consider as "scrolled" */
    threshold?: number
}

/**
 * Scroll position hook return value
 */
export interface IScrollPositionResult {
    /** Current scroll Y position */
    scrollY: number
    /** Whether page is scrolled past threshold */
    isScrolled: boolean
    /** Scroll direction */
    scrollDirection: ScrollDirection
}

/**
 * Hero demo card appointment
 */
export interface IDemoAppointment {
    /** Client initials */
    initials: string
    /** Client name */
    name: string
    /** Appointment time range */
    time: string
    /** Appointment type/category */
    type: string
}

/**
 * Form field configuration (for dynamic form building)
 */
export interface IFormField {
    /** Field name (matches form data key) */
    name: keyof IContactFormData
    /** Input type */
    type: FormInputType
    /** Placeholder text */
    placeholder: string
    /** Whether field is required */
    required: boolean
    /** Validation pattern (regex string) */
    pattern?: string
    /** Validation error message */
    errorMessage?: string
}

// ============================================================================
// COMPONENT PROP INTERFACES
// ============================================================================

/**
 * Logo component props
 */
export interface ILogoProps {
    /** Additional CSS classes */
    className?: string
    /** Logo size variant */
    size?: 'sm' | 'md' | 'lg'
}

/**
 * Button component extended props
 */
export interface IButtonProps {
    /** Button variant */
    variant?: ButtonVariant
    /** Button size */
    size?: ButtonSize
    /** Loading state */
    isLoading?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Full width */
    fullWidth?: boolean
}

/**
 * Form input component props
 */
export interface IFormInputProps {
    /** Input type */
    type: FormInputType
    /** Field name */
    name: keyof IContactFormData
    /** Placeholder text */
    placeholder: string
    /** Current value */
    value: string
    /** Change handler */
    onChange: (name: keyof IContactFormData, value: string) => void
    /** Required field */
    required?: boolean
    /** Error state */
    error?: string
    /** Disabled state */
    disabled?: boolean
}

/**
 * Pricing card component props
 */
export interface IPricingCardProps {
    /** Plan data */
    plan: IPricingPlan
    /** Typewriter text (animated description) */
    typewriterText: string
    /** Whether typewriter animation is finished */
    isTypewriterFinished: boolean
    /** Whether to show cursor */
    showCursor: boolean
}

/**
 * Benefit card component props
 */
export interface IBenefitCardProps {
    /** Benefit type for icon mapping */
    type: BenefitType
    /** Card title */
    title: string
    /** Card description */
    description: string
}

// ============================================================================
// TYPE ALIASES & UTILITY TYPES
// ============================================================================

/**
 * Contact form field names
 */
export type ContactFormField = keyof IContactFormData

/**
 * Nav item href (with type-safe anchor support)
 */
export type NavHref = `#${SectionId}` | string

/**
 * Price display format
 */
export type PriceDisplay = {
    amount: string
    currency: string
    period: string
}

/**
 * Form validation result
 */
export type ValidationResult = {
    isValid: boolean
    errors: Partial<Record<ContactFormField, string>>
}

/**
 * Async operation result
 */
export type AsyncResult<T> = {
    data: T | null
    error: string | null
    isLoading: boolean
}

// ============================================================================
// LEGACY TYPE ALIASES (For backward compatibility)
// ============================================================================

/** @deprecated Use INavItem instead */
export type NavItem = INavItem

/** @deprecated Use IBenefit instead */
export type Benefit = IBenefit

/** @deprecated Use IPricingFeature instead */
export type PricingFeature = IPricingFeature

/** @deprecated Use IPricingPlan instead */
export type PricingPlan = IPricingPlan

/** @deprecated Use IContactFormData instead */
export type ContactFormData = IContactFormData

/** @deprecated Use ILogoProps instead */
export type LogoProps = ILogoProps
