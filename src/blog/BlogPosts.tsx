import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdKeyboardReturn, MdVerticalAlignTop } from 'react-icons/md';

import './BlogPosts.scss';

const markdown = require("markdown").markdown;

type ResponseData = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  path: string;
  data?: string;
};

type BlogProperties = {
  match: {
    params: {
      id?: number;
    };
  };
};

type BlogState = {
  data: ResponseData[];
  isSingle: boolean;
};

class BlogPosts extends React.Component<BlogProperties, BlogState> {
  async componentDidMount(): Promise<void> {
    try {
      const postsResponse = await fetch("/api/posts.json");
      const postsJSON = await postsResponse.json();
      const postData: BlogState = {
        data: postsJSON,
        isSingle: false
      };

      if (this.props.match.params.id == null) {
        this.setState(postData);
      } else {
        let data = postData.data.filter(
          it => it.id === this.props.match.params.id
        );

        const mdResponse = await fetch("/api/blog/" + data[0].path);
        mdResponse.text().then(md => {
          console.log(md);
          if (md.includes("!DOCTYPE html")) {
            data[0] = {
              id: 0,
              name: "Invalid or not found!",
              description:
                "Either this post doesn't exist or an error happened in our backend.",
              tags: [],
              path: "",
              data:
                "Either this post doesn't exist or an error happened in our backend."
            };
          } else {
            var html = markdown.toHTML(md);
            data[0].data = html;
          }

          this.setState({
            data: data,
            isSingle: true
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  makeTagList(data: ResponseData): JSX.Element {
    var listElements = data.tags.map((tag, index) => (
      <li key={index} className="tag is-light">
        {tag}
      </li>
    ));
    return (
      <ul className="column is-mobile is-centered tags">{listElements}</ul>
    );
  }

  makePostHeader(data: ResponseData, link: boolean = true): JSX.Element {
    return (
      <div key={data.id}>
        <h1>
          {data.id} - {data.name}
        </h1>
        <p>{data.description}</p>
        {link ? <Link to={`/blog/${data.id.toString()}`}>Link</Link> : ""}
        {this.makeTagList(data)}
      </div>
    );
  }

  makeBlogPostHeader(data: ResponseData): JSX.Element {
    return (
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.name}</h1>
            <h2 className="subtitle">{data.description}</h2>
            {this.makeTagList(data)}
          </div>
        </div>
      </section>
    );
  }

  makeBlogPost(data: ResponseData): JSX.Element {
    let output = (
      <div>
          <Link to="" className="icon" id="icon-home"><MdHome/></Link>
          <Link to="" className="icon" id="icon-return"><MdKeyboardReturn/></Link>
          <Link to="" className="icon" id="icon-top"><MdVerticalAlignTop/></Link>
        {this.makeBlogPostHeader(data)}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: data.data! }}
        />
      </div>
    );
    console.log(output);
    return output;
  }

  render(): JSX.Element {
    if (this.state == null) return <p>Loading ...</p>;

    if (this.state.isSingle) {
      return this.makeBlogPost(this.state.data[0]);
    } else {
      var elements = this.state.data.map((data, index) => (
        <div key={index}>{this.makePostHeader(data)}</div>
      ));
      return <div>{elements}</div>;
    }
  }
}
export default BlogPosts;
