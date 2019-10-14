import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render(): JSX.Element {
    return (
      <footer className="has-text-centered">
        <div className="container">
          <div className="columns">
            <div className="column is-8-desktop is-offset-2-desktop">
              <p>
                <strong className="has-text-weight-semibold">
                  <Link to="/credit">Credits</Link>
                </strong>
              </p>
              <p>
                <strong className="has-text-weight-semibold">
                  <Link to="/disclaimer_legal_and_privacy">
                    Disclaimer, legal and privacy
                  </Link>
                </strong>
              </p>
              <p>
                <small>
                  <Link to="https://gitlab.com/sakul6499.de/sakul6499.de">
                    Source code
                  </Link>{" "}
                  build with &hearts; and licensed under{" "}
                  <Link to="http://opensource.org/licenses/mit-license.php">
                    MIT
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
