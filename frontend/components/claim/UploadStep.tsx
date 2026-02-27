'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useClaimStore } from '@/store/claimStore'

const schema = z.object({
    vehicleReg: z.string().min(5, 'Enter a valid registration number').max(20),
    policyNumber: z.string().min(5, 'Enter a valid policy number').max(30),
    contactEmail: z.string().email('Enter a valid email address'),
})
type FormData = z.infer<typeof schema>

interface UploadStepProps {
    onSubmit: (data: { vehicleReg: string; policyNumber: string; contactEmail: string }) => void
    loading: boolean
}

export function UploadStep({ onSubmit, loading }: UploadStepProps) {
    const { uploadedImage, previewUrl, setUploadedImage, setPreviewUrl } = useClaimStore()
    const [dragOver, setDragOver] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })

    const onDrop = useCallback((accepted: File[]) => {
        if (accepted.length === 0) return
        const file = accepted[0]
        setUploadedImage(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setDragOver(false)
    }, [setUploadedImage, setPreviewUrl])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.heic', '.webp'] },
        maxSize: 15 * 1024 * 1024,
        multiple: false,
        onDragEnter: () => setDragOver(true),
        onDragLeave: () => setDragOver(false),
    })

    const canSubmit = uploadedImage && isValid

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
            <div className="text-center mb-4">
                <h1
                    className="font-clash font-bold text-white mb-2"
                    style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1 }}
                >
                    Upload Damage Photo
                </h1>
                <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#A1A1A6', fontSize: 18 }}>
                    Any angle, any lighting. Our AI handles the rest.
                </p>
            </div>

            {/* Drop zone / Preview */}
            <AnimatePresence mode="wait">
                {!previewUrl ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                    >
                        <div
                            {...getRootProps()}
                            className="relative cursor-pointer rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 p-12"
                            style={{
                                border: `2px dashed ${isDragActive || dragOver ? '#0071E3' : 'rgba(255,255,255,0.18)'}`,
                                background: isDragActive ? 'rgba(0,113,227,0.06)' : 'rgba(255,255,255,0.02)',
                                minHeight: 260,
                                transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            <input {...getInputProps()} />
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{ background: 'rgba(0,113,227,0.12)' }}
                                animate={isDragActive ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.8 } } : {}}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.8">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </motion.div>
                            <div className="text-center">
                                <p className="font-clash font-semibold text-white text-lg">
                                    {isDragActive ? 'Release to upload' : 'Drop your damage photo here'}
                                </p>
                                <p className="font-mono text-sm text-[#6E6E73] mt-1">or click to browse</p>
                            </div>
                            <p className="font-mono text-xs text-[#3A3A3F] tracking-wider">
                                JPG · PNG · HEIC · Max 15MB
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative rounded-2xl overflow-hidden"
                        style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={previewUrl}
                            alt="Damage preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Vignette */}
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)' }}
                        />
                        {/* Change btn */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setUploadedImage(null); setPreviewUrl(null) }}
                            className="absolute bottom-3 right-3 font-mono text-xs text-white px-3 py-1.5 rounded-lg transition-colors"
                            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                        >
                            Change photo
                        </button>
                        {/* Success badge */}
                        <div
                            className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs text-[#30D158]"
                            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(48,209,88,0.3)' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                            Ready to analyze
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
                {[
                    { name: 'vehicleReg', label: 'Vehicle Registration Number', placeholder: 'MH12-AB-1234' },
                    { name: 'policyNumber', label: 'Policy Number', placeholder: 'POL-2024-XYZ' },
                    { name: 'contactEmail', label: 'Contact Email', placeholder: 'yourname@email.com' },
                ].map(({ name, label, placeholder }) => (
                    <div key={name} className="relative">
                        <label className="block font-mono text-[11px] text-[#6E6E73] tracking-widest uppercase mb-2">
                            {label}
                        </label>
                        <input
                            {...register(name as keyof FormData)}
                            placeholder={placeholder}
                            className="w-full px-4 py-3.5 rounded-xl font-mono text-sm text-white placeholder-[#3A3A3F] outline-none transition-all duration-200"
                            style={{
                                background: '#1A1A24',
                                border: `1px solid ${errors[name as keyof FormData] ? 'rgba(255,59,48,0.5)' : 'rgba(255,255,255,0.08)'}`,
                            }}
                            onFocus={(e) => {
                                if (!errors[name as keyof FormData])
                                    e.target.style.borderColor = 'rgba(0,113,227,0.5)'
                            }}
                            onBlur={(e) => {
                                if (!errors[name as keyof FormData])
                                    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                            }}
                        />
                        {errors[name as keyof FormData] && (
                            <p className="font-mono text-[11px] text-[#FF3B30] mt-1">
                                {errors[name as keyof FormData]?.message}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Submit button — appears when ready */}
            <AnimatePresence>
                {canSubmit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button
                            variant="primary"
                            size="xl"
                            className="w-full"
                            loading={loading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Analyze Damage →
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
