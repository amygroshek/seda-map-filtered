import React from 'react'
import { Route, Link } from 'react-router-dom'
import Map from '../map'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Map} />
    </main>
  </div>
)

export default App
