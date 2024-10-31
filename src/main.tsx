import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/Router.tsx'
import Modal from './components/ui/modal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <Modal />
  </StrictMode>,
)
