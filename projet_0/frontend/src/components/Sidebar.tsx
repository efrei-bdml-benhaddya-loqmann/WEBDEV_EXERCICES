import { X, History } from '@openai/apps-sdk-ui/components/Icon'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import type { SentimentResult } from '../types'

export function Sidebar({
    isOpen,
    setIsOpen,
    history,
    onSelect,
    onClear,
}: {
    isOpen: boolean
    setIsOpen: (o: boolean) => void
    history: SentimentResult[]
    onSelect: (item: SentimentResult) => void
    onClear: () => void
}) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#171717] dark:bg-[#111111] text-white flex flex-col transition-transform duration-300 ease-in-out transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        lg:static lg:flex shrink-0`}
            >
                <div className="flex items-center justify-between p-3 flex-shrink-0">
                    <div className="flex items-center gap-2 pl-2">
                        <History className="size-4 opacity-70" />
                        <h2 className="font-medium text-sm text-gray-200">History</h2>
                    </div>
                    <button className="lg:hidden p-2 rounded-md hover:bg-white/10" onClick={() => setIsOpen(false)}>
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1 overflow-x-hidden">
                    {history.length === 0 && (
                        <div className="text-gray-400 text-sm text-center mt-6">
                            No history yet.
                        </div>
                    )}
                    {history.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="text-left py-2 px-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3 w-full group"
                        >
                            <span className="truncate flex-1 text-sm text-gray-200 group-hover:text-white transition-colors">
                                {item.text}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="p-3 border-t border-white/10 flex-shrink-0">
                    <Button
                        color="secondary"
                        variant="ghost"
                        onClick={onClear}
                        block
                        disabled={history.length === 0}
                        className="text-gray-300 hover:bg-white/10"
                    >
                        Clear History
                    </Button>
                </div>
            </div>
        </>
    )
}
