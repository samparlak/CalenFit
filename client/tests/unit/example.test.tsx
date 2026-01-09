import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero'
import { HERO } from '@/lib/messages'

// Mock next/image since it's not supported in jsdom environment natively
import Image from 'next/image'

// Basit bir Unit Test örneği
describe('Hero Component', () => {
    it('renders the main heading correctly', () => {
        render(<Hero />)

        // Başlıkların ekranda göründüğünü doğrula
        // "Fitness Koçluğu İşinizi"
        expect(screen.getByText(HERO.heading.line1)).toBeInTheDocument()

        // "Otomatik Pilota Alın"
        expect(screen.getByText(HERO.heading.line2)).toBeInTheDocument()
    })

    it('renders the CTA button', () => {
        render(<Hero />)

        // "Ücretsiz Başlayın" butonu var mı?
        expect(screen.getByRole('link', { name: HERO.cta.primary })).toBeInTheDocument()
    })
})
