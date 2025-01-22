import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'


let history;
try {
    history = JSON.parse(sessionStorage.getItem('history'));
    if(!Array.isArray(history) || history.length ===0){
        history = [];
    }
}
catch (err){
    history = [];
}
sessionStorage.setItem('history', JSON.stringify(history));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
