import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)
}

export function formatINR(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`
}

export function getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
        case 'high': return '#FF3B30'
        case 'medium': return '#FFD60A'
        case 'low': return '#30D158'
        default: return '#A1A1A6'
    }
}

export function getSeverityBg(severity: string): string {
    switch (severity.toLowerCase()) {
        case 'high': return 'rgba(255,59,48,0.15)'
        case 'medium': return 'rgba(255,214,10,0.15)'
        case 'low': return 'rgba(48,209,88,0.15)'
        default: return 'rgba(161,161,166,0.15)'
    }
}

export function clampNumber(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
