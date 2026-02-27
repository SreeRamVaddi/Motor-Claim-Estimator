'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/GlowCard'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { formatINR } from '@/lib/utils'

const MOCK_CLAIMS = [
    { id: 'MC-2024-001', vehicle: 'MH12-AB-1234', status: 'complete', approval: 'pre_approved', total: 30900, created: '27 Feb, 3:42 PM' },
    { id: 'MC-2024-002', vehicle: 'DL01-XX-9876', status: 'complete', approval: 'manual_review', total: 78200, created: '27 Feb, 2:15 PM' },
    { id: 'MC-2024-003', vehicle: 'KA01-MN-4567', status: 'complete', approval: 'pre_approved', total: 12500, created: '27 Feb, 1:08 PM' },
    { id: 'MC-2024-004', vehicle: 'TN09-PQ-2233', status: 'processing', approval: null, total: null, created: '27 Feb, 12:45 PM' },
    { id: 'MC-2024-005', vehicle: 'MH04-CD-5512', status: 'complete', approval: 'flagged_fraud', total: 14200, created: '27 Feb, 11:20 AM' },
    { id: 'MC-2024-006', vehicle: 'GJ01-AB-7788', status: 'complete', approval: 'pre_approved', total: 8900, created: '27 Feb, 10:00 AM' },
]

const KPI_CARDS = [
    { label: 'Total Claims Today', value: '47', sub: '+12% from yesterday', color: '#0071E3' },
    { label: 'Avg. Estimate', value: '₹28.4K', sub: 'Median: ₹22K', color: '#30D158' },
    { label: 'Pre-Approval Rate', value: '73%', sub: '34 of 47 claims', color: '#FFD60A' },
    { label: 'Fraud Flags Today', value: '2', sub: 'Under investigation', color: '#FF3B30' },
]

function StatusPill({ approval }: { approval: string | null }) {
    if (!approval) return <span className="font-mono text-xs text-[#6E6E73]">Processing...</span>
    const map: Record<string, { label: string; color: string; bg: string }> = {
        pre_approved: { label: 'Pre-Approved', color: '#30D158', bg: 'rgba(48,209,88,0.12)' },
        manual_review: { label: 'Manual Review', color: '#FFD60A', bg: 'rgba(255,214,10,0.12)' },
        flagged_fraud: { label: 'Fraud Flag', color: '#FF3B30', bg: 'rgba(255,59,48,0.12)' },
    }
    const c = map[approval]
    return (
        <span
            className="font-mono text-[11px] px-2.5 py-0.5 rounded-full"
            style={{ color: c.color, background: c.bg }}
        >
            {c.label}
        </span>
    )
}

export default function DashboardPage() {
    const [filter, setFilter] = useState<'all' | 'pre_approved' | 'manual_review' | 'flagged_fraud'>('all')

    const filtered = MOCK_CLAIMS.filter(c =>
        filter === 'all' ? true : c.approval === filter
    )

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-10" style={{ background: '#0A0A0F' }}>
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="font-mono text-xs text-[#0071E3] tracking-widest uppercase mb-2">Admin Panel</p>
                    <h1
                        className="font-clash font-bold text-white"
                        style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                    >
                        Claims Dashboard
                    </h1>
                    <p className="font-mono text-sm text-[#6E6E73] mt-1">
                        Live claim monitoring · Feb 27, 2026
                    </p>
                </motion.div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {KPI_CARDS.map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                        >
                            <GlowCard
                                glowColor={kpi.color + '33'}
                                animate
                                hoverable
                                className="p-5"
                            >
                                <p className="font-mono text-[11px] text-[#6E6E73] tracking-widest uppercase mb-3">{kpi.label}</p>
                                <p
                                    className="font-clash font-bold mb-1"
                                    style={{ fontSize: 36, color: kpi.color, lineHeight: 1 }}
                                >
                                    {kpi.value}
                                </p>
                                <p className="font-mono text-[11px] text-[#6E6E73]">{kpi.sub}</p>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                {/* Claims table */}
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    {/* Table header + filters */}
                    <div
                        className="flex items-center justify-between gap-4 px-6 py-4 flex-wrap"
                        style={{ background: '#111118', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <p className="font-clash font-bold text-white text-lg">Recent Claims</p>
                        <div className="flex gap-2 flex-wrap">
                            {(['all', 'pre_approved', 'manual_review', 'flagged_fraud'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-200"
                                    style={{
                                        background: filter === f ? 'rgba(0,113,227,0.2)' : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${filter === f ? 'rgba(0,113,227,0.4)' : 'rgba(255,255,255,0.06)'}`,
                                        color: filter === f ? '#0071E3' : '#6E6E73',
                                    }}
                                >
                                    {f === 'all' ? 'All' : f === 'pre_approved' ? 'Pre-Approved' : f === 'manual_review' ? 'Manual Review' : 'Fraud Flags'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column headers */}
                    <div
                        className="grid px-6 py-3"
                        style={{
                            gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr',
                            background: 'rgba(255,255,255,0.01)',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}
                    >
                        {['Claim ID', 'Vehicle Reg.', 'Status', 'Estimate', 'Submitted'].map((h) => (
                            <p key={h} className="font-mono text-[10px] text-[#3A3A3F] tracking-widest uppercase">{h}</p>
                        ))}
                    </div>

                    {/* Rows */}
                    {filtered.map((claim, i) => (
                        <motion.div
                            key={claim.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.35 }}
                            className="grid items-center px-6 py-4 cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.02)]"
                            style={{
                                gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                            }}
                            onClick={() => window.location.href = `/result/${claim.id}`}
                        >
                            <p className="font-mono text-sm font-semibold text-[#0071E3]">{claim.id}</p>
                            <p className="font-mono text-sm text-[#A1A1A6]">{claim.vehicle}</p>
                            <StatusPill approval={claim.approval} />
                            <p className="font-mono text-sm text-white">
                                {claim.total ? formatINR(claim.total) : '—'}
                            </p>
                            <p className="font-mono text-xs text-[#6E6E73]">{claim.created}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
