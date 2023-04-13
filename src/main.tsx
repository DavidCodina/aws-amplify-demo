// Third-party imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

// Custom imports
import type {} from 'styled-components/cssprop'

import 'styles/main.scss'
import App from './App'

// The tutorial merely imported awsExports and did this:
//
// import awsExports from './aws-exports'
// Amplify.configure(awsExports)
//
// And that's also what's shown in the docs:
// https://docs.amplify.aws/start/getting-started/setup/q/integration/react/#set-up-frontend
//
// Unfortunately, that doesn't always work.
//   https://stackoverflow.com/questions/65196042/aws-amplify-rest-api-cannot-find-the-api
//   https://stackoverflow.com/questions/67375316/aws-amplify-api-does-not-exist
//
// The API request errors out, saying 'API amplifyRest1 does not exist'
// However, it DOES exist and has been pushed to AWS (look at API Gateway section)
//
// The larger issue here seems to be that aws-exports.js is not generating the correct data.
// This may be an issue with the Amplify CLI:
//   https://github.com/aws-amplify/amplify-cli/issues/8020
//   https://github.com/aws-amplify/amplify-cli/issues/8001
//
// What was actually the issue is that I previously moved the project folder, and this broke
// the projectPath. Solution: rerun amplify init.

Amplify.configure(awsExports)

/* ========================================================================
                           
======================================================================== */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
