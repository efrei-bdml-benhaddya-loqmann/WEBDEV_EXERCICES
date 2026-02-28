import type { SentimentResult } from '../../types'
import { SentimentBadge } from './SentimentBadge'

export function ResultState({
  result
}: {
  result: SentimentResult;
}) {
  return (
    <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col items-start mt-1 w-full gap-3">
        <SentimentBadge
          color={result.sentiment === 'positive' ? 'success' : result.sentiment === 'negative' ? 'danger' : 'secondary'}
        >
          {result.text}
        </SentimentBadge>

        <div className="flex gap-4 items-center">
          <span className="text-sm text-secondary">
            Confidence: {(result.score * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  )
}
