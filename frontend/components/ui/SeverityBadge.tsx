'use client'
import { cn } from '@/lib/utils'

type Severity = 'high' | 'medium' | 'low'

interface SeverityBadgeProps {
    severity: Severity
    className?: string
}

const config: Record<Severity, { label: string; bg: string; text: string; border: string }> = {
    high: { label: 'HIGH', bg: 'rgba(255,59,48,0.15)', text: '#FF3B30', border: 'rgba(255,59,48,0.3)' },
    medium: { label: 'MEDIUM', bg: 'rgba(255,214,10,0.15)', text: '#FFD60A', border: 'rgba(255,214,10,0.3)' },
    low: { label: 'LOW', bg: 'rgba(48,209,88,0.15)', text: '#30D158', border: 'rgba(48,209,88,0.3)' },
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
    const { label, bg, text, border } = config[severity]
    return (
        <span
            className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-xs font-semibold tracking-widest', className)}
            style={{
                background: bg,
                color: text,
                border: `1px solid ${border}`,
            }}
        >
            {label}
        </span>
    )
}
