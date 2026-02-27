'use client'
import { useEffect, useRef } from 'react'
import { useCallback } from 'react'
import { claimsAPI } from '@/lib/api'
import { useClaimStore } from '@/store/claimStore'

export function useClaimPolling(claimId: string | null) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const { setStatus } = useClaimStore()

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    const startPolling = useCallback(() => {
        if (!claimId) return
        stopPolling()

        intervalRef.current = setInterval(async () => {
            try {
                const response = await claimsAPI.getStatus(claimId)
                const { status } = response.data

                setStatus(status)

                if (status === 'complete' || status === 'failed') {
                    stopPolling()
                }
            } catch (err) {
                console.error('Polling error:', err)
                stopPolling()
                setStatus('failed')
            }
        }, 500)
    }, [claimId, setStatus, stopPolling])

    useEffect(() => {
        return () => stopPolling()
    }, [stopPolling])

    return { startPolling, stopPolling }
}
