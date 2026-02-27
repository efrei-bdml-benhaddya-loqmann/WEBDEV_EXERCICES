import { useState } from 'react'
import { SidebarMenuMobile } from '@openai/apps-sdk-ui/components/Icon'
import { Sidebar } from './components/Sidebar'
import { MainContent, HeroTitle } from './components/MainContent'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'
import type { SentimentResult } from './types'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  // App states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedText, setSubmittedText] = useState<string | null>(null)
  const [result, setResult] = useState<SentimentResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Mock History
  const [history, setHistory] = useState<SentimentResult[]>([
    {
      id: '1',
      text: "I really love the new design!",
      sentiment: "positive",
      score: 0.98,
      timestamp: 1700000000000
    },
    {
      id: '2',
      text: "This is a terrible experience.",
      sentiment: "negative",
      score: 0.95,
      timestamp: 1690000000000
    },
    {
      id: '3',
      text: "The weather is okay today.",
      sentiment: "neutral",
      score: 0.81,
      timestamp: 1680000000000
    }
  ])

  // Is Hero visible? Only when there's no submitted text and no result/error
  const showHero = !submittedText && !result && !error

  const handleSubmit = () => {
    // Artificial mock to test UI
    setSubmittedText(inputText)
    setInputText('')
    setIsSubmitting(true)
    setResult(null)
    setError(null)

    setTimeout(() => {
      setIsSubmitting(false)
      // Random result
      const newResult: SentimentResult = {
        id: Math.random().toString(),
        text: submittedText || inputText,
        sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.3 ? 'negative' : 'neutral',
        score: Math.random() * (0.99 - 0.45) + 0.45,
        timestamp: Date.now()
      }
      setResult(newResult)
      setHistory(prev => [newResult, ...prev])
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
    setHistory([])
  }

  return (
    <div className="flex h-[100dvh] w-full bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        history={history}
        onSelect={handleSelectHistory}
        onClear={handleClearHistory}
      />

      <MainContent>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-3 border-b border-gray-200 dark:border-gray-800 shrink-0 ease-in-out">
          <button
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <SidebarMenuMobile className="size-6 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="font-semibold ml-2 text-lg">Sentiment Analyzer</span>
        </div>

        {showHero ? (
          <HeroTitle />
        ) : (
          <ChatArea
            userText={submittedText}
            result={result}
            isLoading={isSubmitting}
            error={error}
          />
        )}

        <InputArea
          text={inputText}
          setText={setInputText}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </MainContent>
    </div>
  )
}

export default App
