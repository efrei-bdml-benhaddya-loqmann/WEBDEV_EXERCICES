import { createContext, useContext, type ReactNode } from 'react'
import type { SentimentResult } from '../types'

interface AppContextType {
    handleClearHistory: () => void
    handleReset: () => void
    handleDeleteHistory?: (id: string) => void
    handleSelectHistory?: (item: SentimentResult) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({
    children,
    value
}: {
    children: ReactNode,
    value: AppContextType
}) {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}
