import React from "react";
import {Link} from "react-router-dom";
import {MdHome, MdKeyboardReturn, MdVerticalAlignTop} from "react-icons/md";

import BlogPostJSONData from "./BlogPostJSONData";
import Footer from "../../shared/Footer";

import "./BlogPost.scss";

type BlogProperties = {
  match: {
    params: {
      id?: number;
    };
  };
};

type BlogState = {
  data: BlogPostJSONData;
};

export default class BlogPosts extends React.Component<
  BlogProperties,
  BlogState
> {
  async componentDidMount(): Promise<void> {
    if (this.props.match.params.id == null) return;
    let blogPostData = await BlogPostJSONData.FetchByID(
      this.props.match.params.id!
    );
    this.setState({
      data: blogPostData
    });
  }

  makePost(data: BlogPostJSONData): JSX.Element {
    return (
      <div>
        {this.makeButtons()}
        {this.makePostHeader(data)}
        {this.makePostBody(data)}
      </div>
    );
  }

  makePostHeader(data: BlogPostJSONData): JSX.Element {
    return (
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{BlogPostJSONData.GetTitle(data)}</h1>
              <h2 className="subtitle">{data.shortDescription}</h2>
            {this.makeTagList(data)}
          </div>
        </div>
      </section>
    );
  }

  makePostBody(data: BlogPostJSONData): JSX.Element {
    return (
      <div
          className="content blog-body"
          dangerouslySetInnerHTML={{ __html: BlogPostJSONData.getHTMLData(data) }}
      />
    );
  }

  makeTagList(data: BlogPostJSONData): JSX.Element {
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

    const unfinishedMessage = (
      <div className="notification is-warning" id="warning">
        This post is not yet marked as finished. Thus it may be incomplete,
        wrong or broken.
        <br />
        Come back some time later!
      </div>
    );

    return (
      <div>
        {this.state.data.finished ? null : unfinishedMessage}
        {this.makePost(this.state.data)}
        <Footer />
      </div>
    );
  }
}
