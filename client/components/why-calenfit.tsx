"use client"

/**
 * WhyCalenFit Component
 * 
 * Displays the benefits/features section with animated typewriter text.
 * Follows SOLID principles:
 * - SRP: Uses custom hooks for intersection and typewriter logic
 * - OCP: Extensible via constants
 * - DIP: Depends on abstractions (constants, hooks, messages, types)
 */

import { TrendingUp, Clock, Sparkles, CreditCard, LucideIcon } from "lucide-react"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { SECTION_IDS } from "@/lib/constants"
import { WHY_CALENFIT } from "@/lib/messages"
import { useIntersectionObserver, useTypewriter } from "@/lib/hooks"
import { BenefitType, type IBenefitCardProps } from "@/types"

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
})

// Icon mapping using BenefitType enum for type safety
const ICON_MAP: Record<BenefitType, LucideIcon> = {
  [BenefitType.TIME_SAVING]: Clock,
  [BenefitType.PERFORMANCE]: TrendingUp,
  [BenefitType.PROFESSIONAL]: Sparkles,
  [BenefitType.PAYMENT]: CreditCard,
}

// Benefits data with enum-based types
const BENEFITS_DATA: Array<{ type: BenefitType; title: string; description: string }> = [
  { type: BenefitType.TIME_SAVING, ...WHY_CALENFIT.benefits.timeSaving },
  { type: BenefitType.PERFORMANCE, ...WHY_CALENFIT.benefits.performance },
  { type: BenefitType.PROFESSIONAL, ...WHY_CALENFIT.benefits.professional },
  { type: BenefitType.PAYMENT, ...WHY_CALENFIT.benefits.payment },
]

/**
 * Typing Cursor Component
 */
interface TypingCursorProps {
  show: boolean
  visible: boolean
}

function TypingCursor({ show, visible }: TypingCursorProps) {
  if (!show) return null
  return (
    <span
      className={cn(
        "transition-opacity duration-100 text-[#89342A]",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      |
    </span>
  )
}

/**
 * Benefit Card Component
 * Uses IBenefitCardProps interface for type safety
 */
function BenefitCard({ type, title, description }: IBenefitCardProps) {
  const Icon = ICON_MAP[type]

  if (!Icon) return null

  return (
    <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-transparent hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center aspect-square justify-center">
      {/* Icon Circle */}
      <div className="mb-5 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#fcf5f1] flex items-center justify-center border border-[#efece9]">
          <Icon className="h-8 w-8 text-[#89342A]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#1a1a1a]/70 leading-relaxed max-w-[240px]">
        {description}
      </p>
    </div>
  )
}

/**
 * Main WhyCalenFit Component
 */
export function WhyCalenFit() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  // Typewriter animations for each line
  const line1 = useTypewriter(WHY_CALENFIT.typewriterLines[0], { enabled: isVisible, delay: 500 })
  const line2 = useTypewriter(WHY_CALENFIT.typewriterLines[1], {
    enabled: line1.isFinished,
    delay: 0
  })
  const line3 = useTypewriter(WHY_CALENFIT.typewriterLines[2], {
    enabled: line2.isFinished,
    delay: 0
  })

  const allFinished = line3.isFinished

  return (
    <section
      id={SECTION_IDS.features}
      className={cn("relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#F9F4F0]", inter.className)}
    >
      <div className="absolute inset-0" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Typewriter Text Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20" ref={ref}>
          <div className="relative text-base sm:text-lg md:text-xl font-semibold text-[#1a1a1a] leading-relaxed min-h-[90px]">
            {/* Invisible spacer for layout stability */}
            <p className="invisible" aria-hidden="true">
              {WHY_CALENFIT.typewriterLines[0]} <br className="hidden md:block" />
              {WHY_CALENFIT.typewriterLines[1]} <br className="hidden md:block" />
              {WHY_CALENFIT.typewriterLines[2]}
            </p>

            {/* Animated Visible Text */}
            <p className="absolute inset-0 top-0 left-0 right-0">
              {line1.displayText}
              <TypingCursor show={!line1.isFinished} visible={line1.showCursor} />
              <br className="hidden md:block" />

              {line2.displayText}
              <TypingCursor show={line1.isFinished && !line2.isFinished} visible={line2.showCursor} />
              <br className="hidden md:block" />

              {line3.displayText}
              <TypingCursor show={line2.isFinished && !allFinished} visible={line3.showCursor} />
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {BENEFITS_DATA.map((benefit) => (
            <BenefitCard
              key={benefit.type}
              type={benefit.type}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
