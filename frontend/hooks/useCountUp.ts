'use client'
import { useEffect, useRef } from 'react'

export function useCountUp(
    targetValue: number,
    duration: number = 1800,
    startOnMount: boolean = true,
    prefix: string = '',
    suffix: string = ''
) {
    const elementRef = useRef<HTMLSpanElement>(null)
    const frameRef = useRef<number>(0)

    const startAnimation = () => {
        const start = performance.now()
        const update = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * targetValue)
            if (elementRef.current) {
                elementRef.current.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`
            }
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(update)
            }
        }
        frameRef.current = requestAnimationFrame(update)
    }

    useEffect(() => {
        if (startOnMount) {
            startAnimation()
        }
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetValue, startOnMount])

    return { elementRef, startAnimation }
}
