'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export function SeveritySpectrum() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const leftTextRef = useRef<HTMLDivElement>(null)
    const rightTextRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const section = sectionRef.current
        if (!section) return
        const ctx = gsap.context(() => {
            gsap.to(leftTextRef.current, {
                y: '-12%',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })
            gsap.to(rightTextRef.current, {
                y: '12%',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, section)
        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen overflow-hidden"
        >
            {/* Left — white / light side */}
            <div className="relative w-1/2 bg-[#F5F5F7] flex items-center justify-start pl-12 md:pl-20 overflow-hidden">
                <div ref={leftTextRef} className="relative z-10 max-w-sm py-24">
                    {/* Badge */}
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold mb-6"
                        style={{ background: 'rgba(48,209,88,0.12)', color: '#1a7a38', border: '1px solid rgba(48,209,88,0.3)' }}
                    >
                        <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                        LOW SEVERITY
                    </span>
                    <h3
                        className="font-clash font-bold mb-3"
                        style={{ color: '#1D1D1F', fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
                    >
                        Minor damage.<br />Quick resolution.
                    </h3>
                    <p
                        className="mb-6"
                        style={{
                            fontFamily: 'Instrument Serif, serif',
                            fontSize: 'clamp(15px, 1.3vw, 18px)',
                            color: '#6E6E73',
                            lineHeight: 1.6,
                        }}
                    >
                        Paint scratch &amp; minor dent. Estimated repair cost between ₹2,000–₹8,000.
                    </p>
                    <div className="flex flex-col gap-3">
                        <div
                            className="flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm font-semibold"
                            style={{ background: 'rgba(48,209,88,0.1)', color: '#1a7a38', border: '1px solid rgba(48,209,88,0.2)' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Auto Pre-Approved
                        </div>
                        <p className="font-mono text-xs text-[#6E6E73]">No surveyor required · Instant payout</p>
                    </div>
                </div>
                {/* Decorative green glow */}
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(48,209,88,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
            </div>

            {/* Center car (sticky) */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ width: 'clamp(180px, 16vw, 260px)' }}
            >
                <svg viewBox="0 0 200 100" className="w-full drop-shadow-2xl">
                    <path d="M 10 75 L 10 50 Q 20 28 52 22 L 112 20 Q 148 18 165 28 L 182 44 L 188 58 L 190 75 Z" fill="rgba(100,110,130,0.7)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                    <path d="M 58 22 L 64 6 L 146 5 L 155 22" fill="rgba(80,90,110,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                    <circle cx="42" cy="80" r="18" fill="#1A1A24" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="158" cy="80" r="18" fill="#1A1A24" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </svg>
            </div>

            {/* Right — dark / black side */}
            <div className="relative w-1/2 bg-[#000000] flex items-center justify-end pr-12 md:pr-20 overflow-hidden">
                <div ref={rightTextRef} className="relative z-10 max-w-sm py-24">
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold mb-6"
                        style={{ background: 'rgba(255,59,48,0.12)', color: '#FF3B30', border: '1px solid rgba(255,59,48,0.3)' }}
                    >
                        <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                        HIGH SEVERITY
                    </span>
                    <h3
                        className="font-clash font-bold text-white mb-3"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
                    >
                        Major damage.<br />Zero delays for you.
                    </h3>
                    <p
                        className="mb-6"
                        style={{
                            fontFamily: 'Instrument Serif, serif',
                            fontSize: 'clamp(15px, 1.3vw, 18px)',
                            color: '#A1A1A6',
                            lineHeight: 1.6,
                        }}
                    >
                        Structural deformation &amp; airbag deployment. Estimated repair cost ₹60,000+.
                    </p>
                    <div className="flex flex-col gap-3">
                        <div
                            className="flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm font-semibold"
                            style={{ background: 'rgba(255,214,10,0.1)', color: '#FFD60A', border: '1px solid rgba(255,214,10,0.2)' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Escalated for Manual Review
                        </div>
                        <p className="font-mono text-xs text-[#6E6E73]">Expert assigned within 2 hours</p>
                    </div>
                </div>
                {/* Decorative red glow */}
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,59,48,0.08) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
            </div>
        </section>
    )
}
