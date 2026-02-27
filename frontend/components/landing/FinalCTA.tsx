'use client'
import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

// Deterministic PRNG (mulberry32) — same sequence on server & client
function seededRand(seed: number) {
    let s = seed
    return () => {
        s |= 0; s = s + 0x6D2B79F5 | 0
        let t = Math.imul(s ^ s >>> 15, 1 | s)
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
        return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
}

// Pre-generate all 80 particles with a fixed seed
const PARTICLES = Array.from({ length: 80 }, (_, i) => {
    const rand = seededRand(i * 7919 + 1)
    return {
        width: rand() * 2 + 1,
        height: rand() * 2 + 1,
        left: rand() * 100,
        top: rand() * 100,
        opacity: rand() * 0.4 + 0.05,
        yDelta: -(30 + rand() * 30),
        opPeak: rand() * 0.6 + 0.1,
        duration: 4 + rand() * 6,
        delay: rand() * 5,
    }
})

function ParticleField() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PARTICLES.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: p.width,
                        height: p.height,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, p.yDelta, 0],
                        opacity: [null, p.opPeak, null],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}


export function FinalCTA() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const linesRef = useRef<HTMLDivElement[]>([])

    useLayoutEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            gsap.from(linesRef.current, {
                y: 60,
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)',
                stagger: 0.12,
                duration: 0.9,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                },
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
            style={{ background: '#000000' }}
        >
            {/* Particle field */}
            <ParticleField />

            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-4xl px-6">
                {/* Label */}
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#6E6E73] mb-12">
                    Start Your Claim
                </p>

                {/* Main lines */}
                {['Zero paperwork.', 'Zero surveyor visits.', 'Zero waiting.'].map((line, i) => (
                    <div
                        key={i}
                        ref={(el) => { if (el) linesRef.current[i] = el }}
                        className="overflow-hidden"
                    >
                        <h2
                            className="font-clash font-bold text-white"
                            style={{
                                fontSize: 'clamp(40px, 7vw, 100px)',
                                lineHeight: 1.0,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {line}
                        </h2>
                    </div>
                ))}

                {/* CTA Button */}
                <motion.div
                    className="mt-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <Button
                        variant="primary"
                        size="xl"
                        className="relative group"
                        style={{
                            minWidth: 280,
                            height: 72,
                            fontSize: 18,
                            letterSpacing: '0.01em',
                        } as React.CSSProperties}
                        onClick={() => window.location.href = '/claim'}
                    >
                        {/* Button glow on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                boxShadow: '0 0 60px rgba(0,113,227,0.5), 0 0 120px rgba(0,113,227,0.2)',
                            }}
                        />
                        <span className="relative z-10">Upload Damage Photo →</span>
                    </Button>
                </motion.div>

                {/* Trust signals */}
                <motion.div
                    className="flex items-center justify-center gap-8 mt-10 flex-wrap"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {['< 10s Processing', '94% Accuracy', '₹0 Surveyor Fees', 'IRDAI Compliant'].map((item) => (
                        <span key={item} className="font-mono text-xs text-[#3A3A3F] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#0071E3]" />
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
