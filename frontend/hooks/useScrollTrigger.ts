'use client'
import { useEffect, useLayoutEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export function useScrollTrigger(
    callback: (container: Element) => void,
    containerRef: RefObject<HTMLElement | null>,
    deps: unknown[] = []
) {
    useLayoutEffect(() => {
        const el = containerRef.current
        if (!el) return

        const ctx = gsap.context(() => {
            callback(el)
        }, el)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, ...deps])
}

export function useGSAPEntry(
    animationFn: (tl: gsap.core.Timeline) => void,
    containerRef: RefObject<HTMLElement | null>,
    delay = 0
) {
    useLayoutEffect(() => {
        const el = containerRef.current
        if (!el) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay })
            animationFn(tl)
        }, el)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef])
}
