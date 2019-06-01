import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import ExplorerView from './explorer'
import ColorsView from './colors'
import withRoot from '../withRoot';

const App = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/map/us/counties/avg/all/3.5/38/-97"/>)} />
    <Route exact path="/colors/:highlightedState/:region/:metric/:demographic/:zoom/:lat/:lon/:color?" component={ ColorsView } />
    <Route exact path="/:view/:highlightedState/:region/:metric/:demographic/:zoom/:lat/:lon/:locations?" component={ ExplorerView } />
  </Switch>
)

export default withRoot(App)
