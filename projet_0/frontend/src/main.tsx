import './assets/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppsSDKUIProvider } from '@openai/apps-sdk-ui/components/AppsSDKUIProvider'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppsSDKUIProvider linkComponent="a">
        <App />
      </AppsSDKUIProvider>
    </AuthProvider>
  </StrictMode>,
)
