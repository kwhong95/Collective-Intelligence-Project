import React, { useEffect } from 'react'
import Search from './pages/Search';
import User from './pages/User';
import { Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);
  return (
    <div className="appContainer">
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
    </div>
  )
}

export default App;
