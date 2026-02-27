import type { ReactNode } from 'react'

export function MainContent({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-white dark:bg-[#212121]">
            {children}
        </div>
    )
}

export function HeroTitle() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="mb-4 bg-gray-100 dark:bg-[#2f2f2f] w-16 h-16 rounded-3xl flex items-center justify-center shadow-sm">
                <span className="text-3xl">🎭</span>
            </div>
            <h1 className="text-3xl font-semibold mb-3 tracking-tight">Sentiment Analyzer</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm">
                Enter a prompt and let AI evaluate whether the tone is <span className="text-green-600 dark:text-green-500 font-medium">positive</span>, <span className="text-red-500 dark:text-red-400 font-medium">negative</span>, or <span className="text-gray-600 dark:text-gray-400 font-medium">neutral</span>.
            </p>
        </div>
    )
}
