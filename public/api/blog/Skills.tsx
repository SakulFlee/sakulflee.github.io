import React from "react";
import styled from 'styled-components';

import Footer from "./_components/Footer";

export default class Skills extends React.Component {
  line = styled.div`
    border-top-color: gray;
    border-top-width: 1px;
    border-top-style: solid;
    width: 80%;
    position: absolute;
    left: 10%;
  `;

  render(): JSX.Element {
    return (
      <div>
        <section className="hero is-medium is-light is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Skills</h1>

              <h1 className="is-size-4 has-text-centered">On this page</h1>
              <div className="columns">
                <div className="column is-size-5 has-text-centered">
                  <a href="#cat-languages" className="button has-text-black">
                    Languages
                  </a>
                </div>
                <div className="column is-size-5 has-text-centered">
                  <a href="#cat-tools" className="button has-text-black">
                    Tools
                  </a>
                </div>
                <div className="column is-size-5 has-text-centered">
                  <a href="#cat-frameworks" className="button has-text-black">
                    Frameworks
                  </a>
                </div>
                <div className="column is-size-5 has-text-centered">
                  <a
                    href="#cat-operating-systems"
                    className="button has-text-black"
                  >
                    Operating Systems
                  </a>
                </div>
                <div className="column is-size-5 has-text-centered">
                  <a href="#cat-other" className="button has-text-black">
                    Other
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h1
          className="is-size-3 has-text-black has-text-centered"
          id="cat-languages"
        >
          Languages
        </h1>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <p className="title" id="Languages">
                  Languages
                </p>
                <p>
                  My mother language is german and I also speak english
                  fluently. Additionally, I learned basic dutch in university
                  and taught myself basic japanese a few years back. Though, it
                  has gotten a bit rusty over the years.
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-link">
                <p className="title" id="JVM-and-similar">
                  Java and others
                </p>
                <p>
                  Java was my first programming language! I started pretty young
                  with it. That is also why I am so confident in it by now.
                </p>
                <p>
                  But this also include other, similar, languages! C# is pretty
                  close to Java and other JVM languages like Kotlin are no
                  exception either!
                </p>
                <br />
                <p>Java is our primary programming language in university!</p>
              </article>
            </div>
          </div>
        </article>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title" id="Native">
                  Native
                </p>
                <p>
                  Java application run in a virtual machine, but what about true
                  native application?
                </p>
                <p>
                  I started my native adventure with simple C applications, but
                  soon did more complex things with C++. I also started to look
                  more into byte/machine-code and assembly.
                </p>
                <p>
                  Recently, I started learning Rust. Rust introduces many
                  different and new concepts, while also prohibiting
                  anti-pattern. It also compiles to a native application but is
                  much more secure by design and sometimes even faster than C++
                  applications! I love it so far and am excited to look further
                  in it.
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-link">
                <p className="title" id="WEB">
                  WEB
                </p>
                <p>
                  Shortly after starting with Java, I started writing my own
                  little websites as side-projects. Nothing special, but I got
                  more and more into the whole 'WEB-Stack'.
                </p>
                <p>
                  Currently, I know a lot of web-technologies, such as: HTML,
                  CSS, JS and PHP. But I am also familiar with CSS-Preprocessors
                  like SASS, ES6 JavaScript, TypeScript, NodeJS and a lot more!
                </p>
                <p>
                  I also worked with frameworks like Bulma and Bootstrap in the
                  past. In fact, this website is build using Bulma!
                </p>
              </article>
            </div>
          </div>
        </article>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-dark">
                <p className="title" id="LaTeX">
                  LaTeX
                </p>
                <p>
                  I really enjoy the isolation of "just writing" in LaTeX.
                  Though, it can get easily complex and complicated.
                </p>
                <p>
                  Nevertheless, I wouldn't write anything scientific or
                  report-like without LaTeX.
                </p>
                <br />
                <p>We also learn LaTeX in university.</p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-warning">
                <p className="title" id="Script-Languages">
                  Script Languages
                </p>
                <p>I love automating things!</p>
                <p>
                  I rather spend some time on a script, than repeating a task
                  over and over again. I am familiar with many script languages,
                  mainly (Ba|Z)SH though. Others include Batch/CMD, POSH
                  (PowerShell), Python and Ruby.
                </p>
                <br />
                <p>
                  I am also currently experimenting with using a language like
                  Rust as a script language.
                </p>
              </article>
            </div>
          </div>
        </article>
        <this.line/>
        <h1
          className="is-size-3 has-text-black has-text-centered"
          style={{ marginTop: "64px" }}
          id="cat-tools"
        >
          Tools
        </h1>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <p className="title" id="VCS">
                  VCS
                </p>
                <p>
                  Version control systems are the best! Recovering old sources,
                  deleted lines or straight-up reverting broken commits is such
                  an essential feature in developing applications.
                </p>
                <br />
                <p>
                  I, myself, like Git and all its features the most. But in
                  university we mainly use Subversion. I like both, I simply
                  prefer Git.
                </p>
              </article>
            </div>
          </div>
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title" id="IDEs-and-Editor">
                  IDEs-and-Editor
                </p>
                <p>
                  Ever tried developing without an IDE or at least a good
                  editor?
                </p>
                <p>
                  Using dedicated tools safes so much time. I utilize many
                  different IDEs, editors and tools. All for different languages
                  and sometimes even tasks.
                </p>
                <br />
                <p>
                  My current main IDE is JetBrains IntelliJ IDEA, coupled with
                  Visual Studio Code. IDEA mainly for Java and other JVM
                  languages like Kotlin, but sometimes also for Web-Development
                  and Rust. Visual Studio Code mainly for Web-Development, Rust
                  and Scripting, as well as, taking notes in e.g. Markdown.
                </p>
                <p>
                  Apart from that also other Jetbrains IDEs like CLion for C/C++
                  development or Visual Studio.
                </p>
              </article>
            </div>
          </div>
        </article>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-warning">
                <p className="title" id="Build-Tools">
                  Build-Tools
                </p>
                <p>
                  To have a project that everyone can work on, independent of
                  the operating system and IDEs or editors used, you need
                  build-tools. Also, if having a lot of external dependencies.
                </p>
                <p>
                  Build-Tools simply help optimizing productivity of projects!
                </p>
                <br />
                <p>
                  I have worked with many different build-tools. Most of them
                  are only working for one language after all. For Java I prefer
                  Gradle, but in university we mainly work with Maven. For C/C++
                  I really enjoy CMake, but others like Make, QMake, etc. are
                  fine too. NodeJS and Rust[/Cargo] essentially come with their
                  own build-tools build in.
                </p>
              </article>
            </div>
          </div>
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title" id="Modelling">
                  Modelling
                </p>
                <p>
                  When planning, analyzing or designing a project, modelling
                  certain parts of the product can help a lot when trying to
                  understand the final product.
                </p>
                <br />
                <p>
                  I prefer writing direct UML, but I am also familiar with UML
                  specific programs. In university we utilize VisualParadigm for
                  almost all design artifacts.
                </p>
              </article>
            </div>
          </div>
        </article>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-dark">
                <p className="title" id="Office">
                  MS/Libre/Open-Office
                </p>
                <p>
                  Even before learning how to program applications I was pretty
                  confident with computers. This of course includes getting
                  around in the rather classic Office-Stack like Word, Excel and
                  PowerPoint.
                </p>
                <p>Later, I also got into not so common ones like Access.</p>
                <br />
                <p>
                  With discovering linux I also needed a new alternative, so I
                  started looking into LibreOffice and OpenOffice.
                </p>
                <br />
                <p>
                  By now, I am confident with almost all programs from these
                  Office-Stack, including designing documents.
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-white">
                <p className="title" id="Virtualization">
                  Virtualization
                </p>
                <p>
                  Virtualization can be pretty powerful.
                </p>
                <p>
                  With Docker, and similar software like Kubernetes and Vagrant, isolating an application and making it run almost universally has become incredibly easy.
                  Furthermore, making it easily scalable.
                </p>
                <p>
                  But other software like Hyper-V, VirtualBox and VMWare Player/Workstation, enable full-system virtualization.
                  Enabling users to develop and test their applications for and on other operating systems.
                </p>
              </article>
            </div>
          </div>
        </article>
        <this.line/>
        <h1
          className="is-size-3 has-text-black has-text-centered"
          style={{ marginTop: "64px" }}
          id="cat-frameworks"
        >
          Frameworks
        </h1>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-link">
                <p className="title" id="Test-Driven-Development">
                  Test-Driven-Development
                </p>
                <p>
                  In university we learned the test-driven-development approach.
                  While test-driven might take a little bit more time, your end-result has less bugs, none to nearly none unused code, better code quality and and and ...
                </p>
                <br/>
                <p>
                  Initially we learned it only for Java, using JUnit and some helping frameworks like Mockito and RESTAssured.
                  Now, I also started to work test-driven with C/C++ (with gTest) and Rust.
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <p className="title" id="WEB-Frameworks">
                  WEB-Frameworks
                </p>
                <p>
                  This website is using ReactJS and Bulma mostly.
                </p>
                <p>
                  Both of course run with NodeJS!
                </p>
                <br/>
                <p>
                  I am still learning about more advanced ReactJS topics, but overall I am pretty confident with it already.
                </p>
                <p>
                  I also use TypeScript instead of JavaScript.
                  Simply, because I like the type-safety more.
                </p>
                <br/>
                <p>
                  Although not in use here, I also worked with spring.io previously as a backend REST-Server in two university projects.
                </p>
              </article>
            </div>
          </div>
        </article>
        <this.line/>
        <h1
          className="is-size-3 has-text-black has-text-centered"
          style={{ marginTop: "64px" }}
          id="cat-operating-systems"
        >
          Operating Systems
        </h1>
        {/* GO ON */}
        OperatingSystems
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-dark">
                <p className="title" id="Languages">
                  Languages
                </p>
                <p>asd</p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-dark">
                <p className="title" id="Native">
                  Native
                </p>
                <p>asd</p>
              </article>
            </div>
          </div>
        </article>
        <this.line/>
        <h1
          className="is-size-3 has-text-black has-text-centered"
          style={{ marginTop: "64px" }}
          id="cat-other"
        >
          Other
        </h1>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title" id="Hacking">
                  Hacking
                </p>
                <p>
                  Being able to hack a system and testing its security is
                  invaluable. Developers, who know how <em>bad</em> hackers try
                  to get into a system, can use that knowledge to protect and
                  precautionary secure the system.
                </p>
                <br />
                <p>
                  I test my servers myself using penetration testing, spoofing
                  and some other techniques. Applications are developed with
                  security in mind. Everything important and vulnerable is
                  encrypted and securely stored. Passwords are secured,
                  encrypted and never the same, etc.
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-warning">
                <p className="title" id="IoT">
                  IoT
                </p>
                <p>
                  Creating electronic devices is another skill and hobby.
                  Similar to automating things with scripts, I like automating
                  processes in my house.
                </p>
                <p>
                  For example, I created a plant hydro-sensor that reports me if
                  a plant needs more or maybe even less water.
                </p>
                <br />
                <p>
                  Additionally, I got some experience with 3D printing and
                  creating PCB's @home. Combined, it's a powerful skill not
                  everyone has!
                </p>
              </article>
            </div>
          </div>
        </article>
        <article className="columns">
          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title" id="Games">
                  Games
                </p>
                <p>
                  I enjoy playing games, though I prefer indie-games over e.g.
                  shooter.
                </p>
                <br />
                <p>
                  But I also enjoy making games! Creating games is essentially
                  creating something new, that someone else might like. No
                  limits, pure creativity.
                </p>
                <p>
                  Unfortunately, making games is hard and takes a lot of time.
                  Which is why I never finished anything. Nevertheless, I have
                  experience with OpenGL and Vulkan, as well as many
                  game-engines and game-frameworks (like Rusts gfx-hal).
                </p>
              </article>
            </div>
          </div>

          <div className="tile is-parent no-padding-bottom column">
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title" id="Graphics">
                  Graphics
                </p>
                <p>
                  I love being creative. This includes drawing, modelling and
                  also making music!
                </p>
                <p>
                  I have some experience with applications like Krita,
                  PhotoShop, Blender, Maya 3D, Cinema 4D, FLStudio and LMNS.
                  Though being or liking creative things, doesn't mean I am
                  successful with it.
                </p>
                <p>Additionally, I got some experience with 3D printing.</p>
                <br />
                <p>
                  Speaking of coding: I rather solve tasks in a creative way,
                  then a old and maybe outdated way.
                </p>
              </article>
            </div>
          </div>
        </article>
        <div className="tile is-parent no-padding-bottom column">
          <div className="tile is-parent">
            <article className="tile is-child notification is-success">
              <p className="title" id="AI">
                AI & ML
              </p>
              <p>Recently, I started looking into AI and everything related.</p>
              <p>
                I think of the entire AI topic as 'reverse engineering' a
                (human) brain. Which in itself sounds incredible already!
              </p>
              <p>
                I also think the techniques used by AI and ML are something else
                and completely different from 'traditional programming'.
                Unfortunately, I haven't found a real use case yet to use and
                experiment with AI on.
              </p>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
