import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './home/Home';
import Skills from './home/Skills';
import BlogPosts from './blog/BlogPosts';
import Credit from './home/Credit';
import Legal from './home/Legal';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact={true}   path="/"          component={Home}        />
      <Route exact={true}   path="/skills"    component={Skills} />
      <Route exact={true}   path="/credit"    component={Credit}      />
      <Route exact={true}   path="/disclaimer_legal_and_privacy"  component={Legal} />
      <Route exact={true}   path="/blog"      component={BlogPosts}   />
      <Route exact={false}  path="/blog/:id"  component={BlogPosts}   />
    </Router>
  );
}
export default App;
