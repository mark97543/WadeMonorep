import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WadeAuthProvider } from '@wade-usa/auth'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WadeAuthProvider>
        <App/>
      </WadeAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
