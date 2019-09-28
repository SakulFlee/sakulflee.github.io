import React from "react";

import Cube from '../../_components/Cube';
import Line from '../../_components/Line';

class TitlePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Cube left={70} top={42} colour={"magenta"} animation={"pulse 1s infinite"} />
        <Cube left={77} top={60} colour={"yellowgreen"} animation={"hover 15s infinite"} />
        <Cube left={80} top={36} colour={"orange"} animation={"glow 5s infinite"} />
        <Line degree={130} />

        <section className="hero is-dark is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-danger is-family-code">
                Hello, world!
              </h1>
              <h2 className="subtitle">I am Lukas Weber | @Sakul6499.</h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default TitlePage;
