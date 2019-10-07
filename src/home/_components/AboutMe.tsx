import React from "react";
import { Link } from "react-router-dom";

import Tag from "../../_components/Tag";
import TimeLine from "../../_components/TimeLine";

import "./AboutMe.scss";

class AboutMe extends React.Component {
  render() {
    return (
      <section className="columns has-text-centered" id="AboutMe">
        <article className="column">
          <u className="is-half is-family-code has-text-underlined">About me</u>
          <TimeLine/>
        </article>
        <aside className="column">
          <u
            className="is-half is-family-code has-text-underlined tooltip is-tooltip-multiline is-tooltip-active is-tooltip-info"
            data-tooltip="Hover over my tags!"
          >
            Skills
          </u>

          <h1 className="is-size-5 has-text-black">Languages I speak:</h1>
          <section className="column is-mobile is-centered tags">
            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-success"
              size="is-large"
              tooltip="My primary language."
              text="German"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-large"
              tooltip="My secondary language! B1 LCCI Business Certificate/B2 school english"
              text="English"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="JVM languages and tools like Java, Kotlin, Maven and Gradle"
              text="JVM"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Native"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="The classic native tools"
              text="C/C++"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Web"
              colorClass="is-link"
              tooltipClass="is-tooltip-link"
              size="is-large"
              tooltip="HTML5, CSS4, JS9, PHP, Ruby, ..."
              text="WEB"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Rust"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="Rust focuses on security, while maintaining speeds similar or sometimes even better than C/C++/Native solutions!"
              text="Rust"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Office"
              colorClass="is-dark"
              tooltipClass="is-tooltip-dark"
              size="is-medium"
              tooltip="Focus on writing instead of designing office documents"
              text="LaTeX"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Scripting-Languages"
              colorClass="is-warning"
              textColor="has-text-black"
              tooltipClass="is-tooltip-warning"
              size="is-small"
              tooltip="[Z|Ba]SH, Python, Ruby, ..."
              text="Scripting languages"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Modelling"
              colorClass="is-warning"
              textColor="has-text-black"
              tooltipClass="is-tooltip-warning"
              size="is-small"
              tooltip="UML, Graphviz/Dot, ..."
              text="Modelling languages"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="I am studying in the netherlands! Basic dutch is a must, although I mainly only understand ..."
              text="Dutch"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="Not fluent but and very interesting and different language!"
              text="Japanese"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Languages"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-small"
              tooltip="Third language learned in school. Absolutely not fluent but I understand it on a basic level."
              text="Spanish"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#JVM-and-similar"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-small"
              tooltip="VC++, C#, F#, VB"
              text=".NET"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Native"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-small"
              tooltip="Mainly GAS (intel; gcc output) and NASM"
              text="Assembly"
              multiLine={true}
            />
          </section>

          <h1 className="is-size-5 has-text-black">Tools I use:</h1>
          <section className="column is-mobile is-centered tags">
            <Tag
              linkTo="/skills#VCS"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-large"
              tooltip="Mainly GIT and SVN"
              text="VCS"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IDEs-and-Editor"
              colorClass="is-link"
              tooltipClass="is-tooltip-link"
              size="is-large"
              tooltip="IntelliJ IDEA, Clion, DataGrip, WebStorm, PyCharm, PHPStorm, Rider, ..."
              text="JetBrains IDEs"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IDEs-and-Editor"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="VisualStudio and VisualStudioCode"
              text="VisualStudio[Code]"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IDEs-and-Editor"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="The classic CLI editor!"
              text="VIM"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Build-Tools"
              colorClass="is-warning"
              tooltipClass="is-tooltip-warning"
              textColor="has-text-dark"
              size="is-large"
              tooltip="CMake, Make, QMake, Gradle, Maven, Ant, ..."
              text="Build-Tools"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IDEs-and-Editor"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="Oracle's Java IDE"
              text="NetBeans"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Modelling"
              colorClass="is-danger"
              tooltipClass="is-tooltip-danger"
              textColor="has-text-dark"
              size="is-small"
              tooltip="All-in-one modelling and management software"
              text="VisualParadigm"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Office"
              colorClass="is-dark"
              tooltipClass="is-tooltip-dark"
              size="is-medium"
              tooltip="Open source and proprietary office product solutions"
              text="MS/Libre/OpenOffice"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Virtualization"
              colorClass="is-white"
              tooltipClass="is-tooltip-white"
              textColor="has-text-dark"
              size="is-medium"
              tooltip="Docker, Vagrant, VirtualBox, VMWare products (Workstation, ESXi), libVirt/QEMU, Kubernetes, ..."
              text="Virtualization"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IDEs-and-Editor"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-small"
              tooltip="Powerful C++ cross-platform IDE and SDK"
              text="Qt"
              multiLine={true}
            />
          </section>

          <h1 className="is-size-5 has-text-black">
            Frameworks I am familiar with:
          </h1>
          <section className="column is-mobile is-centered tags">
            <Tag
              linkTo="/skills#Test-Driven-Development"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="Standard unit and integration testing library and suite for Java based languages"
              text="JUnit"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Test-Driven-Development"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="Mockito extends JUnit with useful additions and prevents overhead while testing"
              text="Mockito"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Test-Driven-Development"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="RESTAssured extends JUnit by providing easy ways to test and validate REST API server and clients"
              text="RESTAssured"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Test-Driven-Development"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-medium"
              tooltip="Standard unit and integration testing library and suite for C/C++ based languages"
              text="gTest"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Web"
              colorClass="is-warning"
              tooltipClass="is-tooltip-warning"
              textColor="has-text-dark"
              size="is-medium"
              tooltip="An awesome open-source framework for building websites with flex and other tools, which is also highly extendable and modifiable. This website is build with it! Similar to bootstrap."
              text="Bulma"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Web"
              colorClass="is-warning"
              tooltipClass="is-tooltip-warning"
              textColor="has-text-dark"
              size="is-medium"
              tooltip="Responsive, mobile-first, framework for website projects. Similar to Bulma."
              text="Bootstrap"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Web"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-medium"
              tooltip="An easy to use, highly optimized, Java WebServer with many possibilities"
              text="Spring.io"
              multiLine={true}
            />
          </section>

          <h1 className="is-size-5 has-text-black">
            Operating Systems I work on:
          </h1>
          <section className="column is-mobile is-centered tags">
            <Tag
              linkTo="/skills#Linux"
              colorClass="is-link"
              tooltipClass="is-tooltip-link"
              size="is-large"
              tooltip="Mainly ArchLinux/Manjaro but also other distribution like Ubuntu, Alpine, CentOS, Fedora and much more ..."
              text="Linux"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Hacking"
              colorClass="is-danger"
              tooltipClass="is-tooltip-danger"
              textColor="has-text-dark"
              size="is-small"
              tooltip="Linux based distribution, made for security testing and hacking"
              text="ParrotOS"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Hacking"
              colorClass="is-danger"
              tooltipClass="is-tooltip-danger"
              textColor="has-text-dark"
              size="is-small"
              tooltip="Linux based distribution, made for security testing and hacking"
              text="KaliLinux"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Other-Systems"
              colorClass="is-warning"
              tooltipClass="is-tooltip-warning"
              textColor="has-text-dark"
              size="is-medium"
              tooltip="Microsoft's operating system. While not being a huge fan of it I still use it often."
              text="Windows"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Other-Systems"
              colorClass="is-warning"
              tooltipClass="is-tooltip-warning"
              textColor="has-text-dark"
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
              linkTo="/skills#Hacking"
              colorClass="is-danger"
              tooltipClass="is-tooltip-danger"
              textColor="has-text-dark"
              size="is-large"
              tooltip="I like to find bugs and security problems in existing and still developing systems to then fix or report them. Activities include Pen-Testing and CTFs."
              text="Hacking"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#IoT"
              colorClass="is-success"
              tooltipClass="is-tooltip-success"
              size="is-large"
              tooltip="'Internet of Things' devices are electronics that are connected with the internet"
              text="IoT"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Games"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="I really enjoy having no creative limits and simply create something others might like. Sadly I haven't finished any game yet ..."
              text="Game Development"
              multiLine={true}
            />

            <Tag
              linkTo="/skills#Graphics"
              colorClass="is-info"
              tooltipClass="is-tooltip-info"
              size="is-large"
              tooltip="Being creative is one of my"
              text="3D Modelling / Design"
              multiLine={true}
            />
          </section>

          <div
            className="has-text-grey tooltip is-tooltip-danger"
            data-tooltip="Click to see more!"
          >
            <Link to="/skills">And much more ...</Link>
          </div>
        </aside>
      </section>
    );
  }
}
export default AboutMe;
