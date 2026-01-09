/**
 * Custom hook for typewriter text animation effect
 * Follows Single Responsibility Principle - handles only typewriter logic
 */

import { useState, useEffect, useCallback } from 'react'
import { ANIMATION } from '@/lib/constants'
import type { ITypewriterOptions, ITypewriterResult } from '@/types'

export function useTypewriter(
    text: string,
    options: ITypewriterOptions = {}
): ITypewriterResult {
    const {
        delay = 0,
        charDelay = ANIMATION.typewriter.charDelay,
        enabled = true,
    } = options

    const [displayText, setDisplayText] = useState('')
    const [isFinished, setIsFinished] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    const reset = useCallback(() => {
        setDisplayText('')
        setIsFinished(false)
        setShowCursor(true)
    }, [])

    useEffect(() => {
        if (!enabled) return

        let currentIndex = 0
        let timeout: NodeJS.Timeout
        let cursorInterval: NodeJS.Timeout

        // Cursor blink effect
        cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, ANIMATION.typewriter.cursorBlinkInterval)

        const typeNextChar = () => {
            if (currentIndex < text.length) {
                setDisplayText(text.slice(0, currentIndex + 1))
                currentIndex++
                timeout = setTimeout(typeNextChar, charDelay)
            } else {
                setIsFinished(true)
                clearInterval(cursorInterval)
            }
        }

        // Start typing after initial delay
        const delayTimeout = setTimeout(typeNextChar, delay)

        return () => {
            clearTimeout(delayTimeout)
            clearTimeout(timeout)
            clearInterval(cursorInterval)
        }
    }, [enabled, text, delay, charDelay])

    return { displayText, isFinished, showCursor, reset }
}
