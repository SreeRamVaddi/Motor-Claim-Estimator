'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#technology', label: 'Technology' },
    { href: '/dashboard', label: 'Dashboard' },
]

const WHITE = '#FFFFFF'
const DIM = 'rgba(255,255,255,0.65)'

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const check = () => setScrolled(window.scrollY > 40)
        check()
        window.addEventListener('scroll', check, { passive: true })
        return () => window.removeEventListener('scroll', check)
    }, [])

    const bg = scrolled
        ? 'rgba(0,0,0,0.88)'
        : 'linear-gradient(to bottom,rgba(0,0,0,0.65)0%,rgba(0,0,0,0)100%)'

    return (
        <header
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
                background: bg,
                backdropFilter: scrolled ? 'blur(18px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
                transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
            }}
        >
            <div style={{ padding: '14px 32px', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: '#0071E3',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="7" cy="10" r="1.5" fill="white" />
                        </svg>
                    </div>
                    <span style={{
                        color: WHITE,
                        fontSize: 17,
                        fontWeight: 700,
                        fontFamily: "'Clash Display', sans-serif",
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                    }}>
                        ClaimAI
                    </span>
                </Link>

                {/* Nav links */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                color: DIM,
                                textDecoration: 'none',
                                fontSize: 13,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                            onMouseLeave={e => (e.currentTarget.style.color = DIM)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <Link
                    href="/claim"
                    style={{
                        color: WHITE,
                        textDecoration: 'none',
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 500,
                        padding: '9px 20px',
                        borderRadius: 10,
                        border: '1px solid rgba(255,255,255,0.25)',
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                        letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                    }}
                >
                    Start Claim →
                </Link>
            </div>
        </header>
    )
}
