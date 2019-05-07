import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MapView from './map'
import withRoot from '../withRoot';
import ScatterplotView from './scatterplot'

const App = () => (
  <div className="app__container">
    <main className="body">
      <Route exact path="/" render={() => (<Redirect to="/us/counties/avg/all/3.5/38/-97"/>)} />
      <Route path="/:highlightedState/:region/:metric/:demographic/:zoom/:lat/:lon/:locations?" component={ MapView } />
      <Route path="/scatterplot" component={ ScatterplotView } />
      {/* <Route path="/:section/:highlightedState/:region/:metric/:demographic/:zoom/:lat/:lon/:locations?" component={ SingleView } /> */}
    </main>
  </div>
)

export default withRoot(App)
