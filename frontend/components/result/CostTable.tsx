'use client'
import { motion } from 'framer-motion'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { formatINR } from '@/lib/utils'

interface Detection {
    part: string
    severity: 'low' | 'medium' | 'high'
    confidence: number
    part_cost: number
    labor_cost: number
    total_cost: number
}

interface CostTableProps {
    detections: Detection[]
    costSummary: { parts_total: number; labour_total: number; grand_total: number }
}

export function CostTable({ detections, costSummary }: CostTableProps) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
            {/* Header */}
            <div
                className="grid grid-cols-4 gap-2 px-5 py-3"
                style={{ background: '#111118', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
                {['PART', 'SEVERITY', 'CONFIDENCE', 'COST ESTIMATE'].map((h) => (
                    <p key={h} className="font-mono text-[10px] text-[#3A3A3F] tracking-widest uppercase">
                        {h}
                    </p>
                ))}
            </div>

            {/* Rows */}
            {detections.map((det, i) => (
                <motion.div
                    key={det.part}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="grid grid-cols-4 gap-2 items-center px-5 py-3.5"
                    style={{
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                >
                    <p className="font-mono text-sm text-[#F5F5F7] truncate">{det.part}</p>
                    <div><SeverityBadge severity={det.severity} /></div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: det.severity === 'high' ? '#FF3B30' : det.severity === 'medium' ? '#FFD60A' : '#30D158',
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${det.confidence}%` }}
                                transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                            />
                        </div>
                        <span className="font-mono text-[11px] text-[#6E6E73] w-8 text-right">{det.confidence}%</span>
                    </div>
                    <p className="font-mono text-sm text-white tabular-nums">{formatINR(det.total_cost)}</p>
                </motion.div>
            ))}

            {/* Labour row */}
            <div
                className="grid grid-cols-4 gap-2 items-center px-5 py-3.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
                <p className="font-mono text-sm text-[#A1A1A6]">Labour Charges</p>
                <p className="font-mono text-xs text-[#6E6E73]">—</p>
                <p className="font-mono text-xs text-[#6E6E73]">—</p>
                <p className="font-mono text-sm text-white tabular-nums">{formatINR(costSummary.labour_total)}</p>
            </div>

            {/* Total row */}
            <div
                className="grid grid-cols-4 gap-2 items-center px-5 py-4"
                style={{ background: 'rgba(0,113,227,0.06)', borderTop: '1px solid rgba(0,113,227,0.2)' }}
            >
                <p className="col-span-3 font-mono text-sm font-bold text-white tracking-wide">TOTAL ESTIMATE</p>
                <p
                    className="font-mono text-base font-bold tabular-nums"
                    style={{ color: '#0071E3' }}
                >
                    {formatINR(costSummary.grand_total)}
                </p>
            </div>
        </div>
    )
}
