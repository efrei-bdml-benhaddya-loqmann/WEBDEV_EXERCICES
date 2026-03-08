import { create } from 'zustand'
import type { SentimentResult, ServiceStatus, FlaskState } from '@/types'
import {
    analyzeText,
    clearHistory,
    deleteHistoryItem,
    getHistory,
    updateHistoryItem,
    checkExpressApiStatus,
    checkFlaskApiStatus,
    checkSupabaseStatus
} from '@/services/api'
import { delay, getErrorMessage, isMobileScreen } from '@/utils'

type AppState = {
    isSidebarOpen: boolean
    inputText: string
    isSubmitting: boolean
    submittedText: string | null
    result: SentimentResult | null
    error: string | null
    repeatPing: boolean
    expressStatus: ServiceStatus
    flaskStatus: FlaskState
    supabaseStatus: ServiceStatus
    history: SentimentResult[]
}

type AppActions = {
    setIsSidebarOpen: (isOpen: boolean) => void
    setInputText: (text: string) => void
    setRepeatPing: (repeat: boolean) => void
    setExpressStatus: (status: ServiceStatus) => void
    setFlaskStatus: (status: FlaskState) => void
    setSupabaseStatus: (status: ServiceStatus) => void
    setSubmittedText: (text: string | null) => void
    setResult: (result: SentimentResult | null) => void
    setError: (error: string | null) => void
    fetchHistory: () => Promise<void>
    verifyStatus: () => Promise<void>
    performAnalysis: (text: string) => Promise<void>
    handleScore: (id: string, feedback: 'positive' | 'negative' | 'none') => Promise<void>
    handleClearHistory: () => Promise<void>
    handleDeleteHistory: (id: string) => Promise<void>
    handleSelectHistory: (item: SentimentResult) => void
    handleReset: () => void
}

export const useAppStore = create<AppState & AppActions>()((set, get) => ({
    isSidebarOpen: false,
    inputText: '',
    isSubmitting: false,
    submittedText: null,
    result: null,
    error: null,
    repeatPing: true,
    expressStatus: 'checking',
    flaskStatus: { status: 'checking' },
    supabaseStatus: 'checking',
    history: [] as SentimentResult[],

    setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
    setInputText: (text: string) => set({ inputText: text }),
    setRepeatPing: (repeat: boolean) => set({ repeatPing: repeat }),
    setExpressStatus: (status: ServiceStatus) => set({ expressStatus: status }),
    setFlaskStatus: (status: FlaskState) => set({ flaskStatus: status }),
    setSupabaseStatus: (status: ServiceStatus) => set({ supabaseStatus: status }),
    setSubmittedText: (text: string | null) => set({ submittedText: text }),
    setResult: (result: SentimentResult | null) => set({ result }),
    setError: (error: string | null) => set({ error }),

    fetchHistory: async () => {
        try {
            const data = await getHistory()
            set({ history: data })
        } catch (err) {
            set({ error: getErrorMessage(err) })
        }
    },

    verifyStatus: async () => {
        if (!get().repeatPing) return

        const [express, flask, supabase] = await Promise.all([
            checkExpressApiStatus(),
            checkFlaskApiStatus(),
            checkSupabaseStatus()
        ])

        set({
            expressStatus: express ? 'online' : 'offline',
            flaskStatus: flask,
            supabaseStatus: supabase ? 'online' : 'offline'
        })
    },

    performAnalysis: async (text: string) => {
        if (!text.trim()) return

        set({
            submittedText: text,
            isSubmitting: true,
            result: null,
            error: null
        })

        await delay(1500)
        try {
            const newResult = await analyzeText(text)
            set({ result: newResult, isSubmitting: false })
            get().fetchHistory()
        } catch (err) {
            set({ error: getErrorMessage(err), isSubmitting: false })
        }
    },

    handleScore: async (id: string, feedback: 'positive' | 'negative' | 'none') => {
        const { result, history } = get()
        if (result && result.id === id) {
            set({ result: { ...result, feedback } })
        }
        set({
            history: history.map(item => item.id === id ? { ...item, feedback } : item)
        })

        try {
            await updateHistoryItem(id, { feedback })
        } catch (err) {
            console.error('Failed to persist feedback:', err)
        }
    },

    handleClearHistory: async () => {
        try {
            await clearHistory()
            set({ history: [] })
        } catch (err) {
            console.error('Failed to clear history:', err)
        }
    },

    handleDeleteHistory: async (id: string) => {
        try {
            await deleteHistoryItem(id)
            set((state) => ({
                history: state.history.filter(item => item.id !== id)
            }))
        } catch (err) {
            console.error('Failed to delete history item:', err)
        }
    },

    handleSelectHistory: (item: SentimentResult) => {
        set({
            submittedText: item.text,
            result: item,
            error: null
        })
        if (isMobileScreen()) {
            set({ isSidebarOpen: false })
        }
    },

    handleReset: () => {
        set({
            submittedText: null,
            result: null,
            error: null,
            inputText: '',
            isSidebarOpen: false
        })
    }
}))

