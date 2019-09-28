import React from "react";
import { Link } from "react-router-dom";

class AboutMe extends React.Component {
  render() {
    return (
      <section>
        <p>AboutMe</p>

        <Link to="/">Home</Link>
        <Link to="/Blog">Blog</Link>
      </section>
    );
  }
}
export default AboutMe;
