import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Rotas from './rotas/Rotas.jsx'
import { SalvosProvider } from './context/Context.jsx'
import { TTSContextProvider } from './context/TTSContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <SalvosProvider>
      <TTSContextProvider>
        <Rotas>
          <App />
        </Rotas>
      </TTSContextProvider>
    </SalvosProvider>
)
