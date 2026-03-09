import { Delete } from '@openai/apps-sdk-ui/components/Icon'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { useAppStore } from '../../../store/useAppStore'

export function HistoryList() {
    const { history, handleSelectHistory, handleDeleteHistory } = useAppStore()

    return (
        <>
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
                    <div
                        key={item.id}
                        onClick={() => handleSelectHistory(item)}
                        className="text-left py-2 pr-2 pl-3 rounded-lg hover:bg-surface-tertiary transition-colors flex items-center justify-between gap-3 w-full group cursor-pointer"
                    >

                        {/* <Button
                    //     color='secondary' variant='ghost' size='lg' pill={false}
                    //     key={item.id}
                    //     onClick={() => handleSelectHistory(item)}
                    //     className='text-left'
                    // > */}

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
                        {/* </Button> */}
                    </div>
                ))}
            </div>
        </>
    )
}
