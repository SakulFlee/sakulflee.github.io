import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './home/Home';
import Blog from './blog/Blog';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact={true}   path="/"      component={Home} />
      <Route exact={false}  path="/blog"  component={Blog} />
    </Router>
  );
}
export default App;
