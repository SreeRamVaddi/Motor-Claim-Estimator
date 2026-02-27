'use client'
import { motion } from 'framer-motion'

type ApprovalStatus = 'pre_approved' | 'manual_review' | 'flagged_fraud'

interface ApprovalBadgeProps {
    status: ApprovalStatus
}

const config: Record<ApprovalStatus, {
    icon: React.ReactNode
    label: string
    bg: string
    border: string
    color: string
}> = {
    pre_approved: {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'PRE-APPROVED',
        bg: 'rgba(48,209,88,0.12)',
        border: 'rgba(48,209,88,0.35)',
        color: '#30D158',
    },
    manual_review: {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'MANUAL REVIEW REQUIRED',
        bg: 'rgba(255,214,10,0.1)',
        border: 'rgba(255,214,10,0.35)',
        color: '#FFD60A',
    },
    flagged_fraud: {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'FLAGGED FOR INVESTIGATION',
        bg: 'rgba(255,59,48,0.1)',
        border: 'rgba(255,59,48,0.35)',
        color: '#FF3B30',
    },
}

export function ApprovalBadge({ status }: ApprovalBadgeProps) {
    const c = config[status]
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: c.color + '20' }}
            >
                {c.icon}
            </div>
            <div>
                <p className="font-clash font-bold text-white text-lg">{c.label}</p>
                <p className="font-mono text-xs" style={{ color: c.color }}>
                    {status === 'pre_approved'
                        ? 'No surveyor required · Instant authorization'
                        : status === 'manual_review'
                            ? 'Expert assigned within 2 hours'
                            : 'Claim under investigation · Do not proceed'}
                </p>
            </div>
        </motion.div>
    )
}
