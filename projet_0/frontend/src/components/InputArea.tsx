import { useRef } from 'react'
import type { KeyboardEvent, SubmitEvent } from 'react'
import { Textarea } from '@openai/apps-sdk-ui/components/Textarea'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { ArrowUp, Spin } from '@openai/apps-sdk-ui/components/Icon'
import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";

export function InputArea({
    text,
    setText,
    onSubmit,
    isLoading
}: {
    text: string
    setText: (s: string) => void
    onSubmit: () => void
    isLoading: boolean
}) {
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e?: SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        if (!text.trim() || isLoading) return
        onSubmit()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 lg:px-6 pb-6 pt-2 shrink-0">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative shadow-sm rounded-full bg-white dark:bg-[var(--gray-200)] border border-transparent dark:border-[var(--gray-150)] transition-all"
            >
                <Textarea
                    placeholder="Message Sentiment Analyzer..."
                    className="border-none bg-transparent resize-none py-4 px-5 pr-14 focus:outline-none focus:ring-0 max-h-48 overflow-y-auto text-base text-primary dark:text-primary rounded-full"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows={Math.min(6, Math.max(1, text.split('\n').length))}
                />
                <div className="absolute right-3 bottom-3">
                    <Button
                        color={text.trim() ? "primary" : "secondary"}
                        variant="solid"
                        pill
                        size="md"
                        iconSize="lg"
                        disabled={!text.trim() || isLoading}
                        className={`w-9 h-9 p-0 flex items-center justify-center transition-opacity ${!text.trim() ? 'opacity-40' : 'opacity-100'}`}
                        onClick={() => handleSubmit()}
                        type="button"
                    >
                        {isLoading ? <LoadingIndicator /> : <ArrowUp />}
                    </Button>
                </div>
            </form>
            <div className="text-center mt-3 text-xs text-tertiary">
                Sentiments analyzed by AI might not be 100% accurate.
            </div>
        </div>
    )
}
