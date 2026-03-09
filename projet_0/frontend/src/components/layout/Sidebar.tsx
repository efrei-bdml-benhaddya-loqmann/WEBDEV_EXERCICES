import { Delete, X } from '@openai/apps-sdk-ui/components/Icon'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { SidebarMenu } from './SidebarMenu'
import { useAppStore } from '../../store/useAppStore'

export function Sidebar() {
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        history,
        handleSelectHistory,
        handleDeleteHistory,
        handleReset
    } = useAppStore()

    return (
        <>
            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-20 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 z-[30] w-[260px] bg-surface-secondary border-r border-default flex flex-col transition-transform duration-300 ease-in-out transform overflow-visible
                                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                                lg:static lg:flex shrink-0`}>
                <div className="flex items-center justify-between p-3 pb-0 flex-shrink-0">
                    <Button
                        color="secondary"
                        variant="ghost"
                        size="lg"
                        uniform
                        pill={false}
                        onClick={handleReset}
                    >
                        <span className="text-lg">🎭</span>
                    </Button>
                    <Button color='secondary' variant='ghost' size='lg' uniform pill={false} iconSize='lg' className='lg:hidden'>
                        <X />
                    </Button>
                </div>
                <div className="flex items-center justify-between p-3 pb-0 flex-shrink-0">
                    <div className="flex items-center gap-2 pl-2">
                        <h5 className="text-secondary mb-1">History</h5>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1 overflow-x-hidden">
                    {history.length === 0 && (
                        <div className="text-tertiary text-sm text-center mt-6">
                            No history yet.
                        </div>
                    )}
                    {history.map((item) => (
                        <Button
                            color='secondary' variant='ghost' size='lg' pill={false}
                            key={item.id}
                            onClick={() => handleSelectHistory(item)}
                            className='text-left'
                        >
                            <p className="truncate flex-1 text-sm  transition-colors">
                                {item.text}
                            </p>
                            <Button
                                color="secondary"
                                size="sm"
                                uniform
                                pill={false}
                                variant="ghost"
                                iconSize='sm'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteHistory(item.id)
                                }}
                                aria-label="Delete item"
                            >
                                <Delete />
                            </Button>
                        </Button>
                    ))}
                </div>

                <div className="p-3 border-t border-default flex-shrink-0 flex items-center gap-2">
                    <SidebarMenu />
                </div>
            </div>
        </>
    )
}

