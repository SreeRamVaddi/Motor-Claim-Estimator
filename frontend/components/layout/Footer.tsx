'use client'
import Link from 'next/link'

const navCols = [
    {
        title: 'Product',
        links: [
            { label: 'How It Works', href: '/#how-it-works' },
            { label: 'Technology', href: '/#technology' },
            { label: 'Pricing', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Careers', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Use', href: '#' },
            { label: 'Disclaimer', href: '#' },
        ],
    },
]

export function Footer() {
    return (
        <footer
            className="bg-[#000000] relative"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
                <div className="flex flex-col md:flex-row md:justify-between gap-12">
                    {/* Brand */}
                    <div className="md:max-w-xs">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-[#0071E3] rounded-lg flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 12L8 4L14 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="8" cy="11" r="1.5" fill="white" />
                                </svg>
                            </div>
                            <span className="font-clash font-bold text-white text-lg">ClaimAI</span>
                        </div>
                        <p className="font-mono text-xs text-[#6E6E73] leading-relaxed">
                            AI-powered motor insurance claim assessment.<br />
                            Pre-approval in under 10 seconds.
                        </p>
                    </div>

                    {/* Nav columns */}
                    <div className="grid grid-cols-3 gap-12">
                        {navCols.map((col) => (
                            <div key={col.title}>
                                <p className="font-mono text-xs text-[#3A3A3F] uppercase tracking-[0.15em] mb-4">{col.title}</p>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="font-mono text-xs text-[#6E6E73] hover:text-white transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <p className="font-mono text-xs text-[#3A3A3F]">
                        © 2026 ClaimAI Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-[#3A3A3F]">
                        IRDAI Reg. No. XXXXX · This estimate is not a final policy document.
                    </p>
                </div>
            </div>
        </footer>
    )
}
