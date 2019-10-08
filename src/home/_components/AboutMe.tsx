import React from "react";

import TimeLine from "./TimeLine";
import Skills from './Skills';

import "./AboutMe.scss";

class AboutMe extends React.Component {
  render() {
    return (
      <section className="columns has-text-centered" id="AboutMe">
        <article className="column">
          <u className="is-half is-family-code has-text-underlined">About me</u>
          <p>Hello there!</p>
          <TimeLine/>
        </article>
        <Skills/>
      </section>
    );
  }
}
export default AboutMe;
