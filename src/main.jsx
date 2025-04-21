import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App.jsx'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

console.log('🚀 React is trying to render...');
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
)