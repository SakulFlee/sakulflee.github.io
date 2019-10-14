import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home/Home";
import BlogHome from "./blog/BlogHome";
import BlogPosts from "./blog/BlogPost";
import Credit from "./home/Credit";
import Legal from "./home/Legal";

const App: React.FC = () => {
  return (
    <Router>
      <Route exact={true} path="/credit" component={Credit} />
      <Route
        exact={true}
        path="/disclaimer_legal_and_privacy"
        component={Legal}
      />
      <Route exact={true} path="/blog" component={BlogHome} />
      <Route exact={false} path="/blog/:id" component={BlogPosts} />
      <Route exact={false} path="/" component={Home} />
    </Router>
  );
};
export default App;
