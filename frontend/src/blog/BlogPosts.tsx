import React from "react";
import { Link } from "react-router-dom";

import BlogPostData from "./data/BlogPostData";
import "./BlogPosts.scss";
import BlogPostsData from "./data/BlogPostsData";

type BlogPostsProperties = {
  search?: string;
};

type BlogPostsState = {
  blogPosts: BlogPostsData;
};

export default class BlogPosts extends React.Component<
  BlogPostsProperties,
  BlogPostsState
> {
  async componentDidMount() {
    let blogPosts = await BlogPostsData.QueryRecent();
    blogPosts = blogPosts.sort();

    this.setState({
      blogPosts: blogPosts
    });
  }

  makePost(postData: BlogPostData): JSX.Element {
    return (
      <Link
        key={`postID-${postData.getID}`}
        to={`/blog/${postData.getID}`}
        className="column"
      >
        <article className="message is-dark">
          <div className="message-header">
            <p>{postData.getCompiledTitle!}</p>
          </div>
          <div className="message-body">{postData.getShortDescription}</div>
          <div
            className="is-half has-text-right has-text-black"
            style={{ paddingRight: "8px" }}
          >
            Last updated on {new Date(postData.getPublishDate).toUTCString()}
          </div>
        </article>
      </Link>
    );
  }

  makePostRows(blogPostsData: BlogPostsData, size: number): JSX.Element {
    let blogPosts = blogPostsData.getBlogPosts;
    let rows: JSX.Element[] = [];
    let posts: JSX.Element[] = [];
    let counter = 0;
    for (let i = 0; i < blogPosts.length; i++) {
      let blogPost = blogPosts[i];

      counter++;
      if (counter === size - 1) {
        rows.push(
          <section key={`row-${rows.length}`} className="columns">
            {posts}
          </section>
        );
        posts = [];
        counter = 0;
      }

      let postJSX = this.makePost(blogPost);
      posts.push(postJSX);
    }

    // Handle rest/leftovers
    if (posts.length !== 0) {
      rows.push(
        <section key={`row-${rows.length}`} className="columns">
          {posts}
        </section>
      );
    }

    // Handle no rows (=no posts)
    if (rows.length === 0) {
      let post = this.makePost(BlogPostData.CreateNothingFoundPost());
      return <div>{post}</div>;
    } else {
      return <div>{rows}</div>;
    }
  }

  render(): JSX.Element {
    if (this.state == null) {
      return (
        <progress className="progress is-large is-info" max="100">
          Loading ...
        </progress>
      );
    } else {
      return <div id="posts">{this.makePostRows(this.state.blogPosts, 3)}</div>;
    }
  }
}
