"use client"

/**
 * Pricing Component
 * 
 * Displays pricing plans with animated descriptions.
 * Follows SOLID principles:
 * - SRP: PricingCard extracted as sub-component
 * - OCP: Extensible via constants
 * - DIP: Depends on abstractions (constants, hooks, messages, types)
 */

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SECTION_IDS } from "@/lib/constants"
import { PRICING } from "@/lib/messages"
import { useIntersectionObserver, useTypewriter } from "@/lib/hooks"
import { PlanTier, type IPricingCardProps, type IPricingPlan } from "@/types"

// Construct plans data with PlanTier enum
const PLANS_DATA: IPricingPlan[] = [
  {
    id: 'free',
    tier: PlanTier.FREE,
    ...PRICING.plans.free,
    features: [
      { text: PRICING.features.calendar, included: true },
      { text: PRICING.features.portfolio, included: true },
      { text: PRICING.features.programs, included: true },
    ],
    isPopular: false,
  },
  {
    id: 'pro',
    tier: PlanTier.PRO,
    ...PRICING.plans.pro,
    features: [
      { text: PRICING.features.calendar, included: true },
      { text: PRICING.features.portfolio, included: true },
      { text: PRICING.features.programs, included: true },
      { text: PRICING.features.payment, included: true },
      { text: PRICING.features.invoicing, included: true },
    ],
    isPopular: true,
  },
  {
    id: 'elite',
    tier: PlanTier.ELITE,
    ...PRICING.plans.elite,
    features: [
      { text: PRICING.features.calendar, included: true },
      { text: PRICING.features.portfolio, included: true },
      { text: PRICING.features.programs, included: true },
      { text: PRICING.features.payment, included: true },
      { text: PRICING.features.invoicing, included: true },
    ],
    isPopular: false,
  },
]

/**
 * Feature List Item Component
 */
interface FeatureItemProps {
  text: string
}

function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-2 sm:gap-3 text-[#1a1a1a]">
      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#89342A]/10 flex items-center justify-center">
        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#89342A]" strokeWidth={3} />
      </div>
      <span className="text-xs sm:text-sm font-medium text-[#1a1a1a]/80">{text}</span>
    </li>
  )
}

/**
 * Pricing Card Component
 * Uses IPricingCardProps interface for type safety
 */
function PricingCard({ plan, typewriterText, isTypewriterFinished, showCursor }: IPricingCardProps) {
  const cardClasses = cn(
    "relative rounded-xl sm:rounded-2xl border p-5 sm:p-6 lg:p-8 flex flex-col h-full transition-all duration-300",
    "hover:shadow-[0_25px_60px_-15px_rgba(137,52,42,0.25)] hover:border-[#89342A]/60 hover:-translate-y-1",
    plan.isPopular
      ? "bg-gradient-to-b from-[#FAFCFF] to-[#E8F0FE] border-[#89342A]/40 shadow-2xl ring-1 ring-[#89342A]/10"
      : "bg-white border-[#e5e7eb] shadow-lg"
  )

  return (
    <div className="relative group flex flex-col h-full">
      <div className={cardClasses}>
        {/* Popular Badge */}
        {plan.isPopular && (
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#89342A] to-[#a84535] rounded-full text-[10px] sm:text-xs font-bold text-white shadow-md uppercase tracking-wide">
            {PRICING.badges.popular}
          </span>
        )}

        {/* Header */}
        <div className="mb-4 sm:mb-6 min-h-[50px] sm:min-h-[60px]">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1a1a] mb-1 tracking-tight">
            {plan.name}
          </h3>
          {/* Animated Description */}
          <div className="relative h-5">
            <p className="text-xs sm:text-sm text-[#1a1a1a]/60 font-medium invisible" aria-hidden="true">
              {plan.description}
            </p>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/60 font-medium absolute inset-0 top-0">
              {typewriterText}
              {!isTypewriterFinished && (
                <span className={cn(
                  "transition-opacity duration-100 text-[#89342A]",
                  showCursor ? "opacity-100" : "opacity-0"
                )}>
                  |
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#89342A]/20 to-transparent mb-4 sm:mb-6" />

        {/* Pricing */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-end gap-1">
            <span className="text-4xl sm:text-5xl font-black text-[#89342A] leading-none tracking-tight">
              {PRICING.currency.symbol}{plan.price}
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]/40 pb-1">
              {PRICING.currency.period}
            </span>
          </div>
          {/* Capacity Badge */}
          <div className="mt-2 sm:mt-3">
            <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#89342A]/10 text-[#89342A] border border-[#89342A]/20">
              {plan.capacity}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          {plan.features
            .filter(f => f.included)
            .map((feature, index) => (
              <FeatureItem key={index} text={feature.text} />
            ))}
        </ul>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="w-full rounded-full font-bold text-sm sm:text-base h-11 sm:h-12 transition-all duration-300 shadow-lg bg-[#89342A] text-white hover:bg-[#702a22] hover:scale-[1.02] active:scale-95"
        >
          <Link href="/register">
            {plan.cta}
          </Link>
        </Button>
      </div>
    </div>
  )
}

/**
 * Main Pricing Component
 */
export function Pricing() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })

  // Typewriter animations with staggered delays
  const typewriter1 = useTypewriter(PLANS_DATA[0].description, { enabled: isVisible, delay: 200 })
  const typewriter2 = useTypewriter(PLANS_DATA[1].description, { enabled: isVisible, delay: 400 })
  const typewriter3 = useTypewriter(PLANS_DATA[2].description, { enabled: isVisible, delay: 600 })

  const typewriters = [typewriter1, typewriter2, typewriter3]

  return (
    <section
      id={SECTION_IDS.pricing}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden bg-[#EAE0D5]"
    >
      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <header className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 sm:mb-4">
            {PRICING.header.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#1a1a1a]/70">
            {PRICING.header.subtitle}
          </p>
        </header>

        {/* Pricing Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          ref={ref}
        >
          {PLANS_DATA.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              typewriterText={typewriters[index].displayText}
              isTypewriterFinished={typewriters[index].isFinished}
              showCursor={typewriters[index].showCursor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
