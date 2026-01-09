/**
 * Custom hook for scroll position tracking
 * Follows Single Responsibility Principle - handles only scroll position logic
 */

import { useState, useEffect } from 'react'
import { ScrollDirection, type IScrollPositionOptions, type IScrollPositionResult } from '@/types'

export function useScrollPosition(
    options: IScrollPositionOptions = {}
): IScrollPositionResult {
    const { threshold = 10 } = options

    const [scrollY, setScrollY] = useState(0)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(ScrollDirection.NONE)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY) {
                setScrollDirection(ScrollDirection.DOWN)
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection(ScrollDirection.UP)
            }

            setLastScrollY(currentScrollY)
            setScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return {
        scrollY,
        isScrolled: scrollY > threshold,
        scrollDirection,
    }
}
