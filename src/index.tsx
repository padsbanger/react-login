import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import createMockServer from './MockServer'

createMockServer()

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
