import type { SentimentResult } from '../types'
import { SubmitState } from './analysis/SubmitState'
import { LoadingState } from './analysis/LoadingState'
import { ErrorState } from './analysis/ErrorState'
import { ResultState } from './analysis/ResultState'

export function AnalysisArea({
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

                {/* Initial User Message */}
                {userText && !result && !error && (
                    <SubmitState userText={userText} isLoading={isLoading} />
                )}

                {/* Loading State Spinner */}
                {/* {isLoading && (
                    <LoadingState />
                )} */}

                {/* Error State */}
                {error && !isLoading && (
                    <ErrorState error={error} />
                )}

                {/* Result State */}
                {result && !isLoading && !error && (
                    <ResultState result={result} />
                )}

            </div>
        </div>
    )
}
