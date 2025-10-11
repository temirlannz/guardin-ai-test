import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App.tsx'
import {Providers} from "@/app/providers.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
        <App />
    </Providers>
  </StrictMode>,
)
