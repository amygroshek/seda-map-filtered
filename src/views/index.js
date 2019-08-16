import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import ExplorerView from './explorer'
import SandboxView from './sandbox';
import withRoot from '../withRoot';
import ChartEmbedView from './embed/ChartEmbedView';
import MapEmbedView from './embed/MapEmbedView';

const App = () => (
  <Switch>
    <Route exact path={`/`} render={() => (<Redirect to="/map/us/counties/avg/ses/all/3.5/38/-97"/>)} />
    <Route exact path={`/embed/chart/:highlightedState/:region/:xVar/:yVar/:zVar/:locations?`} component={ ChartEmbedView } />
    <Route exact path={`/embed/map/:region/:metric/:demographic/:zoom/:lat/:lon/:locations?`} component={ MapEmbedView } />
    <Route exact path={`/:view/:highlightedState/:region/:metric/:secondary/:demographic/:zoom/:lat/:lon/:locations?`} component={ ExplorerView } />

    <Route exact path={`/sandbox`} component={ SandboxView } />
  </Switch>
)

// #/embed/map/counties/avg/all/3.5/38/-97/:locations?

export default withRoot(App)
