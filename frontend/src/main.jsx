import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Web3provider from './context/Web3-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3provider>
  </StrictMode>,
)