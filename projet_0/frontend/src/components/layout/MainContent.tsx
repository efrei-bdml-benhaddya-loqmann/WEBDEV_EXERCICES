import type { ReactNode } from 'react'

export function MainContent({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-surface dark:bg-[#000000]">
            {children}
        </div>
    )
}

export function HeroTitle() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            {/* <div className="mb-4 bg-surface-secondary w-16 h-16 rounded-3xl flex items-center justify-center shadow-sm">
                <span className="text-3xl">🎭</span>
            </div> */}
            <h1 className="heading-xl font-normal mb-3">Sentiment Analyzer</h1>
            <p className="text-secondary max-w-sm text-md">
                Enter a prompt and let AI evaluate whether the tone is <span className="text-[var(--green-300)] font-medium">positive</span>, <span className="text-[var(--red-300)] font-medium">negative</span>, or <span className="text-secondary font-medium">neutral</span>.
            </p>
        </div>
    )
}
