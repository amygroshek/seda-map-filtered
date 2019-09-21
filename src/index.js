import React from 'react'
import * as Sentry from '@sentry/browser';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './views'

import './index.css'

const target = document.querySelector('#root')

Sentry.init({dsn: "https://f90f123a6bf64cefbe56aaaa32f1f12d@sentry.io/1732354"});

render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
)
