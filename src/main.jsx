import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'

const history = JSON.parse(sessionStorage.getItem('history')) || [];
sessionStorage.setItem('history', JSON.stringify(history));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
