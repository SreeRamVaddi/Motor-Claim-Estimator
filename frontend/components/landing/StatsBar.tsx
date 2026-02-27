'use client'
import { useRef, useEffect, useState } from 'react'
import { CountUp } from '@/components/ui/CountUp'

const STATS = [
    { value: 10, suffix: 's', label: 'Processing', prefix: '< ' },
    { value: 48, suffix: '', label: 'Parts Detectable', prefix: '' },
    { value: 94, suffix: '%', label: 'Accuracy', prefix: '' },
    { value: 0, suffix: '', label: 'Surveyor Cost', prefix: '₹' },
]

export function StatsBar() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.3 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={sectionRef}
            className="relative w-full"
            style={{
                background: '#0A0A0F',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '48px 0',
            }}
        >
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-0">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center text-center gap-3 px-4"
                            style={{
                                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                            }}
                        >
                            <span
                                className="tabular-nums"
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: 'clamp(36px, 5vw, 72px)',
                                    fontWeight: 700,
                                    color: '#F5F5F7',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1,
                                }}
                            >
                                {stat.prefix}
                                {isVisible
                                    ? <CountUp to={stat.value} duration={2000} suffix={stat.suffix} />
                                    : <span>0{stat.suffix}</span>
                                }
                            </span>
                            <span
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: 12,
                                    color: '#6E6E73',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
