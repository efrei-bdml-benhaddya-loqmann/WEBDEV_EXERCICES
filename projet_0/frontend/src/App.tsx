import { useEffect } from 'react'
import { SidebarMenuMobile } from '@openai/apps-sdk-ui/components/Icon'
import { Sidebar } from './components/layout/Sidebar'
import { MainContent, HeroTitle } from './components/layout/MainContent'
import { InputArea } from './features/analysis/components/InputArea'
import { AnalysisArea } from './features/analysis/components/AnalysisArea'
import { useAuth } from './contexts/AuthContext'
import Login from './features/auth/components/Login'
import { useAppStore } from './store/useAppStore'
import { useAnalysis } from './features/analysis/hooks/useAnalysis'




function App() {
  const { user, loading } = useAuth()

  const {
    setIsSidebarOpen,
    repeatPing,
    verifyStatus,
    fetchInferenceMode,
  } = useAppStore()

  const {
    submittedText,
    result,
    error
  } = useAnalysis()

  useEffect(() => {
    fetchInferenceMode()
  }, [fetchInferenceMode])

  useEffect(() => {
    if (!repeatPing) return
    verifyStatus()
    const intervalId = setInterval(verifyStatus, 30000)
    return () => clearInterval(intervalId)
  }, [repeatPing, verifyStatus])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface dark:bg-[#000000]">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const showHero = !submittedText && !result && !error

  return (
    <div className="flex h-[100dvh] w-full bg-surface dark:bg-[#000000] text-default overflow-hidden font-sans">

      <Sidebar />

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
          <AnalysisArea />
        )}

        <div className="relative z-20 shrink-0 w-full mt-auto">
          <InputArea />
        </div>

        {/* Bottom Mobile Gradient Overlay */}
        <div className="lg:hidden absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/10 dark:from-black/40 to-transparent pointer-events-none z-10" />
      </MainContent>
    </div>
  )
}

export default App
