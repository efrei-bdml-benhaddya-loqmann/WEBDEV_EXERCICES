import { Delete, History } from '@openai/apps-sdk-ui/components/Icon'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { ThemeToggle } from './ThemeToggle'
import type { SentimentResult } from '../types'

export function Sidebar({
    isOpen,
    setIsOpen,
    history,
    onSelect,
    onClear,
    onDelete,
}: {
    isOpen: boolean
    setIsOpen: (o: boolean) => void
    history: SentimentResult[]
    onSelect: (item: SentimentResult) => void
    onClear: () => void
    onDelete: (id: string) => void
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
                className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-surface-secondary border-r border-default flex flex-col transition-transform duration-300 ease-in-out transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        lg:static lg:flex shrink-0`}
            >
                <div className="flex items-center justify-between p-3 pb-0 flex-shrink-0">
                    <div className="flex items-center gap-2 pl-2">
                        <h2 className="font-medium text-sm text-secondary">History</h2>
                    </div>
                    <button className="lg:hidden p-2 rounded-md hover:bg-surface-tertiary text-secondary" onClick={() => setIsOpen(false)}>
                        <Delete className="size-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1 overflow-x-hidden">
                    {history.length === 0 && (
                        <div className="text-tertiary text-sm text-center mt-6">
                            No history yet.
                        </div>
                    )}
                    {history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="text-left py-2 pr-2 pl-3 rounded-lg hover:bg-surface-tertiary transition-colors flex items-center justify-between gap-3 w-full group cursor-pointer"
                        >
                            <span className="truncate flex-1 text-sm text-secondary group-hover:text-default transition-colors">
                                {item.text}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    color="secondary"
                                    size="sm"
                                    uniform
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(item.id)
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-surface-tertiary"
                                    aria-label="Delete item"
                                >
                                    <Delete className="size-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 border-t border-default flex-shrink-0 flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        color="secondary"
                        variant="ghost"
                        onClick={onClear}
                        block
                        disabled={history.length === 0}
                        className="text-secondary hover:bg-surface-tertiary flex-1"
                    >
                        Clear History
                    </Button>
                </div>
            </div>
        </>
    )
}
