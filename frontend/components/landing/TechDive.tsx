'use client'
import { useRef, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
    {
        eyebrow: 'COMPUTER VISION',
        title: 'Real-time object detection that never blinks.',
        body: 'YOLOv8 processes your damage image in milliseconds. Trained on thousands of vehicle damage photos across bumpers, hoods, doors, headlights, and more.',
    },
    {
        eyebrow: 'PRICING ENGINE',
        title: 'Hyperlocal parts pricing. Built in.',
        body: 'Our cost database maps to regional Indian market rates for OEM and aftermarket parts. Severity multipliers (1× → 2×) applied automatically based on damage classification.',
    },
    {
        eyebrow: 'INSTANT DECISIONS',
        title: 'Sub-threshold claims approved automatically.',
        body: 'Claims estimated below your policy threshold receive instant pre-approval. No waiting. No surveyor. No calls. The decision is made before you close the app.',
    },
    {
        eyebrow: 'INTEGRITY LAYER',
        title: 'Repeat claims detected before they\'re processed.',
        body: 'Vehicle fingerprinting flags claims from the same VIN submitted multiple times. Anomaly scoring adds a second layer of protection against fraudulent submissions.',
    },
]

// Simple 3D neural network visualization using SVG
function NeuralNetworkViz({ activeIndex }: { activeIndex: number }) {
    const layers = [3, 5, 4, 3, 2]
    const NODE_R = 8
    const WIDTH = 300
    const HEIGHT = 260
    const layerSpacing = WIDTH / (layers.length - 1)

    const nodes = layers.map((count, li) => {
        const x = li * layerSpacing + 20
        return Array.from({ length: count }, (_, ni) => ({
            x,
            y: (HEIGHT / (count + 1)) * (ni + 1),
            active: li === activeIndex % layers.length,
        }))
    })

    return (
        <svg viewBox={`0 0 ${WIDTH + 40} ${HEIGHT}`} className="w-full max-w-xs opacity-70">
            <defs>
                <radialGradient id="nodeGlow">
                    <stop offset="0%" stopColor="#0071E3" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
                </radialGradient>
            </defs>
            {/* Connections */}
            {nodes.slice(0, -1).map((layer, li) =>
                layer.map((from) =>
                    nodes[li + 1].map((to, ti) => (
                        <line
                            key={`${li}-${from.y}-${ti}`}
                            x1={from.x} y1={from.y}
                            x2={to.x} y2={to.y}
                            stroke={from.active || to.active ? 'rgba(0,113,227,0.4)' : 'rgba(255,255,255,0.04)'}
                            strokeWidth={from.active || to.active ? 1.2 : 0.6}
                        />
                    ))
                )
            )}
            {/* Nodes */}
            {nodes.map((layer, li) =>
                layer.map((node, ni) => (
                    <g key={`node-${li}-${ni}`}>
                        {node.active && (
                            <circle cx={node.x} cy={node.y} r={NODE_R * 3} fill="url(#nodeGlow)" />
                        )}
                        <circle
                            cx={node.x} cy={node.y} r={NODE_R}
                            fill={node.active ? '#0071E3' : '#1A1A24'}
                            stroke={node.active ? '#0071E3' : 'rgba(255,255,255,0.1)'}
                            strokeWidth={1.5}
                        />
                    </g>
                ))
            )}
        </svg>
    )
}

export function TechDive() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const blocksRef = useRef<HTMLDivElement[]>([])
    const [activeFeature, setActiveFeature] = useState(0)

    useLayoutEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            blocksRef.current.forEach((block, i) => {
                if (!block) return
                ScrollTrigger.create({
                    trigger: block,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveFeature(i),
                    onEnterBack: () => setActiveFeature(i),
                })
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="technology"
            className="relative"
            style={{ background: '#0A0A0F' }}
        >
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                {/* Section header */}
                <div className="pt-24 pb-16 text-center">
                    <p className="font-mono text-xs text-[#0071E3] tracking-widest uppercase mb-4">Under The Hood</p>
                    <h2
                        className="font-clash font-bold text-white"
                        style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05 }}
                    >
                        Built for precision.<br />Designed for speed.
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-16 pb-24">
                    {/* Sticky left column */}
                    <div
                        className="md:w-[45%] md:sticky md:top-24 md:self-start"
                        style={{ height: 'fit-content' }}
                    >
                        <div
                            className="rounded-3xl p-8 flex flex-col items-center gap-8"
                            style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {/* Neural net visualization */}
                            <NeuralNetworkViz activeIndex={activeFeature} />

                            {/* Active feature label */}
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="text-center"
                            >
                                <p className="font-mono text-[10px] text-[#0071E3] tracking-widest uppercase mb-1">
                                    {FEATURES[activeFeature].eyebrow}
                                </p>
                                <p
                                    className="font-clash font-bold text-white text-lg"
                                    style={{ lineHeight: 1.2 }}
                                >
                                    {FEATURES[activeFeature].title}
                                </p>
                            </motion.div>

                            {/* Step dots */}
                            <div className="flex gap-2">
                                {FEATURES.map((_, i) => (
                                    <div
                                        key={i}
                                        className="rounded-full transition-all duration-400"
                                        style={{
                                            width: i === activeFeature ? 24 : 6,
                                            height: 6,
                                            background: i === activeFeature ? '#0071E3' : 'rgba(255,255,255,0.15)',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scrolling right column */}
                    <div className="md:w-[55%] flex flex-col gap-8">
                        {FEATURES.map((feat, i) => (
                            <div
                                key={i}
                                ref={(el) => { if (el) blocksRef.current[i] = el }}
                                className="min-h-[60vh] flex items-center"
                            >
                                <motion.div
                                    className="w-full rounded-2xl p-8"
                                    style={{
                                        background: '#111118',
                                        border: `1px solid ${activeFeature === i ? 'rgba(0,113,227,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                        boxShadow: activeFeature === i ? '0 0 40px rgba(0,113,227,0.08)' : 'none',
                                        transition: 'all 0.4s ease',
                                    }}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <p className="font-mono text-[11px] text-[#0071E3] tracking-widest uppercase mb-3">
                                        {feat.eyebrow}
                                    </p>
                                    <h3
                                        className="font-clash font-bold text-white mb-4"
                                        style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.15 }}
                                    >
                                        {feat.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'Instrument Serif, serif',
                                            fontSize: 'clamp(16px, 1.3vw, 19px)',
                                            color: '#A1A1A6',
                                            lineHeight: 1.65,
                                        }}
                                    >
                                        {feat.body}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
