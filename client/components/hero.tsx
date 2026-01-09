"use client"

/**
 * Hero Component
 * 
 * Main landing section with animated content and demo preview.
 * Follows SOLID principles:
 * - SRP: Focused on hero section display
 * - DIP: Uses centralized messages
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { BRAND, HERO } from "@/lib/messages"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)]">
      {/* Elegant Background with Image */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg-gym.png"
            alt="Gym Background"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Dark tint overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/20 sm:from-background/90 sm:via-background/70 sm:to-transparent" />

        {/* Subtle warm accent - top right */}
        <div
          className="absolute -top-10 -right-10 w-[300px] h-[300px] sm:-top-20 sm:-right-20 sm:w-[600px] sm:h-[600px] opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(137, 52, 42, 0.15) 0%, transparent 70%)`
          }}
        />

        {/* Subtle warm accent - bottom left */}
        <div
          className="absolute -bottom-16 -left-16 w-[250px] h-[250px] sm:-bottom-32 sm:-left-32 sm:w-[500px] sm:h-[500px] opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(137, 52, 42, 0.1) 0%, transparent 70%)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center w-full">

          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                <span className="block text-foreground/90">{HERO.heading.line1}</span>
                <span className="relative inline-block mt-1">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                    {HERO.heading.line2}
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-foreground/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {HERO.description}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-10 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                asChild
              >
                <Link href="/register">
                  {HERO.cta.primary}
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Content - App Preview */}
          <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

            {/* Main Card Container */}
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">

              {/* Main Calendar Card */}
              <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl border border-border/60 shadow-xl p-4 xl:p-5">
                <div className="space-y-3">
                  {/* Top bar */}
                  <div className="flex items-center pb-3 border-b border-border/50">
                    <div className="flex items-center gap-1">
                      <Logo className="h-5 w-5 xl:h-6 xl:w-6" />
                      <div className="flex items-center">
                        <span className="text-[12px] xl:text-[13px] font-bold tracking-tight text-foreground">
                          {BRAND.nameParts.prefix}
                        </span>
                        <span className="text-[12px] xl:text-[13px] font-black tracking-tight text-primary">
                          {BRAND.nameParts.suffix}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 xl:gap-1.5">
                    {HERO.demoCard.weekdays.map((day) => (
                      <div key={day} className="text-center text-[9px] xl:text-[10px] text-muted-foreground font-medium py-1">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-md flex items-center justify-center text-[10px] xl:text-xs ${i % 7 === 0 || i % 7 === 6
                          ? "bg-secondary/30 text-muted-foreground"
                          : i % 3 === 0
                            ? "bg-gradient-to-br from-primary/40 to-accent/40 text-primary font-bold shadow-sm"
                            : i % 4 === 0
                              ? "bg-primary/15 text-foreground"
                              : "bg-secondary/20 text-foreground"
                          }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Appointment cards */}
                  <div className="space-y-2 pt-1">
                    {HERO.demoCard.appointments.map((appointment, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-lg ${index === 0
                          ? "bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/20"
                          : "bg-secondary/30 border border-border/30"
                          }`}
                      >
                        <div className={`h-7 w-7 xl:h-8 xl:w-8 rounded-full flex items-center justify-center ${index === 0
                          ? "bg-gradient-to-br from-primary/30 to-accent/30"
                          : "bg-accent/20"
                          }`}>
                          <span className={`text-[10px] xl:text-xs font-bold ${index === 0 ? "text-primary" : "text-accent"}`}>
                            {appointment.initials}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] xl:text-xs font-semibold truncate">{appointment.name}</p>
                          <p className="text-[9px] xl:text-[10px] text-muted-foreground">
                            {appointment.time} • {appointment.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -right-4 w-40 xl:w-44 bg-card/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl p-2.5 xl:p-3 transform rotate-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <div className="h-6 w-6 xl:h-7 xl:w-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <span className="text-[9px] xl:text-[10px] font-bold text-primary">
                        {HERO.demoCard.appointments[0].initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] xl:text-[10px] font-bold text-foreground">
                        {HERO.demoCard.appointments[0].name}
                      </p>
                      <p className="text-[7px] xl:text-[8px] text-muted-foreground">
                        {HERO.demoCard.athleteNotes.title}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-[8px] xl:text-[9px]">
                    <div className="p-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded">
                      <p className="font-semibold text-foreground">{HERO.demoCard.athleteNotes.goal}</p>
                    </div>
                    <div className="p-1.5 bg-secondary/30 rounded">
                      <p className="text-muted-foreground">{HERO.demoCard.athleteNotes.schedule}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
