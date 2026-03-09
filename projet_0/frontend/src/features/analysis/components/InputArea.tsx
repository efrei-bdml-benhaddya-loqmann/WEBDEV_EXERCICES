import { useRef } from 'react'
import type { SubmitEvent } from 'react'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { ArrowUp } from '@openai/apps-sdk-ui/components/Icon'
import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";
import { Input } from '@openai/apps-sdk-ui/components/Input'

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

    return (
        <div className="w-full max-w-3xl mx-auto px-4 lg:px-6 pb-6 pt-2 shrink-0">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="Enter text..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    pill
                    size='3xl'
                    endAdornment={
                        <Button
                            color={text.trim() ? "primary" : "secondary"}
                            variant="solid"
                            pill
                            uniform
                            size="md"
                            iconSize="lg"
                            disabled={!text.trim() || isLoading}
                            className={`-mr-3 transition-opacity ${!text.trim() ? 'opacity-40' : 'opacity-100'}`}
                            onClick={() => handleSubmit()}
                            type="button"
                        >
                            {isLoading ? <LoadingIndicator /> : <ArrowUp />}
                        </Button>
                    }
                />
            </form>
            <div className="text-center mt-3 text-xs text-tertiary">
                Sentiments analyzed by AI might not be 100% accurate.
            </div>
        </div>
    )
}
