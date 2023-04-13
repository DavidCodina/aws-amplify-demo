// Third-party imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

// Custom imports
import type {} from 'styled-components/cssprop'

import 'styles/main.scss'
import App from './App'

// https://docs.amplify.aws/start/getting-started/setup/q/integration/react/#set-up-frontend
Amplify.configure(awsExports)

/* ========================================================================
                           
======================================================================== */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
