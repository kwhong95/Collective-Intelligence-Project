import React from 'react'
import Search from './pages/Search';
import User from './pages/User';
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="appContainer">
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
    </div>
  )
}

export default App;
