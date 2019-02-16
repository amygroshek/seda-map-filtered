import React from 'react'
import { Route, Link } from 'react-router-dom'
import Header from '../components/base/Header';
import MapView from './map'
import withRoot from '../withRoot';
import Paper from '@material-ui/core/Paper';

const App = () => (
  <div className="app__container">
    <Header>
      <Link to="/">
        <img 
          alt="Educational Opportunity Project" 
          src="/assets/img/seda-light.svg"
        />
      </Link>
    </Header>

    <main className="body">
      <Route exact path="/" component={ MapView } />
    </main>
  </div>
)

export default withRoot(App)
