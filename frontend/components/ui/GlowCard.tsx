'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowCardProps {
    children: React.ReactNode
    className?: string
    glowColor?: string
    hoverable?: boolean
    animate?: boolean
}

export function GlowCard({
    children,
    className,
    glowColor = 'rgba(0,113,227,0.2)',
    hoverable = false,
    animate = false,
}: GlowCardProps) {
    const Wrapper = animate ? motion.div : 'div'
    const animProps = animate && hoverable
        ? {
            whileHover: {
                boxShadow: `0 0 60px ${glowColor}, 0 0 120px ${glowColor.replace('0.2', '0.08')}`,
                y: -4,
                transition: { duration: 0.25 },
            } satisfies object,
        }
        : {}

    return (
        <Wrapper
            className={cn(
                'relative rounded-2xl overflow-hidden',
                'bg-[#111118] border border-[rgba(255,255,255,0.08)]',
                'transition-all duration-300',
                className
            )}
            {...(animProps as object)}
        >
            {/* Ambient glow rim */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at top left, ${glowColor} 0%, transparent 60%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </Wrapper>
    )
}
