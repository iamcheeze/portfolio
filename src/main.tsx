import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapRouting } from './routes'
import './index.css'
import App from './App.tsx'

bootstrapRouting()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
