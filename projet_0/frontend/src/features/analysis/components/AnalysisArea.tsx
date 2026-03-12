import { SubmitState } from './SubmitState'
import { ErrorState } from './ErrorState'
import { ResultState } from './ResultState'

import { useAnalysis } from '../hooks/useAnalysis'

export function AnalysisArea() {
    const { 
        submittedText, 
        result, 
        isSubmitting, 
        error, 
        onCopy, 
        onRegenerate, 
        handleScore 
    } = useAnalysis()
    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-16 flex flex-col gap-8 w-full">
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 mt-6 lg:mt-10">

                {/* Initial User Message */}
                {submittedText && !result && !error && (
                    <SubmitState userText={submittedText} isLoading={isSubmitting} />
                )}

                {/* Error State */}
                {error && !isSubmitting && (
                    <ErrorState userText={submittedText} error={error} />
                )}

                {/* Result State */}
                {result && !isSubmitting && !error && (
                    <ResultState
                        result={result}
                        onCopy={onCopy}
                        onRegenerate={onRegenerate}
                        onScore={handleScore}
                    />
                )}

            </div>
        </div>
    )
}
