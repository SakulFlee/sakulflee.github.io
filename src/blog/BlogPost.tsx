import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdKeyboardReturn, MdVerticalAlignTop } from "react-icons/md";

import BlogPostData from "./BlogPostData";
import Footer from "../home/_components/Footer";

import "./BlogPost.scss";

type BlogProperties = {
  match: {
    params: {
      id?: number;
    };
  };
};

type BlogState = {
  data: BlogPostData;
};

export default class BlogPosts extends React.Component<
  BlogProperties,
  BlogState
> {
  async componentDidMount(): Promise<void> {
    if (this.props.match.params.id == null) return;
    let blogPostData = await BlogPostData.FetchByID(
      this.props.match.params.id!
    );
    this.setState({
      data: blogPostData
    });
  }

  makePost(data: BlogPostData): JSX.Element {
    return (
      <div>
        {this.makeButtons()}
        {this.makePostHeader(data)}
        {this.makePostBody(data)}
      </div>
    );
  }

  makePostHeader(data: BlogPostData): JSX.Element {
    return (
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.title}</h1>
            <h2 className="subtitle">{data.description}</h2>
            {this.makeTagList(data)}
          </div>
        </div>
      </section>
    );
  }

  makePostBody(data: BlogPostData): JSX.Element {
    return (
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: data.htmlData! }}
      />
    );
  }

  makeTagList(data: BlogPostData): JSX.Element {
    var listElements = data.tags.map((tag, index) => (
      <li key={index} className="tag is-light">
        {tag}
      </li>
    ));
    return (
      <ul className="column is-mobile is-centered tags">{listElements}</ul>
    );
  }

  makeButtons(): JSX.Element {
    return (
      <div>
        <Link to="" className="icon" id="icon-home">
          <MdHome />
        </Link>
        <div
          className="icon fake-link"
          id="icon-return"
          onClick={e => window.history.back()}
        >
          <MdKeyboardReturn />
        </div>
        <div
          className="icon fake-link"
          id="icon-top"
          onClick={e => window.scrollTo(0, 0)}
        >
          <MdVerticalAlignTop />
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    if (this.state == null)
      return (
        <progress className="progress is-large is-info" max="100">
          Loading ...
        </progress>
      );

    return (
      <div>
        {this.state.data.finished ? (
          <div className="notification is-warning" id="warning">
            This part of the website is still under development. You may
            encounter bugs, be warned!
          </div>
        ) : (
          ""
        )}
        {this.makePost(this.state.data)}
        <Footer />
      </div>
    );
  }
}
