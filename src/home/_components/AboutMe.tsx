import React from "react";

import Tag from "../../_components/Tag";

import "./AboutMe.scss";

class AboutMe extends React.Component {
  render() {
    return (
      <section className="columns has-text-centered" id="AboutMe">
        <article className="column">
          <u className="is-half is-family-code has-text-underlined">About me</u>
        </article>
        <aside className="column">
          <u
            className="is-half is-family-code has-text-underlined tooltip is-tooltip-multiline is-tooltip-active is-tooltip-info"
            data-tooltip="Hover over my tags!"
          >
            Skills
          </u>

          <h1 className="is-size-5 has-text-black">Languages I speak:</h1>
          <section className="column is-mobile is-centered tags">
            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-success"
              size="is-large"
              tooltip="My primary language."
              text="German"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-large"
              tooltip="My secondary language! B1 LCCI Business Certificate/B2 school english"
              text="English"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="JVM languages and tools like Java, Kotlin, Maven and Gradle"
              text="JVM"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Native"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="The classic native tools"
              text="C/C++"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Web"
              colorClass="is-link"
              tooltipClass="is-tooltip-link"
              size="is-large"
              tooltip="HTML5, CSS4, JS9, PHP, Ruby, ..."
              text="WEB"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Rust"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="Rust focuses on security, while maintaining speeds similar or sometimes even better than C/C++/Native solutions!"
              text="Rust"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Office"
              colorClass="is-dark"
              tooltipClass="is-tooltip-dark"
              size="is-medium"
              tooltip="Focus on writing instead of designing office documents"
              text="LaTeX"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Scripting-Languages"
              colorClass="is-warning"
              textColor="has-text-black"
              tooltipClass="is-tooltip-warning"
              size="is-small"
              tooltip="[Z|Ba]SH, Python, Ruby, ..."
              text="Scripting languages"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Modelling"
              colorClass="is-warning"
              textColor="has-text-black"
              tooltipClass="is-tooltip-warning"
              size="is-small"
              tooltip="UML, Graphviz/Dot, ..."
              text="Modelling languages"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="I am studying in the netherlands! Basic dutch is a must, although I mainly only understand ..."
              text="Dutch"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="Not fluent but and very interesting and different language!"
              text="Japanese"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="Third language learned in school. Absolutely not fluent but I understand it on a basic level."
              text="Spanish"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#JVM-and-similar"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-small"
              tooltip="VC++, C#, F#, VB"
              text=".NET"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Native"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-small"
              tooltip="Mainly GAS (intel; gcc output) and NASM"
              text="Assembly"
              multiLine={true}
            />
          </section>
        </aside>
      </section>
    );
  }
}
export default AboutMe;
