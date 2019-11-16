import React from "react";
import {Link} from "react-router-dom";
import {MdSearch} from "react-icons/md";
import {FaBitbucket, FaGithub, FaGitlab, FaHome, FaLinkedinIn} from "react-icons/fa";

import Header from "../../shared/Header";

import "./BlogHeader.scss";

export default class BlogHome extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <Header maxHeightInPercent={75} />

        <div id="blog-icons">
          <Link to="/">
            <FaHome />
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

        <div id="container">
          <div className="field" id="search">
            <h1 className="title is-size-2 has-text-danger">
              Welcome to my blog!
            </h1>
            <label className="label is-normal has-text-normal has-text-white">
              Search for posts based on title, tag or date
            </label>
            <div className="control has-icons-left">
              <input
                className="input is-medium is-rounded"
                type="text"
                placeholder="Search"
                id="blog-search-input"
              />
              <span className="icon is-medium is-left">
                <MdSearch />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
