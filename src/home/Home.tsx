import React from "react";

import TitlePage from "./_components/TitlePage";
import AboutMe from "./_components/AboutMe";
import Footer from "../shared/Footer";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <TitlePage />
        <AboutMe />
        <Footer />
      </div>
    );
  }
}
export default Home;
