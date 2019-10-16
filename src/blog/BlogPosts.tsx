import React from "react";
import { Link } from "react-router-dom";

import BlogPostData from "./BlogPostData";

import "./BlogPosts.scss";

type BlogPostsProperties = {
  search?: string;
};

type BlogPostsState = {
  data: BlogPostData[];
};

export default class BlogPosts extends React.Component<
  BlogPostsProperties,
  BlogPostsState
> {
  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch("/api/blog/posts.json");
      const json = await response.json();

      let data: BlogPostData[] = json;
      this.setState({
        data: data.sort((a, b) => (a.id < b.id ? 1 : -1))
      });
    } catch (error) {
      console.log(error);
    }
  }

  makePost(postData: BlogPostData): JSX.Element {
    return (
      <Link to={`/blog/${postData.id}`} className="column">
        <article className="message is-dark">
          <div className="message-header">
            <p>{postData.title}</p>
          </div>
          <div className="message-body">{postData.description}</div>
        </article>
      </Link>
    );
  }

  makePostRows(postData: BlogPostData[], size: number): JSX.Element {
    let rows: JSX.Element[] = [];
    let posts: JSX.Element[] = [];
    let counter = 0;
    for (let i = 0; i < postData.length; i++) {
      let data = postData[i];
      let match = false;
      if (this.props.search !== null) {
        let search = this.props.search!.toLowerCase();
        if (data.title.toLowerCase().includes(search)) {
          match = true;
        }

        if (data.description.toLowerCase().includes(search)) {
          match = true;
        }

        if (
          data.tags
            .map(it => it.toLowerCase())
            .filter(it => it.includes(search)).length > 0
        ) {
          match = true;
        }
      }

      if (!match) continue;

      counter++;
      if (counter === size - 1) {
        rows.push(<section className="columns">{posts}</section>);
        posts = [];
        counter = 0;
      }

      let postJSX = this.makePost(data);
      posts.push(postJSX);
    }

    // Handle rest/leftovers
    if (posts.length !== 0) {
      rows.push(<section className="columns">{posts}</section>);
      posts = [];
    }

    // Handle no rows (=no posts)
    if (rows.length === 0) {
      let post = this.makePost(
        new BlogPostData(
          0,
          "No results!",
          "There are currently no posts available or the search didn't yield any result.",
          [],
          "",
          false,
          ""
        )
      );
      return <div>{post}</div>;
    } else {
      return <div>{rows}</div>;
    }
  }

  render(): JSX.Element {
    if (this.state == null)
      return (
        <progress className="progress is-large is-info" max="100">
          Loading ...
        </progress>
      );

    return <div id="posts">{this.makePostRows(this.state.data, 3)}</div>;
  }
}
