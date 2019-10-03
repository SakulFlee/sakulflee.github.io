import React from "react";
import {Link} from 'react-router-dom';
import {FaExternalLinkAlt} from 'react-icons/fa';

import Cube from '../../_components/Cube';
import Line from '../../_components/Line';

import './TitlePage.scss';

class TitlePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Link to="/blog" id="blog-link">Blog <FaExternalLinkAlt/></Link>

        <Cube size={48} left={80} top={20} colour={"magenta"} animation={"pulse 1s infinite"} />
        <Cube size={64} left={82} top={44} colour={"yellowgreen"} animation={"color 15s infinite"} />
        <Cube size={72} left={62} top={30} colour={"orange"} animation={"glow 3s infinite"} />
        <Line degree={150} />

        <section className="hero is-dark is-fullheight">
          <div className="hero-body">
            <div className="container" id="title-text">
              <h1 className="title has-text-danger is-family-code">
                Hello, world!
              </h1>
              <h2 className="subtitle">I am Lukas Weber | @Sakul6499.</h2>
              <p className="is-family-code">Software Engineer Student</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default TitlePage;
