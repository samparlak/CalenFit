/**
 * Custom hook for intersection observer functionality
 * Follows Single Responsibility Principle - handles only visibility detection
 */

import { useState, useEffect, useRef, RefObject } from 'react'
import type { IIntersectionObserverOptions } from '@/types'

interface UseIntersectionObserverReturn<T extends HTMLElement> {
    /** Ref to attach to the target element */
    ref: RefObject<T>
    /** Whether element is currently visible */
    isVisible: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
    options: IIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options

    const ref = useRef<T>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (triggerOnce) {
                        observer.unobserve(element)
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold, rootMargin, triggerOnce])

    return { ref, isVisible }
}
