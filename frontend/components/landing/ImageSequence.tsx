'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const CAPTIONS = [
    { at: 0.0, text: 'The moment it happened.' },
    { at: 0.4, text: 'Our AI sees 48 possible damage points.' },
    { at: 0.75, text: 'Every damaged part. Identified. Priced. Reported.' },
]

export function ImageSequence() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const captionRef = useRef<HTMLParagraphElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<SVGSVGElement>(null)

    useLayoutEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                pin: true,
                start: 'top top',
                end: '+=3000',
                scrub: 0.6,
                onUpdate(self) {
                    const p = self.progress

                    // Update caption
                    if (captionRef.current) {
                        let text = CAPTIONS[0].text
                        for (const c of CAPTIONS) {
                            if (p >= c.at) text = c.text
                        }
                        captionRef.current.textContent = text
                    }

                    // Update scan progress bar
                    if (progressRef.current) {
                        progressRef.current.style.width = `${p * 100}%`
                    }

                    // Animate bounding box overlays based on scroll
                    if (overlayRef.current) {
                        const boxes = overlayRef.current.querySelectorAll('[data-box]')
                        boxes.forEach((box, idx) => {
                            const threshold = 0.15 + idx * 0.18
                            const opacity = p >= threshold ? Math.min((p - threshold) / 0.1, 1) : 0
                                ; (box as SVGElement).style.opacity = String(opacity)
                        })
                    }
                },
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden"
            style={{ background: '#000' }}
        >
            {/* Background car damage visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-4xl mx-auto px-8">
                    {/* Car visualization */}
                    <svg
                        viewBox="0 0 800 450"
                        className="w-full"
                        style={{ filter: 'brightness(0.6)' }}
                    >
                        {/* gradient background */}
                        <defs>
                            <radialGradient id="spotlight" cx="40%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="rgba(180,190,210,0.15)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                            </radialGradient>
                        </defs>
                        <rect width="800" height="450" fill="url(#spotlight)" />

                        {/* Car body */}
                        <path d="M 80 310 L 80 220 Q 110 140 210 120 L 430 112 Q 530 108 600 130 L 680 175 L 700 220 L 710 310 Z" fill="rgba(60,65,80,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                        {/* Roof */}
                        <path d="M 230 120 L 252 55 L 500 50 L 540 120" fill="rgba(50,55,70,0.9)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                        {/* Windshields */}
                        <path d="M 248 116 L 266 58 L 400 55 L 410 116 Z" fill="rgba(0,80,150,0.15)" stroke="rgba(0,113,227,0.15)" strokeWidth="1" />
                        <path d="M 415 116 L 418 55 L 520 55 L 533 116 Z" fill="rgba(0,80,150,0.15)" stroke="rgba(0,113,227,0.15)" strokeWidth="1" />
                        {/* Wheels */}
                        <circle cx="175" cy="328" r="58" fill="rgba(25,25,30,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        <circle cx="175" cy="328" r="36" fill="#1A1A20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <circle cx="610" cy="328" r="58" fill="rgba(25,25,30,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        <circle cx="610" cy="328" r="36" fill="#1A1A20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        {/* Front light */}
                        <path d="M 700 175 L 720 200 L 720 240 L 700 240" fill="rgba(255,240,180,0.06)" stroke="rgba(255,240,180,0.2)" strokeWidth="1" />
                        {/* Grille */}
                        <rect x="685" y="245" width="30" height="50" rx="4" fill="rgba(30,30,40,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        {/* Damage marks - front */}
                        <path d="M 690 210 Q 710 215 720 208" stroke="rgba(255,59,48,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M 695 225 Q 715 230 722 222" stroke="rgba(255,59,48,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>

                    {/* Overlay bounding boxes that appear on scroll */}
                    <svg
                        ref={overlayRef}
                        className="absolute inset-0 w-full"
                        viewBox="0 0 800 450"
                        style={{ pointerEvents: 'none' }}
                    >
                        {/* Front Bumper box */}
                        <g data-box="0" style={{ opacity: 0 }}>
                            <rect x="668" y="195" width="105" height="130" rx="4"
                                fill="rgba(255,59,48,0.08)" stroke="#FF3B30" strokeWidth="1.5" strokeDasharray="6 3" />
                            <path d="M668 215 L668 195 L688 195" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                            <path d="M753 195 L773 195 L773 215" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                            <path d="M668 305 L668 325 L688 325" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                            <path d="M753 325 L773 325 L773 305" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                            <rect x="668" y="183" width="105" height="14" rx="3" fill="rgba(255,59,48,0.9)" />
                            <text x="720" y="193" textAnchor="middle" fill="white" fontSize="8" fontFamily="JetBrains Mono">Front Bumper · 87%</text>
                        </g>
                        {/* Left Door box */}
                        <g data-box="1" style={{ opacity: 0 }}>
                            <rect x="280" y="130" width="130" height="165" rx="4"
                                fill="rgba(255,214,10,0.06)" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="6 3" />
                            <path d="M280 150 L280 130 L300 130" fill="none" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" />
                            <path d="M390 130 L410 130 L410 150" fill="none" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" />
                            <rect x="280" y="118" width="130" height="14" rx="3" fill="rgba(255,214,10,0.9)" />
                            <text x="345" y="128" textAnchor="middle" fill="#000" fontSize="8" fontFamily="JetBrains Mono">Left Door · 91%</text>
                        </g>
                        {/* Hood box */}
                        <g data-box="2" style={{ opacity: 0 }}>
                            <rect x="530" y="112" width="150" height="90" rx="4"
                                fill="rgba(48,209,88,0.06)" stroke="#30D158" strokeWidth="1.5" strokeDasharray="6 3" />
                            <path d="M530 132 L530 112 L550 112" fill="none" stroke="#30D158" strokeWidth="2" strokeLinecap="round" />
                            <path d="M660 112 L680 112 L680 132" fill="none" stroke="#30D158" strokeWidth="2" strokeLinecap="round" />
                            <rect x="530" y="100" width="150" height="14" rx="3" fill="rgba(48,209,88,0.9)" />
                            <text x="605" y="110" textAnchor="middle" fill="#000" fontSize="8" fontFamily="JetBrains Mono">Hood · 73%</text>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Caption overlay */}
            <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-6 px-6">
                <p
                    ref={captionRef}
                    className="text-center font-clash font-bold text-white transition-all"
                    style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1.1 }}
                >
                    The moment it happened.
                </p>
                {/* Progress bar */}
                <div className="w-64 h-[2px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full bg-[#0071E3] rounded-full"
                        style={{ width: '0%', transition: 'none' }}
                    />
                </div>
                <p className="font-mono text-[11px] text-[#6E6E73] tracking-widest uppercase">Scroll to analyze</p>
            </div>
        </section>
    )
}
