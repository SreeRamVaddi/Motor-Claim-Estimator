'use client'
import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: Variant
    size?: Size
    children: React.ReactNode
    className?: string
    loading?: boolean
}

const variantStyles: Record<Variant, string> = {
    primary: 'bg-[#0071E3] text-white border border-[#0071E3] hover:bg-[#0077ED] hover:shadow-[0_0_40px_rgba(0,113,227,0.4)]',
    secondary: 'bg-transparent text-white border border-[rgba(255,255,255,0.3)] backdrop-blur-xl hover:border-[#0071E3] hover:shadow-[0_0_30px_rgba(0,113,227,0.3)]',
    ghost: 'bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)] backdrop-blur-xl hover:bg-[rgba(255,255,255,0.08)]',
    danger: 'bg-[#FF3B30] text-white border border-[#FF3B30] hover:bg-[#FF453A] hover:shadow-[0_0_40px_rgba(255,59,48,0.4)]',
}

const sizeStyles: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
    xl: 'px-10 py-5 text-lg rounded-2xl min-w-[240px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    children,
    className,
    loading,
    disabled,
    ...props
}, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            disabled={disabled || loading}
            className={cn(
                'relative inline-flex items-center justify-center gap-2',
                'font-mono font-medium tracking-wide cursor-pointer',
                'transition-colors duration-200',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {loading ? (
                <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="opacity-70">Processing...</span>
                </>
            ) : children}
        </motion.button>
    )
})

Button.displayName = 'Button'

export { Button }
