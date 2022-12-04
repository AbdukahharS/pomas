import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { ProfileContextProvider } from './context/ProfileContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
