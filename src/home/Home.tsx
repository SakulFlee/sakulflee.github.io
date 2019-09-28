import React from "react";

import TitlePage from "./_components/TitlePage";
import AboutMe from "./_components/AboutMe";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <TitlePage />
        <AboutMe />
      </div>
    );
  }
}
export default Home;
