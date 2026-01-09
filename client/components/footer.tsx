"use client"

/**
 * Footer Component
 * 
 * Site footer with branding, social links, and app store buttons.
 * Follows SOLID principles:
 * - SRP: Extracted sub-components for social links and store buttons
 * - DIP: Uses centralized messages and type-safe enums
 */

import { Facebook, Instagram, Twitter, LucideIcon } from "lucide-react"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { BRAND, FOOTER, ARIA } from "@/lib/messages"
import { SocialPlatform, AppStore, type ISocialLink, type IAppStoreButton } from "@/types"

/**
 * Social media configuration with type-safe enum
 */
const SOCIAL_LINKS: Array<ISocialLink & { Icon: LucideIcon }> = [
  {
    platform: SocialPlatform.FACEBOOK,
    href: EXTERNAL_LINKS.social.facebook,
    ariaLabel: FOOTER.social.facebook,
    Icon: Facebook
  },
  {
    platform: SocialPlatform.TWITTER,
    href: EXTERNAL_LINKS.social.twitter,
    ariaLabel: FOOTER.social.twitter,
    Icon: Twitter
  },
  {
    platform: SocialPlatform.INSTAGRAM,
    href: EXTERNAL_LINKS.social.instagram,
    ariaLabel: FOOTER.social.instagram,
    Icon: Instagram
  },
]

/**
 * Store button configuration with type-safe enum
 */
const STORE_BUTTONS: Array<IAppStoreButton & { icon: string; viewBox: string }> = [
  {
    store: AppStore.APP_STORE,
    label: FOOTER.appStores.appStore,
    href: EXTERNAL_LINKS.appStore,
    icon: "M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.9c14.2 40.2 40.8 77.1 77 77.1 30.7 0 42.5-20.8 79.7-20.8 37.3 0 50 20.8 81.6 20.8 32.8 0 57.5-35.1 71.7-66.2 12.8-27.9 18.2-56.9 18.9-58.4-41.9-16.7-68.5-47.3-68.6-88.8zM248 114.6c18-21.8 30.5-52.9 26.2-83.3-25.9 1.1-57.9 17.7-76.7 39.7-15.6 18.1-29.3 47.3-26 76.5 28.5 2 56.5-13.6 76.5-32.9z",
    viewBox: "0 0 384 512",
  },
  {
    store: AppStore.GOOGLE_PLAY,
    label: FOOTER.appStores.googlePlay,
    href: EXTERNAL_LINKS.googlePlay,
    icon: "M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L47 499z",
    viewBox: "0 0 512 512",
  },
]

/**
 * Legal links configuration
 */
const LEGAL_LINKS = [
  { key: 'terms' as const, href: '#', label: FOOTER.legal.links.terms },
  { key: 'privacy' as const, href: '#', label: FOOTER.legal.links.privacy },
] as const

/**
 * Social Link Component
 */
interface SocialLinkComponentProps {
  Icon: LucideIcon
  href: string
  ariaLabel: string
}

function SocialLinkComponent({ Icon, href, ariaLabel }: SocialLinkComponentProps) {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors p-1"
      aria-label={ARIA.buttons.socialLink(ariaLabel)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}

/**
 * Store Button Component
 */
interface StoreButtonComponentProps {
  label: string
  href: string
  icon: string
  viewBox: string
}

function StoreButtonComponent({ label, href, icon, viewBox }: StoreButtonComponentProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:bg-primary transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg shadow-foreground/10 group"
      aria-label={ARIA.buttons.downloadApp(label)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox={viewBox} fill="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
        <path d={icon} />
      </svg>
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </a>
  )
}

/**
 * Footer Link Component
 */
interface FooterLinkProps {
  href: string
  label: string
}

function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
    >
      {label}
    </a>
  )
}

/**
 * Main Footer Component
 */
export function Footer() {
  return (
    <footer className="bg-secondary py-10 border-t border-primary/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Brand & Socials Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="text-2xl font-black text-primary tracking-tight">
                {BRAND.name}
              </span>
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-6 bg-primary/20" aria-hidden="true" />

            {/* Social Links */}
            <nav className="flex gap-4" aria-label={ARIA.navigation.social}>
              {SOCIAL_LINKS.map((social) => (
                <SocialLinkComponent
                  key={social.platform}
                  Icon={social.Icon}
                  href={social.href}
                  ariaLabel={social.ariaLabel}
                />
              ))}
            </nav>
          </div>

          {/* Store Buttons */}
          <div className="flex gap-4">
            {STORE_BUTTONS.map((store) => (
              <StoreButtonComponent
                key={store.store}
                label={store.label}
                href={store.href}
                icon={store.icon}
                viewBox={store.viewBox}
              />
            ))}
          </div>

          {/* Bottom Links & Copyright */}
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-primary/10 w-full max-w-2xl">
            <nav className="flex gap-6 text-[11px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider" aria-label={ARIA.navigation.footer}>
              {LEGAL_LINKS.map((link) => (
                <FooterLink
                  key={link.key}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </nav>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground/80 font-medium">
              {FOOTER.legal.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
