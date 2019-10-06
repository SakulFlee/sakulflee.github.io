import React from "react";

import Footer from "./_components/Footer";

export default class Legal extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <section className="hero is-medium is-info is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Credits</h1>
              <h2 className="subtitle">
                What is used where and where can I get it?
              </h2>
            </div>
          </div>
        </section>
        <div className="tile is-parent">
          <div className="tile is-parent is-4">
            <h1>Font-Awesome</h1>
            <table>
              <tr>
                <td>Name</td>
                <td>Icon</td>
                <td>Link</td>
                <td>License</td>
                <td>Modified</td>
              </tr>
              <tr>
                <td>Home</td>
                <td>
                  <img src="icons/home.svg" alt="Home" />
                </td>
                <td>
                  <a href="https://fontawesome.com/icons/home?style=solid">
                    Font-Awesome
                  </a>
                </td>
                <td>
                  <a href="https://fontawesome.com/license">License</a>
                </td>
                <td>&#9745;</td>
              </tr>
            </table>
            <article className="tile is-child notification is-danger">
              <h1 className="title">Title</h1>
              <p className="subtitle">SubTitle</p>
              <div className="content">
                Line 1<br /> Line 2<br /> Line 3<br /> Line 4<br />
              </div>
            </article>
          </div>
          <div className="tile is-vertical is-parent is-8">
            <article className="tile is-child notification is-danger">
              <h1 className="title">Title</h1>
              <p className="subtitle">SubTitle</p>
              <div className="content">
                Line 1<br /> Line 2<br /> Line 3<br /> Line 4<br />
              </div>
            </article>
            <article className="tile is-child notification is-danger">
              <h1 className="title">Title</h1>
              <p className="subtitle">SubTitle</p>
              <div className="content">
                Line 1<br /> Line 2<br /> Line 3<br /> Line 4<br />
              </div>
            </article>
          </div>
        </div>

        <div className="tile is-parent">
          <article className="tile is-child notification is-danger">
            <p className="title">Wide tile</p>
            <div className="subtitle no-font">
              <a className="is-icon-small" href="">
                <img src="icons/github.svg" alt="GitHub" />
              </a>
              <a className="is-icon-small" href="">
                <img src="icons/gitlab.svg" alt="GitLab" />
              </a>
              <a className="is-icon-small" href="">
                <img src="icons/bitbucket.svg" alt="BitBucket" />
              </a>
            </div>
            <div className="content">
              <p>... CONTENT ...</p>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}
