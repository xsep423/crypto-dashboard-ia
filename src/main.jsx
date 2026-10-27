import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProfileProvider } from './context/UserProfileContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProfileProvider>
        <AccessibilityProvider>
          <App />
        </AccessibilityProvider>
      </UserProfileProvider>
    </BrowserRouter>
  </StrictMode>,
)