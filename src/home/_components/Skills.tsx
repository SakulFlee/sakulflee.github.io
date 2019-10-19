import React from "react";
import { Link } from "react-router-dom";

import Tag from "../../_components/Tag";

export default class Skills extends React.Component {
  render(): JSX.Element {
    return (
      <aside className="column">
        <u
          className="is-half is-family-code has-text-underlined tooltip is-tooltip-active is-tooltip-info"
          data-tooltip="Hover over my tags!"
        >
          Skills
        </u>

        <h1 className="is-size-5 has-text-black">Languages I 'speak':</h1>
        <section className="column is-mobile is-centered tags">
          <Tag
            linkTo="/blog/9"
            color="success"
            size="is-large"
            tooltip="My native language."
            text="German"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/9"
            color="success"
            size="is-large"
            tooltip="My secondary language! B1 LCCI Business Certificate/B2 school english"
            text="English"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/9"
            color="link"
            size="is-large"
            tooltip="JVM languages and tools like Java, Kotlin, Maven and Gradle"
            text="Java"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/12"
            color="info"
            size="is-large"
            tooltip="The classic native tools"
            text="C/C++"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="link"
            size="is-large"
            tooltip="HTML5, CSS4, JS9, PHP, Ruby, ..."
            text="WEB"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/12"
            color="info"
            size="is-medium"
            tooltip="Rust focuses on security, while maintaining speeds similar or sometimes even better than C/C++/Native solutions!"
            text="Rust"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/10"
            color="dark"
            size="is-medium"
            tooltip="Focus on writing instead of designing office documents"
            text="LaTeX"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/15"
            color="warning"
            size="is-small"
            tooltip="[Z|Ba]SH, Python, Ruby, ..."
            text="Script languages"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/9"
            color="success"
            size="is-small"
            tooltip="I am studying in the netherlands! Basic dutch is a must, although I mainly only understand ..."
            text="Dutch"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/9"
            color="success"
            size="is-small"
            tooltip="Not fluent but an very interesting and different language!"
            text="Japanese"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/8"
            color="info"
            size="is-small"
            tooltip=".NET's main language"
            text="C#"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/8"
            color="link"
            size="is-medium"
            tooltip="A Java based language!"
            text="Kotlin"
            multiLine={true}
          />
        </section>

        <h1 className="is-size-5 has-text-black">Tools I use:</h1>
        <section className="column is-mobile is-centered tags">
          <Tag
            linkTo="/blog/17"
            color="success"
            size="is-large"
            tooltip="GIT, SVN and other VCS"
            text="GIT"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/6"
            color="link"
            size="is-large"
            tooltip="IntelliJ IDEA, Clion, DataGrip, WebStorm, PyCharm, PHPStorm, Rider, ..."
            text="JetBrains IDEs"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/6"
            color="info"
            size="is-medium"
            tooltip="Mainly Visual Studio Code, but also Visual Studio"
            text="VisualStudio[Code]"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/6"
            color="info"
            size="is-normal"
            tooltip="The classic CLI editor!"
            text="VIM"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/3"
            color="warning"
            size="is-large"
            tooltip="CMake, Make, QMake, Gradle, Maven, Ant, and more!"
            text="Build-Tools"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/6"
            color="info"
            size="is-medium"
            tooltip="Oracle's Java IDE"
            text="NetBeans"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/19"
            color="danger"
            size="is-small"
            tooltip="All-in-one modelling and management software"
            text="VisualParadigm"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/13"
            color="dark"
            size="is-medium"
            tooltip="Open source and proprietary office product solutions"
            text="MS/Libre/OpenOffice"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/18"
            color="white"
            size="is-medium"
            tooltip="Docker, Vagrant, VirtualBox, VMWare products (Workstation, ESXi), libVirt/QEMU, Kubernetes, ..."
            text="Virtualization"
            multiLine={true}
          />
        </section>

        <h1 className="is-size-5 has-text-black">
          Frameworks I am familiar with:
        </h1>
        <section className="column is-mobile is-centered tags">
          <Tag
            linkTo="/blog/16"
            color="info"
            size="is-medium"
            tooltip="Standard unit and integration testing library and suite for Java based languages"
            text="JUnit"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/16"
            color="info"
            size="is-normal"
            tooltip="Mockito extends JUnit with useful additions and prevents overhead while testing"
            text="Mockito"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/16"
            color="info"
            size="is-normal"
            tooltip="RESTAssured extends JUnit by providing easy ways to test and validate REST API server and clients"
            text="RESTAssured"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/16"
            color="info"
            size="is-small"
            tooltip="Standard unit and integration testing library and suite for C/C++ based languages"
            text="GTest"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="warning"
            size="is-large"
            tooltip="An awesome open-source framework for building websites with flex and other tools, which is also highly extendable and modifiable. This website is build with it! Similar to bootstrap."
            text="Bulma"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="warning"
            size="is-medium"
            tooltip="Responsive, mobile-first, framework for website projects. Similar to Bulma."
            text="Bootstrap"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="primary"
            size="is-medium"
            tooltip="An easy to use and highly optimized Java WebServer with many possibilities"
            text="Spring.io"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="success"
            size="is-large"
            tooltip="Single page websites!"
            text="ReactJS"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/20"
            color="success"
            size="is-large"
            tooltip="NodeJS"
            text="NPM"
            multiLine={true}
          />
        </section>

        <h1 className="is-size-5 has-text-black">
          Operating Systems I work on:
        </h1>
        <section className="column is-mobile is-centered tags">
          <Tag
            linkTo="/blog/11"
            color="link"
            size="is-large"
            tooltip="My primary operating system! Mainly Manjaro but also self-installed arch."
            text="ArchLinux"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/11"
            color="link"
            size="is-medium"
            tooltip="Ubuntu and other Debian based distros!"
            text="Ubuntu"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/11"
            color="link"
            size="is-medium"
            tooltip="OpenSource version of RedHat's Enterprise Linux"
            text="CentOS"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/5"
            color="danger"
            size="is-small"
            tooltip="Linux based distribution, made for security testing and hacking"
            text="KaliLinux"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/21"
            color="warning"
            size="is-medium"
            tooltip="Microsoft's operating system. While not being a huge fan of it I still use it often."
            text="Windows"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/11"
            color="primary"
            size="is-small"
            tooltip="Apple's operating system. Very similar to Linux; sometimes porting applications there."
            text="Mac OS X"
            multiLine={true}
          />
        </section>

        <h1 className="is-size-5 has-text-black">
          Other topics I am interested in:
        </h1>
        <section className="column is-mobile is-centered tags">
          <Tag
            linkTo="/blog/2"
            color="success"
            size="is-large"
            tooltip="I think brains are mysterious and so interesting. AI tries to reverse-engineer that! How can one not be interested in AI?"
            text="AI"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/5"
            color="danger"
            size="is-medium"
            tooltip="I like to find bugs and security problems in existing and still developing systems to then fix or report them. Activities include Pen-Testing and CTFs."
            text="Hacking"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/7"
            color="warning"
            size="is-normal"
            tooltip="'Internet of Things' devices are electronics that are connected with the internet"
            text="IoT"
            multiLine={true}
          />

          <Tag
            linkTo="/blog/4"
            color="info"
            size="is-large"
            tooltip="I really enjoy having no creative limits and simply create something others might like. Sadly I haven't finished any games yet ..."
            text="Game Development"
            multiLine={true}
          />

          <Tag
            linkTo="/1"
            color="info"
            size="is-large"
            tooltip="Being creative is one of my biggest interests"
            text="3D Modelling / Design"
            multiLine={true}
          />
        </section>

        <div
          className="has-text-grey tooltip is-tooltip-danger"
          data-tooltip="Click to see more!"
        >
          <Link to="/blog">And much more on my blog ...</Link>
        </div>
      </aside>
    );
  }
}
