import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App.jsx'
import { BrowserRouter } from 'router-react-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
