import { X } from '@openai/apps-sdk-ui/components/Icon'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { SidebarMenu } from './SidebarMenu'
import { useAppStore } from '../../store/useAppStore'
import { HistoryList } from '../../features/history'

export function Sidebar() {
    const {
        isSidebarOpen,
        setIsSidebarOpen,
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
                    <Button color='secondary' variant='ghost' size='lg' uniform pill={false} iconSize='lg' className='lg:hidden' onClick={() => setIsSidebarOpen(false)}>
                        <X />
                    </Button>
                </div>
                <HistoryList />

                <div className="p-3 border-t border-default flex-shrink-0 flex items-center gap-2">
                    <SidebarMenu />
                </div>
            </div>
        </>
    )
}

