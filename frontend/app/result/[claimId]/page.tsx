'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { DetectionOverlay } from '@/components/result/DetectionOverlay'
import { CostTable } from '@/components/result/CostTable'
import { ApprovalBadge } from '@/components/result/ApprovalBadge'
import { Button } from '@/components/ui/Button'
import { useClaimStore } from '@/store/claimStore'

// Mock data for demo mode (when backend not available)
const MOCK_RESULT = {
    claim_id: 'MC-2024-88421',
    status: 'complete' as const,
    processing_time_ms: 8421,
    vehicle_reg: 'MH12-AB-1234',
    policy_number: 'POL-2024-XYZ',
    approval_status: 'pre_approved' as const,
    approval_threshold: 50000,
    image_url: '',
    detections: [
        { part: 'Front Bumper', severity: 'high' as const, confidence: 87, bbox: { x1: 420, y1: 200, x2: 620, y2: 340 }, part_cost: 12400, labor_cost: 2000, total_cost: 14400 },
        { part: 'Left Door', severity: 'medium' as const, confidence: 91, bbox: { x1: 140, y1: 130, x2: 320, y2: 290 }, part_cost: 8200, labor_cost: 1500, total_cost: 9700 },
        { part: 'Hood', severity: 'low' as const, confidence: 73, bbox: { x1: 250, y1: 80, x2: 520, y2: 170 }, part_cost: 5800, labor_cost: 1000, total_cost: 6800 },
    ],
    cost_summary: { parts_total: 26400, labour_total: 4500, grand_total: 30900 },
    ai_explanation: 'Front bumper shows significant deformation consistent with a low-speed frontal impact. Hood warping suggests possible radiator support damage — recommend full workshop inspection before repair. Left door panel has surface-level impact marks likely from a secondary scrape incident.',
    fraud_flags: [],
    created_at: new Date().toISOString(),
}

export default function ResultPage() {
    const params = useParams()
    const claimId = params?.claimId as string | undefined
    const storeResult = useClaimStore((s) => s.result)
    const previewUrl = useClaimStore((s) => s.previewUrl)

    // Use store result if available, otherwise show mock
    const result = storeResult || { ...MOCK_RESULT, claim_id: claimId || MOCK_RESULT.claim_id }

    const processedAt = new Date(result.created_at)
    const dateStr = processedAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    const timeStr = processedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
            {/* Top meta bar */}
            <div className="pt-24 pb-0 px-6 md:px-10 max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between gap-4 pb-6"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <div>
                        <p className="font-mono text-xs text-[#6E6E73] tracking-widest uppercase mb-1">Motor Claim Report</p>
                        <h1
                            className="font-clash font-bold text-white"
                            style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
                        >
                            Claim #{result.claim_id}
                        </h1>
                        <p className="font-mono text-xs text-[#6E6E73] mt-1">
                            Processed in {(result.processing_time_ms / 1000).toFixed(1)}s · {dateStr} · {timeStr}
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <Button variant="ghost" size="sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                            </svg>
                            Download PDF
                        </Button>
                        <Button variant="primary" size="sm">Submit to Insurer →</Button>
                    </div>
                </motion.div>
            </div>

            {/* Main content */}
            <div className="pb-20 pt-8 px-6 md:px-10 max-w-[1200px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column — Image with detection overlay */}
                    <div className="lg:w-[58%]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <DetectionOverlay
                                imageUrl={previewUrl || result.image_url}
                                detections={result.detections}
                                imageWidth={640}
                                imageHeight={480}
                            />
                        </motion.div>

                        {/* Bounding box legend */}
                        <div className="flex items-center gap-6 mt-4 px-1">
                            {(['high', 'medium', 'low'] as const).map((sev) => (
                                <div key={sev} className="flex items-center gap-1.5">
                                    <div
                                        className="w-3 h-3 rounded-sm"
                                        style={{
                                            background: sev === 'high' ? 'rgba(255,59,48,0.2)' : sev === 'medium' ? 'rgba(255,214,10,0.2)' : 'rgba(48,209,88,0.2)',
                                            border: `1.5px solid ${sev === 'high' ? '#FF3B30' : sev === 'medium' ? '#FFD60A' : '#30D158'}`,
                                        }}
                                    />
                                    <span className="font-mono text-[11px] capitalize text-[#6E6E73]">{sev} severity</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column — Analysis details */}
                    <div className="lg:w-[42%] flex flex-col gap-5">
                        {/* Approval status */}
                        <ApprovalBadge status={result.approval_status} />

                        {/* Vehicle info */}
                        <div
                            className="px-5 py-4 rounded-2xl grid grid-cols-2 gap-4"
                            style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {[
                                { label: 'Vehicle Registration', value: result.vehicle_reg },
                                { label: 'Policy Number', value: result.policy_number },
                                { label: 'Approval Threshold', value: `₹${(result.approval_threshold / 1000).toFixed(0)}K` },
                                { label: 'Damage Points Found', value: result.detections.length },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className="font-mono text-[10px] text-[#3A3A3F] uppercase tracking-widest mb-1">{label}</p>
                                    <p className="font-mono text-sm text-white font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cost table */}
                        <CostTable
                            detections={result.detections}
                            costSummary={result.cost_summary}
                        />

                        {/* AI Explanation */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="rounded-2xl p-5"
                            style={{
                                background: '#111118',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderLeft: '3px solid #0071E3',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(0,113,227,0.15)' }}
                                >
                                    <span className="text-xs">🤖</span>
                                </div>
                                <p className="font-mono text-[11px] text-[#0071E3] tracking-widest uppercase">AI Assessment</p>
                            </div>
                            <p
                                style={{
                                    fontFamily: 'Instrument Serif, serif',
                                    fontStyle: 'italic',
                                    fontSize: 15,
                                    color: '#A1A1A6',
                                    lineHeight: 1.7,
                                }}
                            >
                                &ldquo;{result.ai_explanation}&rdquo;
                            </p>
                        </motion.div>

                        {/* Fraud flags */}
                        {result.fraud_flags.length === 0 && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 rounded-xl"
                                style={{ background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <p className="font-mono text-xs text-[#30D158]">No fraud indicators detected</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
