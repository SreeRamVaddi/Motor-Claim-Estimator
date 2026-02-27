'use client'
import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const steps = [
    {
        number: '01',
        step: 'STEP ONE',
        title: 'Drop the photo.\nNothing else.',
        body: 'JPG, PNG, HEIC. Any angle, any lighting condition. Our AI handles preprocessing, normalization, and perspective correction automatically.',
        visual: <UploadVisual />,
    },
    {
        number: '02',
        step: 'STEP TWO',
        title: 'Computer Vision sees\nwhat adjusters miss.',
        body: 'YOLOv8 identifies up to 48 distinct car parts with sub-second inference. Every dent, scrape, and deformation is catalogued.',
        visual: <DetectionVisual />,
    },
    {
        number: '03',
        step: 'STEP THREE',
        title: 'Instant cost\nintelligence.',
        body: 'Rule-based severity multipliers combined with a hyperlocal Indian market pricing database deliver accurate, region-specific estimates.',
        visual: <EstimationVisual />,
    },
    {
        number: '04',
        step: 'STEP FOUR',
        title: 'Approved before\nyou even called.',
        body: 'Claims under the policy threshold get instant pre-approval. Zero surveyor visits. Zero waiting. Zero paperwork queues.',
        visual: <ApprovalVisual />,
    },
]

function UploadVisual() {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {/* Phone mockup */}
            <motion.div
                initial={{ rotateY: 15, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative"
                style={{ perspective: 1000 }}
            >
                <div
                    className="rounded-[32px] overflow-hidden"
                    style={{
                        width: 200,
                        height: 360,
                        background: '#1A1A24',
                        border: '2px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                    }}
                >
                    <div className="w-full h-full flex flex-col p-3 gap-2">
                        {/* Status bar */}
                        <div className="flex justify-between items-center px-2 py-1">
                            <span className="font-mono text-[9px] text-[#6E6E73]">9:41</span>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-1 rounded-full bg-[#6E6E73]" style={{ height: 6 + i * 2 }} />
                                ))}
                            </div>
                        </div>
                        {/* App header */}
                        <div className="px-2 pb-1">
                            <p className="font-mono text-[10px] text-[#0071E3] tracking-widest uppercase">ClaimAI</p>
                            <p className="font-clash text-white text-sm font-bold">Upload Damage</p>
                        </div>
                        {/* Drop zone */}
                        <motion.div
                            className="flex-1 rounded-2xl flex flex-col items-center justify-center gap-2 mx-1"
                            style={{ border: '1.5px dashed rgba(0,113,227,0.4)', background: 'rgba(0,113,227,0.04)' }}
                            animate={{ borderColor: ['rgba(0,113,227,0.4)', 'rgba(0,113,227,0.8)', 'rgba(0,113,227,0.4)'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-[rgba(0,113,227,0.15)] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </div>
                            <p className="font-mono text-[9px] text-[#6E6E73] text-center">Tap to upload photo</p>
                        </motion.div>
                        {/* Fields */}
                        {['Vehicle Reg.', 'Policy No.'].map(label => (
                            <div key={label} className="mx-1 px-2 py-1.5 rounded-lg" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <p className="font-mono text-[8px] text-[#6E6E73]">{label}</p>
                            </div>
                        ))}
                        {/* Button */}
                        <div className="mx-1 py-2 rounded-xl bg-[#0071E3] text-center">
                            <p className="font-mono text-[10px] text-white font-semibold">Analyze →</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function DetectionVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative" style={{ width: 280, height: 200 }}>
                {/* Car damage image placeholder */}
                <div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0A0A0F, #111118)' }}
                >
                    <svg viewBox="0 0 280 200" className="w-full h-full opacity-50">
                        <path d="M20 140 L20 95 Q35 55 90 45 L190 42 Q240 40 258 60 L268 95 L268 140 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <path d="M100 45 L112 18 L230 18 L244 45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <circle cx="68" cy="148" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <circle cx="218" cy="148" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    </svg>
                </div>
                {/* Bounding boxes that draw on entry */}
                <motion.div
                    className="absolute"
                    style={{ top: '10%', left: '55%', width: '38%', height: '40%' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <svg viewBox="0 0 100 80" width="100%" height="100%">
                        <rect x="2" y="2" width="96" height="76" rx="4" fill="rgba(255,59,48,0.08)" stroke="#FF3B30" strokeWidth="1.5" strokeDasharray="6 3" />
                        <path d="M2 16 L2 2 L16 2" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                        <path d="M84 2 L98 2 L98 16" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 64 L2 78 L16 78" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                        <path d="M84 78 L98 78 L98 64" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <motion.div
                        className="absolute -bottom-6 left-0 font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ background: 'rgba(255,59,48,0.9)', color: 'white' }}
                        initial={{ opacity: 0, y: -5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Front Bumper · 87%
                    </motion.div>
                </motion.div>
                <motion.div
                    className="absolute"
                    style={{ top: '20%', left: '5%', width: '32%', height: '45%' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <svg viewBox="0 0 90 90" width="100%" height="100%">
                        <rect x="2" y="2" width="86" height="86" rx="4" fill="rgba(255,214,10,0.08)" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="6 3" />
                    </svg>
                    <motion.div
                        className="absolute -bottom-6 left-0 font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ background: 'rgba(255,214,10,0.9)', color: '#000' }}
                        initial={{ opacity: 0, y: -5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Left Door · 91%
                    </motion.div>
                </motion.div>
                <motion.div
                    className="absolute"
                    style={{ top: '5%', left: '20%', width: '45%', height: '30%' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <svg viewBox="0 0 120 60" width="100%" height="100%">
                        <rect x="2" y="2" width="116" height="56" rx="4" fill="rgba(48,209,88,0.06)" stroke="#30D158" strokeWidth="1.5" strokeDasharray="6 3" />
                    </svg>
                    <motion.div
                        className="absolute -bottom-6 left-0 font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ background: 'rgba(48,209,88,0.9)', color: '#000' }}
                        initial={{ opacity: 0, y: -5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        viewport={{ once: true }}
                    >
                        Hood · 73%
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

function EstimationVisual() {
    const items = [
        { part: 'Front Bumper Replacement', cost: 12400, sev: 'high' as const },
        { part: 'Left Door Repair', cost: 8200, sev: 'medium' as const },
        { part: 'Hood Respray', cost: 5800, sev: 'low' as const },
        { part: 'Labour (est.)', cost: 4500, sev: null },
    ]
    return (
        <motion.div
            className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
            style={{ background: '#1A1A24', border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
        >
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <p className="font-mono text-[11px] text-[#0071E3] tracking-widest uppercase mb-1">Cost Breakdown</p>
                <p className="font-clash text-white text-lg font-bold">Damage Estimate</p>
            </div>
            <div className="px-5 py-3 flex flex-col gap-2">
                {items.map(({ part, cost, sev }) => (
                    <div key={part} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            {sev && (
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{
                                        background: sev === 'high' ? '#FF3B30' : sev === 'medium' ? '#FFD60A' : '#30D158',
                                    }}
                                />
                            )}
                            <p className="font-mono text-xs text-[#A1A1A6] truncate">{part}</p>
                        </div>
                        <p className="font-mono text-xs text-white whitespace-nowrap">₹{cost.toLocaleString('en-IN')}</p>
                    </div>
                ))}
                <div className="border-t border-[rgba(255,255,255,0.08)] pt-2 mt-1 flex items-center justify-between">
                    <p className="font-mono text-sm font-bold text-white">TOTAL ESTIMATE</p>
                    <p
                        className="font-mono text-sm font-bold"
                        style={{ color: '#0071E3' }}
                    >
                        ₹30,900
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

function ApprovalVisual() {
    return (
        <div className="flex flex-col items-center gap-6">
            {/* Animated checkmark */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="rgba(48,209,88,0.1)" stroke="#30D158" strokeWidth="2" />
                    <motion.path
                        d="M 28 50 L 44 66 L 72 36"
                        fill="none"
                        stroke="#30D158"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                </svg>
            </motion.div>
            {/* Badge */}
            <motion.div
                className="px-6 py-3 rounded-full font-clash font-bold text-xl"
                style={{ background: '#30D158', color: 'white' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
            >
                PRE-APPROVED
            </motion.div>
            <motion.p
                className="font-mono text-xs text-[#6E6E73] text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
            >
                Claim #MC-2024-88421 · ₹30,900 est.<br />Ready for workshop authorization
            </motion.p>
        </div>
    )
}

export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth - window.innerWidth

            gsap.to(track, {
                x: () => -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1.2,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="relative overflow-hidden"
            style={{ background: '#0A0A0F' }}
        >
            {/* The horizontal track */}
            <div
                ref={trackRef}
                className="flex"
                style={{ width: `${steps.length * 100}vw`, willChange: 'transform' }}
            >
                {steps.map((s, i) => (
                    <div
                        key={s.number}
                        className="flex-shrink-0 w-screen h-screen flex items-center"
                        style={{ padding: '80px 6vw' }}
                    >
                        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center">
                            {/* Visual left */}
                            <div className="relative h-[380px]">
                                {/* Ghost number */}
                                <div
                                    className="absolute -top-16 -left-6 select-none pointer-events-none"
                                    style={{
                                        fontFamily: 'Clash Display, sans-serif',
                                        fontSize: 'clamp(120px, 16vw, 240px)',
                                        fontWeight: 800,
                                        color: 'rgba(255,255,255,0.04)',
                                        lineHeight: 1,
                                    }}
                                >
                                    {s.number}
                                </div>
                                <div className="relative z-10 h-full flex items-center justify-center">
                                    {s.visual}
                                </div>
                            </div>

                            {/* Text right */}
                            <div className="flex flex-col gap-5">
                                <p
                                    className="font-mono tracking-widest uppercase"
                                    style={{ fontSize: 11, color: '#0071E3' }}
                                >
                                    {s.step}
                                </p>
                                <h2
                                    className="font-clash font-bold text-white"
                                    style={{
                                        fontSize: 'clamp(32px, 4vw, 60px)',
                                        lineHeight: 1.05,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {s.title}
                                </h2>
                                <p
                                    style={{
                                        fontFamily: 'Instrument Serif, serif',
                                        fontSize: 'clamp(16px, 1.4vw, 20px)',
                                        color: '#A1A1A6',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {s.body}
                                </p>
                                {/* Step indicator dots */}
                                <div className="flex gap-2 mt-4">
                                    {steps.map((_, j) => (
                                        <div
                                            key={j}
                                            className="rounded-full transition-all duration-300"
                                            style={{
                                                width: j === i ? 24 : 6,
                                                height: 6,
                                                background: j === i ? '#0071E3' : 'rgba(255,255,255,0.2)',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: vertical stacked fallback (hidden on desktop) */}
            <style>{`
        @media (max-width: 768px) {
          .how-works-horizontal { display: none !important; }
        }
      `}</style>
        </section>
    )
}
