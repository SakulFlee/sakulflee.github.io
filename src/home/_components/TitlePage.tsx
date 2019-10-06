import React from "react";
import {Link} from 'react-router-dom';
import {FaExternalLinkAlt} from 'react-icons/fa';

import Cube from '../../_components/Cube';

import './TitlePage.scss';

class TitlePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Link to="/blog" id="blog-link">Blog <FaExternalLinkAlt/></Link>

        <Cube size={48} left={80} top={20} colour={"magenta"} animation={"pulse 1s infinite"} />
        <Cube size={64} left={82} top={44} colour={"yellowgreen"} animation={"color 15s infinite"} />
        <Cube size={72} left={62} top={30} colour={"orange"} animation={"glow 3s infinite"} />

        <section className="hero is-dark is-fullheight" id="title-page">
          <div className="hero-body">
            <div className="container" id="title-text">
              <h1 className="title has-text-danger is-family-code">
                Hello, world!
              </h1>
              <h2 className="subtitle">I am Lukas Weber | @Sakul6499.</h2>
              <p className="is-family-code">Software Engineer Student</p>

              <div id="binary">
              <p className="has-text-right has-text-grey">01001000 01100101 01101100 01101100 01101111 00101100</p>
              <p className="has-text-right has-text-grey">00100000 01110111 01101111 01110010 01101100 01100100</p>
              <p className="has-text-right has-text-grey">00100001</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default TitlePage;
