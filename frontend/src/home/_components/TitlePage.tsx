import React from "react";
import {Link} from "react-router-dom";
import {FaBitbucket, FaBold, FaGithub, FaGitlab, FaLinkedinIn} from "react-icons/fa";
import {FiChevronDown} from "react-icons/fi";
import {BrowserView} from "react-device-detect";

import Header from "../../shared/Header";

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
          <h2 className="has-text-white subtitle">
            I am Lukas Weber | @Sakul6499.
          </h2>
          <p className="has-text-white is-family-code">
            Software Engineer Student
          </p>
        </div>

        <div id="icons">
          <Link to="/blog">
            <FaBold />
          </Link>
          <a href="https://gitlab.com/Sakul6499">
            <FaGitlab />
          </a>
          <a href="https://github.com/Sakul6499">
            <FaGithub />
          </a>
          <a href="https://bitbucket.org/%7Be556a531-5d5f-4ab9-a76d-bfc3043af83f%7D/">
            <FaBitbucket />
          </a>
          <a href="https://www.linkedin.com/in/lukaswebersakul6499">
            <FaLinkedinIn />
          </a>
        </div>

        <BrowserView>
          <div id="binary">
            <p className="has-text-right has-text-grey">
              01001000 01100101 01101100 01101100 01101111 00101100
            </p>
            <p className="has-text-right has-text-grey">
              00100000 01110111 01101111 01110010 01101100 01100100
            </p>
            <p className="has-text-right has-text-grey">00100001</p>
          </div>
        </BrowserView>

        <div id="down-icon">
          <FiChevronDown />
          <p>Scroll me!</p>
        </div>
      </div>
    );
  }
}
export default TitlePage;