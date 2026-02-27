'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressBar } from '@/components/claim/ProgressBar'
import { UploadStep } from '@/components/claim/UploadStep'
import { AnalyzingStep } from '@/components/claim/AnalyzingStep'
import { useClaimStore } from '@/store/claimStore'
import { claimsAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'

type Step = 0 | 1 | 2

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
}

export default function ClaimPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>(0)
    const [loading, setLoading] = useState(false)
    const [activeClaimId, setActiveClaimId] = useState<string | null>(null)

    const uploadedImage = useClaimStore((s) => s.uploadedImage)
    const setClaimId = useClaimStore((s) => s.setClaimId)

    async function handleUploadSubmit(formData: {
        vehicleReg: string
        policyNumber: string
        contactEmail: string
    }) {
        if (!uploadedImage) return
        setLoading(true)

        try {
            const fd = new FormData()
            fd.append('image', uploadedImage)
            fd.append('vehicle_reg', formData.vehicleReg)
            fd.append('policy_number', formData.policyNumber)
            fd.append('email', formData.contactEmail)

            let claimId = `MC-${Date.now()}`
            try {
                const resp = await claimsAPI.upload(fd)
                claimId = resp.data.claim_id
            } catch {
                // Backend not available yet — use demo mode
            }

            setClaimId(claimId)
            setActiveClaimId(claimId)
            setStep(1)
        } finally {
            setLoading(false)
        }
    }

    function handleAnalysisComplete(resolvedClaimId: string) {
        router.push(`/result/${resolvedClaimId}`)
    }

    return (
        <div className="min-h-screen" style={{ background: '#000000' }}>
            <ProgressBar currentStep={step} />

            <div className="pt-44 pb-20 px-6 flex items-start justify-center min-h-screen">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="upload"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-lg"
                        >
                            <UploadStep
                                onSubmit={handleUploadSubmit}
                                loading={loading}
                            />
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="analyzing"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-lg"
                        >
                            <AnalyzingStep
                                claimId={activeClaimId}
                                onComplete={handleAnalysisComplete}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
