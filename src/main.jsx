import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ShelfProvider } from './context/ShelfContext.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ShelfProvider>
        <App />
      </ShelfProvider>
    </AuthProvider>
  </React.StrictMode>
)
