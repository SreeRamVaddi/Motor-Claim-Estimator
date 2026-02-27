import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initLenis() {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
    })

    // Connect Lenis to GSAP ticker
    gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    return lenis
}
