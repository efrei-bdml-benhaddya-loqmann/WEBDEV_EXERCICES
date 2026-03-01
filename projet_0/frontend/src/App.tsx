import { useEffect, useState } from 'react'
import { SidebarMenuMobile } from '@openai/apps-sdk-ui/components/Icon'
import { Sidebar } from './components/Sidebar'
import { MainContent, HeroTitle } from './components/MainContent'
import { InputArea } from './components/InputArea'
import type { SentimentResult } from './types'
import { AnalysisArea } from './components/AnalysisArea'

import { analyzeText, clearHistory, deleteHistoryItem, getHistory } from './services/api'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  // App states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedText, setSubmittedText] = useState<string | null>(null)
  const [result, setResult] = useState<SentimentResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // History
  const [history, setHistory] = useState<SentimentResult[]>([])
  useEffect(() => {
    getHistory()
      .then((data) => {
        setHistory(data)
      })
      .catch((error) => {
        setError(error)
      });
  }, [result]) // update the history when the result is updated

  // Is Hero visible? Only when there's no submitted text and no result/error
  const showHero = !submittedText && !result && !error

  const handleSubmit = () => {
    if (!inputText.trim()) return

    const textToSubmit = inputText
    setSubmittedText(textToSubmit)
    setInputText('')
    setIsSubmitting(true)
    setResult(null)
    setError(null)

    // Provide smooth UI feedback
    setTimeout(async () => {
      setIsSubmitting(false)
      const newResult: SentimentResult = await analyzeText(textToSubmit);
      setResult(newResult)
      // setHistory(prev => [newResult, ...prev])
    }, 1500)
  }

  const handleSelectHistory = (item: SentimentResult) => {
    setSubmittedText(item.text)
    setResult(item)
    setError(null)
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistory([]) // update the local history state
  }

  const handleDeleteHistory = (id: string) => {
    deleteHistoryItem(id)
    setHistory(prev => prev.filter(item => item.id !== id)) // update the local history state
  }

  return (
    <div className="flex h-[100dvh] w-full bg-surface dark:bg-[#000000] text-default overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        history={history}
        onSelect={handleSelectHistory}
        onClear={handleClearHistory}
        onDelete={handleDeleteHistory}
      />

      <MainContent>
        {/* Top Mobile Gradient Overlay */}
        <div className="lg:hidden absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/10 dark:from-black/40 to-transparent pointer-events-none z-10" />

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 bg-transparent shrink-0 relative z-20">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm bg-white dark:bg-[var(--gray-200)] dark:border dark:border-[var(--gray-150)] hover:opacity-80 transition-opacity"
            onClick={() => setIsSidebarOpen(true)}
          >
            <SidebarMenuMobile className="size-5 text-primary dark:text-primary" />
          </button>
          <div className="flex items-center px-4 h-10 rounded-full shadow-sm bg-white dark:bg-[var(--gray-200)] dark:border dark:border-[var(--gray-150)]">
            <span className="font-semibold text-sm text-primary dark:text-primary">Sentiment Analyzer</span>
          </div>
        </div>

        {showHero ? (
          <HeroTitle />
        ) : (
          <AnalysisArea
            userText={submittedText}
            result={result}
            isLoading={isSubmitting}
            error={error}
          />
        )}

        <div className="relative z-20 shrink-0 w-full mt-auto">
          <InputArea
            text={inputText}
            setText={setInputText}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>

        {/* Bottom Mobile Gradient Overlay */}
        <div className="lg:hidden absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/10 dark:from-black/40 to-transparent pointer-events-none z-10" />
      </MainContent>
    </div>
  )
}

export default App
