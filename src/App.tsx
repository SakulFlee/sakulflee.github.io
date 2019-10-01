import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './home/Home';
import BlogPosts from './blog/BlogPosts';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact={true}   path="/"          component={Home}        />
      <Route exact={true}   path="/blog"      component={BlogPosts}   />
      <Route exact={false}  path="/blog/:id"  component={BlogPosts}   />
    </Router>
  );
}
export default App;
