'use client'
import { motion } from 'framer-motion'

const STEPS = ['Upload', 'Analyzing', 'Results']

interface ProgressBarProps {
    currentStep: 0 | 1 | 2
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
    return (
        <div className="fixed left-0 right-0 z-40 px-6 pt-4 pb-4"
            style={{ top: 64, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
            <div className="max-w-lg mx-auto">
                {/* Step labels */}
                <div className="flex justify-between mb-3">
                    {STEPS.map((step, i) => (
                        <span
                            key={step}
                            className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-300"
                            style={{ color: i <= currentStep ? '#F5F5F7' : '#3A3A3F' }}
                        >
                            {step}
                        </span>
                    ))}
                </div>
                {/* Progress track */}
                <div className="h-[2px] bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#0071E3] rounded-full"
                        initial={false}
                        animate={{ width: `${((currentStep) / (STEPS.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
                {/* Dot indicators */}
                <div className="flex justify-between -mt-[5px]">
                    {STEPS.map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full border-2"
                            animate={{
                                background: i <= currentStep ? '#0071E3' : 'transparent',
                                borderColor: i <= currentStep ? '#0071E3' : 'rgba(255,255,255,0.2)',
                                scale: i === currentStep ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
