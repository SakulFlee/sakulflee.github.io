import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDoneAll, MdWifiTethering, MdSync } from "react-icons/md";

import Header from "./Header";
import Cube from "../../_components/Cube";

import "./TitlePage.scss";

class TitlePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Header />

        <Link to="/blog" id="blog-link">
          Blog <FaExternalLinkAlt />
        </Link>

        <Cube
          size={48}
          left={80}
          top={20}
          colour={"magenta"}
          animation={"pulse 1s infinite"}
          icon={<MdSync />}
          iconColor={"lime"}
        />
        <Cube
          size={64}
          left={82}
          top={44}
          colour={"yellowgreen"}
          animation={"color 15s infinite"}
          icon={<MdWifiTethering />}
          iconColor={"lime"}
        />
        <Cube
          size={72}
          left={62}
          top={30}
          colour={"orange"}
          animation={"glow 3s infinite"}
          icon={<MdDoneAll />}
          iconColor={"lime"}
        />

        <div id="title-text">
          <h1 className="title has-text-danger is-family-code">
            Hello, world!
          </h1>
          <h2 className="has-text-white subtitle">I am Lukas Weber | @Sakul6499.</h2>
          <p className="has-text-white is-family-code">Software Engineer Student</p>
        </div>

        <div id="binary">
          <p className="has-text-right has-text-grey">
            01001000 01100101 01101100 01101100 01101111 00101100
          </p>
          <p className="has-text-right has-text-grey">
            00100000 01110111 01101111 01110010 01101100 01100100
          </p>
          <p className="has-text-right has-text-grey">00100001</p>
        </div>
      </div>
    );
  }
}
export default TitlePage;
