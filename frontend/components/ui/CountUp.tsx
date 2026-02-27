'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface CountUpProps {
    to: number
    duration?: number
    prefix?: string
    suffix?: string
    className?: string
    triggerOnMount?: boolean
}

export function CountUp({
    to,
    duration = 1800,
    prefix = '',
    suffix = '',
    className,
    triggerOnMount = true,
}: CountUpProps) {
    const spanRef = useRef<HTMLSpanElement>(null)
    const frameRef = useRef<number>(0)

    useEffect(() => {
        if (!triggerOnMount) return
        const startMs = performance.now()
        const update = (now: number) => {
            const elapsed = now - startMs
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * to)
            if (spanRef.current) {
                spanRef.current.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`
            }
            if (progress < 1) frameRef.current = requestAnimationFrame(update)
        }
        frameRef.current = requestAnimationFrame(update)
        return () => cancelAnimationFrame(frameRef.current)
    }, [to, duration, prefix, suffix, triggerOnMount])

    return (
        <span
            ref={spanRef}
            className={cn('tabular-nums', className)}
        >
            {prefix}0{suffix}
        </span>
    )
}
