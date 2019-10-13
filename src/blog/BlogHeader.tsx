import React from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaHome, FaGitlab, FaGithub, FaBitbucket } from "react-icons/fa";

import Header from "../home/_components/Header";

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
