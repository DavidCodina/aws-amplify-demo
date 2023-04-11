// Third-party imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Custom imports
import type {} from 'styled-components/cssprop'

import 'styles/main.scss'
import App from './App'

/* ========================================================================
                           
======================================================================== */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
