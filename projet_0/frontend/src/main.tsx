import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppsSDKUIProvider } from '@openai/apps-sdk-ui/components/AppsSDKUIProvider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppsSDKUIProvider linkComponent="a">
      <App />
    </AppsSDKUIProvider>
  </StrictMode>,
)
