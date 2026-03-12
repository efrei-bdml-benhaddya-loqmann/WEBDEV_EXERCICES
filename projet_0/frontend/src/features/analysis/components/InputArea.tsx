import { useRef } from 'react'
import type { SubmitEvent } from 'react'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { ArrowUp } from '@openai/apps-sdk-ui/components/Icon'
import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";
import { Input } from '@openai/apps-sdk-ui/components/Input'

import { useAnalysis } from '../hooks/useAnalysis'

export function InputArea() {
    const { inputText, setInputText, isSubmitting, handleFormSubmit } = useAnalysis()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e?: SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        handleFormSubmit()
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 lg:px-6 pb-6 pt-2 shrink-0">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="Enter text..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    pill
                    size='3xl'
                    endAdornment={
                        <Button
                            color={inputText.trim() ? "primary" : "secondary"}
                            variant="solid"
                            pill
                            uniform
                            size="md"
                            iconSize="lg"
                            disabled={!inputText.trim() || isSubmitting}
                            className={`-mr-3 transition-opacity ${!inputText.trim() ? 'opacity-40' : 'opacity-100'}`}
                            onClick={() => handleSubmit()}
                            type="button"
                        >
                            {isSubmitting ? <LoadingIndicator /> : <ArrowUp />}
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
