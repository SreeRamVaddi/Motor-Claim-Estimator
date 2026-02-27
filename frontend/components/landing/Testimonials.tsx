'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
    {
        stars: 5,
        quote: "What used to take our adjusters 48 hours now takes 8 seconds. The accuracy is genuinely impressive — it caught panel damage our team missed on first inspection.",
        name: 'Rajesh Kumar',
        role: 'Senior Claims Manager',
        company: 'Bajaj Allianz GI',
        city: 'Pune',
    },
    {
        stars: 5,
        quote: "My bumper got hit in a parking lot. Uploaded a photo, got an estimate and pre-approval in under 10 seconds. Filed the claim from the parking lot itself.",
        name: 'Priya Menon',
        role: 'Policyholder',
        company: '',
        city: 'Bengaluru',
    },
    {
        stars: 5,
        quote: "We integrated ClaimAI into our workflow and saw a 70% reduction in surveyor dispatches for minor claims. ROI was clear within the first month.",
        name: 'Arjun Sharma',
        role: 'Head of Digital Transformation',
        company: 'HDFC Ergo',
        city: 'Mumbai',
    },
    {
        stars: 5,
        quote: "The fraud detection caught three duplicate VIN submissions in the first week. Saves us lakhs in potential fraudulent payouts every quarter.",
        name: 'Deepika Nair',
        role: 'Fraud Prevention Lead',
        company: 'New India Assurance',
        city: 'Chennai',
    },
    {
        stars: 5,
        quote: "Unbelievable that I got a pre-approved claim letter before I even drove the car to the workshop. This is what insurance in 2026 should feel like.",
        name: 'Vikram Tiwari',
        role: 'Policyholder',
        company: '',
        city: 'Delhi',
    },
]

function StarRow({ count }: { count: number }) {
    return (
        <div className="flex gap-1 mb-4">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFD60A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    )
}

export function Testimonials() {
    const trackRef = useRef<HTMLDivElement>(null)

    return (
        <section className="relative overflow-hidden" style={{ background: '#F5F5F7', padding: '80px 0' }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#6E6E73' }}>
                        Social Proof
                    </p>
                    <h2
                        className="font-clash font-bold"
                        style={{ color: '#1D1D1F', fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.05 }}
                    >
                        What adjusters used to<br />take days to do.
                    </h2>
                </div>

                {/* Draggable carousel */}
                <motion.div
                    ref={trackRef}
                    drag="x"
                    dragConstraints={{
                        left: -(TESTIMONIALS.length - 1) * 410,
                        right: 0,
                    }}
                    dragElastic={0.1}
                    className="flex gap-6 cursor-grab active:cursor-grabbing"
                    style={{ width: 'max-content' }}
                >
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            className="flex-shrink-0 flex flex-col p-7 rounded-3xl bg-white select-none"
                            style={{
                                width: 380,
                                boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(0,0,0,0.04)',
                            }}
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, boxShadow: '0 16px 60px rgba(0,0,0,0.1)' }}
                        >
                            <StarRow count={t.stars} />
                            <p
                                className="flex-1 mb-6"
                                style={{
                                    fontFamily: 'Instrument Serif, serif',
                                    fontStyle: 'italic',
                                    fontSize: 18,
                                    color: '#1D1D1F',
                                    lineHeight: 1.6,
                                }}
                            >
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-clash font-bold text-white text-base flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #0071E3, #00C7FF)' }}
                                >
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="font-mono text-xs font-semibold text-[#1D1D1F]">{t.name}</p>
                                    <p className="font-mono text-[10px] text-[#6E6E73]">
                                        {t.role}{t.company ? ` · ${t.company}` : ''} · {t.city}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Drag hint */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6E6E73" strokeWidth="1.5">
                        <path d="M8 3l-5 5 5 5M16 21l5-5-5-5" />
                    </svg>
                    <span className="font-mono text-[11px] text-[#6E6E73] tracking-wider">Drag to explore</span>
                </div>
            </div>
        </section>
    )
}
