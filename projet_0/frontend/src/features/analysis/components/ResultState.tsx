import { useState } from 'react'
import { Input } from '@openai/apps-sdk-ui/components/Input'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import type { SentimentResult } from '../../../types'
import { ResultActions } from './ResultActions';
import { SentimentBadge } from './SentimentBadge'

export function ResultState({
  result,
  onCopy,
  onRegenerate,
  onScore
}: {
  result: SentimentResult;
  onCopy: (text: string) => void
  onRegenerate: (text: string) => void
  onScore: (id: string, feedback: 'positive' | 'negative' | 'none') => void
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(result.text);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Cancel edit - reset text
      setEditText(result.text);
    }
    setIsEditing(!isEditing);
  }

  const handleSubmitEdit = () => {
    if (editText.trim() && editText !== result.text) {
      onRegenerate(editText);
    }
    setIsEditing(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitEdit();
    } else if (e.key === 'Escape') {
      handleToggleEdit();
    }
  }

  return (
    <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 group">
      <div className="flex flex-col items-start mt-1 w-full gap-3">
        {isEditing ? (
          <div className="w-full max-w-2xl">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="soft"
              size="lg"
              gutterSize="sm"
              autoFocus
              placeholder="Edit text..."
            />
          </div>
        ) : (
          <SentimentBadge
            color={result.sentiment === 'positive' ? 'success' : result.sentiment === 'negative' ? 'danger' : 'secondary'}
          >
            {result.text}
          </SentimentBadge>
        )}

        <div className="flex gap-4 items-center w-full max-w-2xl">
          {isEditing ? (
            <div className="flex justify-end gap-2 w-full">
              <Button
                color="primary"
                size="md"
                variant="soft"
                onClick={handleToggleEdit}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                size="md"
                variant="solid"
                onClick={handleSubmitEdit}
              >
                Submit
              </Button>
            </div>
          ) : (
            <>
              <ResultActions
                result={result}
                isEditing={isEditing}
                onCopy={() => onCopy(result.text)}
                onEdit={handleToggleEdit}
                onRegenerate={() => onRegenerate(result.text)}
                onScore={(feedback) => onScore(result.id, feedback)}
                onMore={() => { }}
              />
              <span className="text-md text-secondary ml-auto lg:ml-0">
                {(result.score * 100).toFixed(0)}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
