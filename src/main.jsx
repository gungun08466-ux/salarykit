import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App footerYear={rootElement.dataset.footerYear} />
    </BrowserRouter>
  </React.StrictMode>
)

if (rootElement.dataset.prerenderedRoute === '/tools/salary-hike') {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
