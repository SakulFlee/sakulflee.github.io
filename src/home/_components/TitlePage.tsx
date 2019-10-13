import React from "react";
import { Link } from "react-router-dom";
import { FaBold, FaGitlab, FaGithub, FaBitbucket } from "react-icons/fa";
import {FiChevronDown} from 'react-icons/fi';

import Header from "./Header";

import "./TitlePage.scss";

class TitlePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Header />

        <div id="title-text">
          <h1 className="title has-text-danger is-family-code">
            Hello, world!
          </h1>
          <h2 className="has-text-white subtitle">I am Lukas Weber | @Sakul6499.</h2>
          <p className="has-text-white is-family-code">Software Engineer Student</p>
        </div>

        <div id="icons">
          <Link to="/blog">
            <FaBold />
          </Link>
          <Link to="/blog">
            <FaGitlab />
          </Link>
          <Link to="/blog">
            <FaGithub />
          </Link>
          <Link to="/blog">
            <FaBitbucket />
          </Link>
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

        <div id="down-icon">
          <FiChevronDown />
          <p>Scroll me!</p>
        </div>
      </div>
    );
  }
}
export default TitlePage;
