import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useAuth } from '@/contexts/AuthContext'

export function useHistory() {
    const { user, loading: authLoading } = useAuth()
    const {
        history,
        fetchHistory,
        handleDeleteHistory,
        handleClearHistory,
        handleSelectHistory,
        result // Listen to result to refresh history after analysis
    } = useAppStore()

    // Autonomous data fetching
    useEffect(() => {
        if (user && !authLoading) {
            fetchHistory()
        }
    }, [user, authLoading, result, fetchHistory])

    return {
        history,
        fetchHistory,
        handleDeleteHistory,
        handleClearHistory,
        handleSelectHistory
    }
}
