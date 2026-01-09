"use client"

/**
 * Header Component
 * 
 * Responsive navigation header with smooth scroll functionality.
 * Follows SOLID principles:
 * - SRP: Navigation logic separated, uses custom hooks
 * - OCP: Extensible via constants
 * - DIP: Depends on abstractions (constants, hooks, messages)
 */

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, LAYOUT } from "@/lib/constants"
import { BRAND, NAVIGATION } from "@/lib/messages"
import { useScrollPosition } from "@/lib/hooks"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isScrolled } = useScrollPosition({ threshold: 10 })
  const pathname = usePathname()
  const router = useRouter()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])

  const scrollToSection = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const targetId = href.replace("#", "")

    // If not on home page, navigate to home page with hash
    if (pathname !== "/") {
      closeMenu()
      router.push(`/${href}`)
      return
    }

    // Smooth scroll logic for home page
    const element = document.getElementById(targetId)

    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - LAYOUT.headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      closeMenu()
    }
  }, [pathname, router, closeMenu])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-[#F9F4F0] border-b border-[#89342A]/10 transition-all duration-300",
        isScrolled && "shadow-md border-[#89342A]/15"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo Section - Left Wing */}
          <div className="flex-shrink-0 w-[140px] xl:w-[160px]">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative p-1 transition-transform duration-300 group-hover:scale-105">
                <Logo className="h-9 w-9 text-[#89342A]" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold tracking-tight text-[#1a1a1a] group-hover:text-[#89342A] transition-colors duration-300">
                  {BRAND.nameParts.prefix}
                </span>
                <span className="text-2xl font-black tracking-tight text-[#89342A]">
                  {BRAND.nameParts.suffix}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation - Center Stage */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="relative px-2 py-1 text-[15px] font-medium tracking-wide text-[#5E231C]/90 hover:text-[#89342A] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#89342A] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA - Right Wing */}
          <div className="hidden lg:flex items-center justify-end w-[140px] xl:w-[160px]">
            <Button
              variant="ghost"
              className="text-[#5E231C] font-semibold hover:text-[#89342A] hover:bg-[#89342A]/5 transition-colors text-base px-6 h-11 rounded-full"
              asChild
            >
              <Link href="/login">
                {NAVIGATION.auth.login}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Visible only on small screens */}
          <button
            type="button"
            className="flex lg:hidden items-center justify-center w-11 h-11 text-[#89342A] hover:bg-[#89342A]/5 rounded-xl transition-all duration-300 active:scale-95 ml-auto"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? NAVIGATION.mobile.closeMenu : NAVIGATION.mobile.openMenu}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  "absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-out",
                  isMenuOpen ? "top-[11px] rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[11px] block w-6 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-out",
                  isMenuOpen ? "top-[11px] -rotate-45" : "top-[19px]"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 sm:top-20 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 z-40",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 sm:top-20 left-0 right-0 bg-[#FAF5F0] border-b border-[#89342A]/10 shadow-2xl lg:hidden transition-all duration-300 ease-out z-50 max-h-[calc(100vh-4rem)] overflow-y-auto",
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-4 sm:py-6 space-y-1">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "block px-4 py-4 rounded-xl text-base sm:text-lg font-medium text-[#5E231C] hover:text-[#89342A] hover:bg-[#89342A]/5 transition-all duration-300 active:scale-[0.98]",
                  "transform transition-all duration-300",
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                )}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms" }}
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.label}
              </a>
            ))}

            {/* CTA Section */}
            <div
              className={cn(
                "pt-4 mt-4 border-t border-[#89342A]/10 space-y-3 transform transition-all duration-300",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: isMenuOpen ? "150ms" : "0ms" }}
            >
              <Button
                className="w-full justify-center bg-[#89342A] hover:bg-[#722b22] text-[#FAF5F0] font-bold h-12 rounded-xl shadow-md text-base"
                onClick={closeMenu}
                asChild
              >
                <Link href="/login">
                  {NAVIGATION.auth.login}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
