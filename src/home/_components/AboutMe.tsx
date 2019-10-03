import React from "react";

import Tag from '../../_components/Tag';

import './AboutMe.scss';

class AboutMe extends React.Component {
  render() {
    return (
      <section className="columns has-text-centered" id="AboutMe">
        <article className="column">
          <u className="is-half is-family-code has-text-underlined">
            About me
          </u>
        </article>
        <aside className="column">
          <u className="is-half is-family-code has-text-underlined tooltip is-tooltip-multiline is-tooltip-active is-tooltip-info" data-tooltip="Hover over my tags!">
            Skills
          </u>
          <h1 className="is-size-5 has-text-black">Languages I speak:</h1>

          <Tag text="Test" tooltip="Hello, world!" linkTo="/"/>
        </aside>
      </section>
    );
  }
}
export default AboutMe;
