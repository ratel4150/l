// src\main.tsx

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApiProvider } from './context/ApiContext.tsx'

createRoot(document.getElementById('root')!).render(
  
    <ApiProvider>
      <App />
    </ApiProvider>
  
)
