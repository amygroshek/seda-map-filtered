import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MapView from './map'
import withRoot from '../withRoot';

const App = () => (
  <div className="app__container">
    <main className="body">
      <Route exact path="/" render={() => (<Redirect to="/counties/avg/all/3.5/38/-97"/>)} />
      <Route path="/:region/:metric/:demographic/:zoom/:lat/:lon/:locations?" component={ MapView } />
    </main>
  </div>
)

export default withRoot(App)
