'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null)
    const scanLineRef = useRef<HTMLDivElement>(null)
    const detectionRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLDivElement>(null)
    const subRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const scrollIndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Set initial hidden state client-side only (SSR stays visible)
            gsap.set([headlineRef.current, subRef.current, ctaRef.current], {
                opacity: 0, y: 40,
            })
            gsap.set(detectionRef.current, { opacity: 0, scale: 0.85 })

            const tl = gsap.timeline({ delay: 0.2 })

            // 1. Scan line sweeps down
            tl.fromTo(scanLineRef.current,
                { y: '-100%', opacity: 1 },
                { y: '120%', duration: 1.6, ease: 'none' }
            )
            // 2. Detection box pops in
            tl.to(detectionRef.current,
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
                '-=0.3'
            )
            // 3. Headline
            tl.to(headlineRef.current,
                { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' },
                '-=0.2'
            )
            // 4. Sub
            tl.to(subRef.current,
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.3'
            )
            // 5. CTA
            tl.to(ctaRef.current,
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                '-=0.2'
            )

            // Fade scroll indicator on scroll
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: '+=120',
                onUpdate: (self) => {
                    if (scrollIndRef.current) {
                        scrollIndRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 3))
                    }
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{ height: '100dvh', minHeight: 600 }}
        >
            {/* ── Full-bleed car image ── */}
            <Image
                src="/car-damage-hero.jpg"
                alt="Damaged car — AI damage assessment"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* ── Dark overlay: top for navbar legibility, bottom for headline readability ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        linear-gradient(to bottom,
                            rgba(0,0,0,0.55) 0%,
                            rgba(0,0,0,0.15) 35%,
                            rgba(0,0,0,0.05) 55%,
                            rgba(0,0,0,0.70) 80%,
                            rgba(0,0,0,0.92) 100%
                        )
                    `,
                }}
            />

            {/* ── Scan line ── */}
            <div
                ref={scanLineRef}
                className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, #0071E3 50%, transparent 100%)',
                    boxShadow: '0 0 24px 6px rgba(0,113,227,0.7)',
                    top: 0,
                }}
            />

            {/* ── AI Detection box (on the bumper area) ── */}
            <div
                ref={detectionRef}
                className="absolute z-20"
                style={{ left: '8%', top: '38%', width: 140, height: 110 }}
            >
                <svg viewBox="0 0 140 110" width="140" height="110">
                    <rect x="2" y="2" width="136" height="106"
                        fill="rgba(255,59,48,0.08)" stroke="#FF3B30"
                        strokeWidth="1.5" strokeDasharray="8 4" rx="4" />
                    <path d="M2 22 L2 2 L22 2" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M118 2 L138 2 L138 22" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M2 88 L2 108 L22 108" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M118 108 L138 108 L138 88" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div
                    className="absolute -bottom-7 left-0 font-mono text-[11px] px-2 py-1 rounded whitespace-nowrap"
                    style={{ background: 'rgba(255,59,48,0.9)', color: 'white' }}
                >
                    Front Bumper · 87%
                </div>
            </div>

            {/* ── Second detection box (hood) ── */}
            <div
                className="absolute z-20"
                style={{ left: '30%', top: '22%', width: 160, height: 90 }}
            >
                <svg viewBox="0 0 160 90" width="160" height="90">
                    <rect x="2" y="2" width="156" height="86"
                        fill="rgba(255,214,10,0.06)" stroke="#FFD60A"
                        strokeWidth="1.5" strokeDasharray="8 4" rx="4" />
                    <path d="M2 18 L2 2 L18 2" fill="none" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M142 2 L158 2 L158 18" fill="none" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M2 72 L2 88 L18 88" fill="none" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M142 88 L158 88 L158 72" fill="none" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div
                    className="absolute -bottom-7 left-0 font-mono text-[11px] px-2 py-1 rounded whitespace-nowrap"
                    style={{ background: 'rgba(255,214,10,0.9)', color: '#000' }}
                >
                    Hood · 73%
                </div>
            </div>

            {/* ── Headline block — bottom overlay ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-16 md:px-16">
                {/* Headline */}
                <div ref={headlineRef}>
                    <h1
                        style={{
                            fontFamily: "'Clash Display', sans-serif",
                            fontSize: 'clamp(52px, 8vw, 120px)',
                            fontWeight: 700,
                            lineHeight: 0.92,
                            letterSpacing: '-0.02em',
                            color: '#F5F5F7',
                        }}
                    >
                        Instant.{' '}
                        <span style={{ color: '#F5F5F7' }}>Accurate.</span>
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #0071E3, #00C7FF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Approved.
                        </span>
                    </h1>
                </div>

                {/* Sub-headline */}
                <div ref={subRef} className="mt-4">
                    <p
                        style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontStyle: 'italic',
                            fontSize: 'clamp(16px, 2vw, 22px)',
                            color: 'rgba(245,245,247,0.7)',
                        }}
                    >
                        AI sees the damage. You get the estimate — in under 10 seconds.
                    </p>
                </div>

                {/* CTA row */}
                <div ref={ctaRef} className="mt-6 flex items-center gap-6 flex-wrap">
                    <Button
                        variant="primary"
                        size="xl"
                        onClick={() => window.location.href = '/claim'}
                    >
                        Assess My Claim →
                    </Button>
                    <div className="flex items-center gap-6 flex-wrap">
                        {['< 10s Processing', '94% Accuracy', '₹0 Surveyor Fees'].map((item) => (
                            <span key={item} className="font-mono text-[11px] tracking-widest text-white/50 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#0071E3] inline-block" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <div
                ref={scrollIndRef}
                className="absolute bottom-6 right-8 z-20 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
                        <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                        <rect x="9" y="6" width="4" height="7" rx="2" fill="rgba(255,255,255,0.4)" />
                    </svg>
                </motion.div>
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Scroll
                </span>
            </div>
        </section>
    )
}
