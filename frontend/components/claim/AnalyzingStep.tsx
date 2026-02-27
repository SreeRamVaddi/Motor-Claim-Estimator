'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClaimStore } from '@/store/claimStore'

type Phase = {
    id: string
    label: string
    subLabel: string
    duration: number  // ms
}

const PHASES: Phase[] = [
    { id: 'preprocessing', label: 'Preprocessing image...', subLabel: 'Normalizing · Resizing · Denoising', duration: 2000 },
    { id: 'detecting', label: 'Running damage detection...', subLabel: 'YOLOv8 · 48-part classifier · Confidence scoring', duration: 3500 },
    { id: 'estimating', label: 'Calculating cost estimate...', subLabel: 'Hyperlocal pricing · Severity multipliers', duration: 2500 },
    { id: 'generating', label: 'Generating report...', subLabel: 'Pre-approval check · PDF compilation', duration: 2000 },
]

const MOCK_DETECTIONS = [
    { part: 'Front Bumper', confidence: 87, color: '#FF3B30' },
    { part: 'Left Door Panel', confidence: 91, color: '#FFD60A' },
    { part: 'Hood', confidence: 73, color: '#30D158' },
]

const MOCK_COSTS = [
    { part: 'Front Bumper Replacement', cost: 12400 },
    { part: 'Left Door Repair', cost: 8200 },
    { part: 'Hood Respray', cost: 5800 },
]

interface AnalyzingStepProps {
    claimId: string | null
    onComplete: (claimId: string) => void
}

export function AnalyzingStep({ claimId, onComplete }: AnalyzingStepProps) {
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [phaseProgress, setPhaseProgress] = useState(0)
    const [overallProgress, setOverallProgress] = useState(0)
    const [visibleDetections, setVisibleDetections] = useState<number[]>([])
    const [visibleCosts, setVisibleCosts] = useState<number[]>([])
    const status = useClaimStore((s) => s.status)

    // Simulate phase progression (fallback when no real API)
    useEffect(() => {
        let timeElapsed = 0
        const totalTime = PHASES.reduce((s, p) => s + p.duration, 0)
        let currentPhase = 0
        let phaseStart = 0

        const interval = setInterval(() => {
            timeElapsed += 100
            const overall = Math.min(timeElapsed / totalTime, 0.99)
            setOverallProgress(overall)

            let cumulative = 0
            for (let i = 0; i < PHASES.length; i++) {
                const phaseEnd = cumulative + PHASES[i].duration
                if (timeElapsed < phaseEnd) {
                    if (currentPhase !== i) {
                        currentPhase = i
                        phaseStart = cumulative
                        setPhaseIndex(i)
                    }
                    const phaseProg = (timeElapsed - phaseStart) / PHASES[i].duration
                    setPhaseProgress(phaseProg)
                    break
                }
                cumulative = phaseEnd
            }

            // Show detections during phase 1
            if (currentPhase === 1) {
                const detected = Math.floor((timeElapsed - PHASES[0].duration) / (PHASES[1].duration / MOCK_DETECTIONS.length))
                setVisibleDetections(MOCK_DETECTIONS.slice(0, Math.min(detected + 1, MOCK_DETECTIONS.length)).map((_, i) => i))
            }
            // Show costs during phase 2
            if (currentPhase === 2) {
                const shown = Math.floor((timeElapsed - PHASES[0].duration - PHASES[1].duration) / (PHASES[2].duration / MOCK_COSTS.length))
                setVisibleCosts(MOCK_COSTS.slice(0, Math.min(shown + 1, MOCK_COSTS.length)).map((_, i) => i))
            }

            if (timeElapsed >= totalTime) {
                clearInterval(interval)
                setOverallProgress(1)
                setTimeout(() => onComplete(claimId || 'MC-2024-88421'), 600)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [claimId, onComplete])

    const phase = PHASES[phaseIndex]

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-8 items-center">
            {/* Phase title */}
            <div className="text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phaseIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                    >
                        <p className="font-mono text-xs text-[#0071E3] tracking-widest uppercase mb-3">
                            Phase {phaseIndex + 1} of {PHASES.length}
                        </p>
                        <h2
                            className="font-clash font-bold text-white mb-2"
                            style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
                        >
                            {phase.label}
                        </h2>
                        <p className="font-mono text-xs text-[#6E6E73]">{phase.subLabel}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Overall progress ring */}
            <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <motion.circle
                        cx="50" cy="50" r="42"
                        fill="none"
                        stroke="#0071E3"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - overallProgress) }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-white font-bold text-lg">
                        {Math.round(overallProgress * 100)}%
                    </span>
                </div>
            </div>

            {/* Phase progress bar */}
            <div className="w-full h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-[#0071E3] rounded-full"
                    animate={{ width: `${phaseProgress * 100}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                />
            </div>

            {/* Dynamic phase content */}
            <AnimatePresence mode="wait">
                {phaseIndex === 1 && visibleDetections.length > 0 && (
                    <motion.div
                        key="detections"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col gap-2"
                    >
                        {MOCK_DETECTIONS.map((det, i) => (
                            <AnimatePresence key={i}>
                                {visibleDetections.includes(i) && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                                        style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ background: det.color }} />
                                            <span className="font-mono text-sm text-[#A1A1A6]">{det.part}</span>
                                        </div>
                                        <span className="font-mono text-sm font-bold" style={{ color: det.color }}>
                                            {det.confidence}% confidence
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ))}
                    </motion.div>
                )}

                {phaseIndex === 2 && visibleCosts.length > 0 && (
                    <motion.div
                        key="costs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full rounded-2xl overflow-hidden"
                        style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.04)]">
                            <p className="font-mono text-[11px] text-[#6E6E73] tracking-widest uppercase">Cost Breakdown</p>
                        </div>
                        <div className="px-5 py-3 flex flex-col gap-2">
                            {MOCK_COSTS.map((cost, i) => (
                                <AnimatePresence key={i}>
                                    {visibleCosts.includes(i) && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="font-mono text-xs text-[#A1A1A6]">{cost.part}</span>
                                            <span className="font-mono text-xs text-white">₹{cost.cost.toLocaleString('en-IN')}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </motion.div>
                )}

                {phaseIndex === 3 && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#0071E3]"
                        />
                        <p className="font-mono text-xs text-[#6E6E73]">Compiling your pre-approval report...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Steps list */}
            <div className="w-full flex flex-col gap-1 mt-2">
                {PHASES.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: i === phaseIndex ? 'rgba(0,113,227,0.06)' : 'transparent' }}>
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                                background: i < phaseIndex ? '#30D158' : i === phaseIndex ? '#0071E3' : 'rgba(255,255,255,0.06)',
                            }}
                        >
                            {i < phaseIndex ? (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : i === phaseIndex ? (
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-white"
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{ duration: 0.7, repeat: Infinity }}
                                />
                            ) : null}
                        </div>
                        <span
                            className="font-mono text-sm"
                            style={{ color: i <= phaseIndex ? '#F5F5F7' : '#3A3A3F' }}
                        >
                            {p.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
