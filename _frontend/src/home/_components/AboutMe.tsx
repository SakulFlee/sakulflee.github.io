import React from "react";

import TimeLine from "./TimeLine";
import Skills from "./Skills";

import "./AboutMe.scss";

class AboutMe extends React.Component {
  render() {
    let birthday: Date = new Date("1999-04-06");
    let now: Date = new Date();
    let years = now.getFullYear() - birthday.getFullYear();
    return (
      <section className="columns has-text-centered" id="AboutMe">
        <article className="column">
          <div>
            <u className="is-half is-family-code has-text-underlined">
              About me
            </u>
            <p>
              Hello there! My name is Lukas Weber and I am {years} years old.
              Currently, I live in Germany, but I study{" "}
              <i>Software Engineering</i> in the Netherlands. I am interested in
              a lot of topics, mainly IT related, which is also why I taught
              myself a lot of skills and am constantly learning new things!
            </p>
            <br />
            <p>
              Interested? Send me an <a href="mailto:me@sakul6499.de">e-mail</a>
              !
            </p>
            <p>
              I can also be found on{" "}
              <a href="https://keybase.io/sakul6499">KeyBase</a> and{" "}
              <a href="https://t.me/sakul6499">Telegram</a>.
            </p>
          </div>
          <TimeLine />
        </article>
        <Skills />
      </section>
    );
  }
}
export default AboutMe;
