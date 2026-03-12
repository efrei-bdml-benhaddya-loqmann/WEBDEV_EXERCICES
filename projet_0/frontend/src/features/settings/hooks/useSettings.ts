import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useSettings() {
    const {
        repeatPing,
        setRepeatPing,
        expressStatus,
        flaskStatus,
        supabaseStatus,
        inferenceMode,
        handleSetInferenceMode,
        fetchInferenceMode,
        verifyStatus
    } = useAppStore()

    // Autonomous monitoring logic
    useEffect(() => {
        if (!repeatPing) return
        
        // Initial check
        verifyStatus()
        
        // Background interval (30s)
        const intervalId = setInterval(verifyStatus, 30000)
        return () => clearInterval(intervalId)
    }, [repeatPing, verifyStatus])

    // Load inference mode on mount
    useEffect(() => {
        fetchInferenceMode()
    }, [fetchInferenceMode])

    return {
        repeatPing,
        setRepeatPing,
        expressStatus,
        flaskStatus,
        supabaseStatus,
        inferenceMode,
        handleSetInferenceMode,
        verifyStatus
    }
}
