import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { Sparkles, Warning, Spin } from '@openai/apps-sdk-ui/components/Icon'
import type { SentimentResult } from '../types'

export function ChatArea({
    userText,
    result,
    isLoading,
    error
}: {
    userText: string | null
    result: SentimentResult | null
    isLoading: boolean
    error: string | null
}) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-16 flex flex-col gap-8 w-full">
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-6 lg:mt-10">

                {/* User Message */}
                {userText && (
                    <div className="flex justify-end break-words w-full group animate-in slide-in-from-bottom-2">
                        <div className="bg-[#f4f4f4] dark:bg-[#2f2f2f] text-gray-900 dark:text-gray-100 px-5 py-3 rounded-2xl max-w-[85%] lg:max-w-[75%] text-left">
                            {userText}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121] flex items-center justify-center flex-shrink-0">
                            <Spin className="size-4 animate-spin text-gray-500" />
                        </div>
                        <div className="w-full pt-2">
                            <div className="animate-pulse bg-gray-200 dark:bg-[#2f2f2f] h-3 w-32 rounded mb-3"></div>
                            <div className="animate-pulse bg-gray-200 dark:bg-[#2f2f2f] h-3 w-64 rounded"></div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="flex items-start gap-4 text-red-600 dark:text-red-400">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                            <Warning className="size-4" />
                        </div>
                        <div className="flex flex-col gap-1 mt-1 text-sm">
                            <span className="font-semibold text-base">Error rendering sentiment</span>
                            <span className="opacity-90">{error}</span>
                        </div>
                    </div>
                )}

                {/* Result State */}
                {result && !isLoading && !error && (
                    <div className="flex items-start gap-4 animate-in fade-in duration-300">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="size-4" />
                        </div>
                        <div className="flex flex-col items-start mt-1 w-full gap-3">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Sentiment Score</span>

                            <div className="flex gap-4 items-center">
                                <Badge
                                    color={result.sentiment === 'positive' ? 'success' : result.sentiment === 'negative' ? 'danger' : 'secondary'}
                                    size="lg"
                                    variant="soft"
                                >
                                    {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                                </Badge>

                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Confidence: {(result.score * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
