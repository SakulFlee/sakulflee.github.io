import React from "react";
import {Link} from "react-router-dom";

import BlogPostJSONData from "./BlogPostJSONData";

import "./BlogPosts.scss";

type BlogPostsProperties = {
  search?: string;
};

type BlogPostsState = {
  data: BlogPostJSONData[];
};

export default class BlogPosts extends React.Component<BlogPostsProperties,
    BlogPostsState> {
  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch("/api/blog/posts.json");
      let oldDate: BlogPostJSONData[] = await response.json();
      let newData: BlogPostJSONData[] = [];
      for (let old of oldDate) {
        let fetchedPost = await BlogPostJSONData.FullFetch(old);
        newData.push(fetchedPost);
      }
      this.setState({
        data: newData.sort((a, b) => (a.id < b.id ? 1 : -1))
      });
    } catch (error) {
      console.log(error);
    }
  }

  makePost(postData: BlogPostJSONData): JSX.Element {
    return (
        <Link key={`postID-${postData.id}`} to={`/blog/${postData.id}`} className="column">
          <article className="message is-dark">
            <div className="message-header">
              <p>{BlogPostJSONData.GetTitle(postData)}</p>
            </div>
            <div className="message-body">{postData.description}</div>
          </article>
        </Link>
    );
  }

  makePostRows(postData: BlogPostJSONData[], size: number): JSX.Element {
    postData.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });

    let rows: JSX.Element[] = [];
    let posts: JSX.Element[] = [];
    let counter = 0;
    for (let i = postData.length; i >= 0; i--) {
      let data = postData[i];
      if (data === null || data === undefined || !data.finished) continue;

      let match = false;
      if (this.props.search !== null) {
        let search = this.props.search!.toLowerCase();
        if (
            BlogPostJSONData.GetTitle(data)
                .toLowerCase()
                .includes(search)
        ) {
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
        rows.push(<section key={`row-${rows.length}`} className="columns">{posts}</section>);
        posts = [];
        counter = 0;
      }

      let postJSX = this.makePost(data);
      posts.push(postJSX);
    }

    // Handle rest/leftovers
    if (posts.length !== 0) {
      rows.push(<section key={`row-${rows.length}`} className="columns">{posts}</section>);
    }

    // Handle no rows (=no posts)
    if (rows.length === 0) {
      let post = this.makePost(BlogPostJSONData.CreateNothingFoundPost());
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
