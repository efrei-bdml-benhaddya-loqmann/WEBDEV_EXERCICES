import type { SentimentResult } from '../../../types'
import { SubmitState } from './SubmitState'
import { ErrorState } from './ErrorState'
import { ResultState } from './ResultState'

export function AnalysisArea({
    userText,
    result,
    isLoading,
    error,
    onCopy,
    onRegenerate,
    onScore
}: {
    userText: string | null
    result: SentimentResult | null
    isLoading: boolean
    error: string | null
    onCopy: (text: string) => void
    onRegenerate: (text: string) => void
    onScore: (id: string, feedback: 'positive' | 'negative' | 'none') => void
}) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-16 flex flex-col gap-8 w-full">
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-6 lg:mt-10">

                {/* Initial User Message */}
                {userText && !result && !error && (
                    <SubmitState userText={userText} isLoading={isLoading} />
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <ErrorState userText={userText} error={error} />
                )}

                {/* Result State */}
                {result && !isLoading && !error && (
                    <ResultState
                        result={result}
                        onCopy={onCopy}
                        onRegenerate={onRegenerate}
                        onScore={onScore}
                    />
                )}

            </div>
        </div>
    )
}
