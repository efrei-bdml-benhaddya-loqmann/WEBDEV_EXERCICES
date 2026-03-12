import { useAppStore } from '@/store/useAppStore'
import { copyToClipboard } from '@/utils'

export function useAnalysis() {
    const {
        inputText,
        setInputText,
        isSubmitting,
        submittedText,
        result,
        error,
        performAnalysis,
        handleScore
    } = useAppStore()

    const handleFormSubmit = async () => {
        if (!inputText.trim() || isSubmitting) return
        const textToAnalyze = inputText
        setInputText('')
        await performAnalysis(textToAnalyze)
    }

    const onRegenerate = async (text?: string) => {
        const targetText = text || submittedText
        if (!targetText || isSubmitting) return
        await performAnalysis(targetText)
    }

    return {
        inputText,
        setInputText,
        isSubmitting,
        submittedText,
        result,
        error,
        handleFormSubmit,
        handleScore,
        onRegenerate,
        onCopy: copyToClipboard
    }
}
