import React from "react";
import styled from "styled-components";

export default class TimeLine extends React.Component {
  lineWidth = 4;
  timeline = styled.div`
    width: 100%;
    padding-top: 16px;
  `;
  date = styled.div`
    width: 25%;
    display: inline-block;
  `;
  texts = styled.div`
    width: 75%;
    display: inline-block;

    border-left: solid magenta ${this.lineWidth}px;
  `;
  entry = styled.div`
    width: 100%;
    display: inline-block;
  `;
  dotted = styled.div`
    width: 25.8%;
    height: 32px;

    border-right: dotted magenta ${this.lineWidth}px;
  `;
  spacing = styled.div`
    padding-top: 16px;
    width: 25.8%;

    border-right: solid magenta ${this.lineWidth}px;
  `;

  timelinePoint(props: {
    color: string;
    text: string;
    tooltip: string;
  }): JSX.Element {
    let textColor =
      props.color === "warning" || props.color === "white"
        ? "has-text-black"
        : "has-text-white";
    return (
      <div
        className={`tag is-large is-${props.color} ${textColor} tooltip is-tooltip-${props.color} is-tooltip-multiline`}
        data-tooltip={props.tooltip}
        style={{ width: "90%" }}
      >
        {props.text}
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <this.timeline id="timeline">
        <u className="is-half is-family-code has-text-underlined">Timeline</u>
        <this.entry>
          <this.date>2005</this.date>
          <this.texts>
            <this.timelinePoint
              color="dark"
              text="Start of everything"
              tooltip="Here starts everything... First real experience with computers, mainly windows, etc."
            />
          </this.texts>
        </this.entry>
        <this.dotted />
        <this.entry>
          <this.date>2009</this.date>
          <this.texts>
            <this.timelinePoint
              color="warning"
              text="Started with Java and WEB"
              tooltip="Beginning of my programming knowledge"
            />
            <this.timelinePoint
              color="dark"
              text="First look into Linux"
              tooltip="Beginning of my programming knowledge"
            />
          </this.texts>
        </this.entry>
        <this.dotted />
        <this.entry>
          <this.date>2012</this.date>
          <this.texts>
            <this.timelinePoint
              color="warning"
              text="Started with C/C++"
              tooltip="Major step into the 'native world'!"
            />
            <this.timelinePoint
              color="link"
              text="Started learning Japanese"
              tooltip="I loved this language since the beginning!"
            />
          </this.texts>
        </this.entry>
        <this.dotted />
        <this.entry>
          <this.date>2014</this.date>
          <this.texts>
            <this.timelinePoint
              color="link"
              text="LCCI certificate"
              tooltip="Finished my LCCI business english certificate"
            />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2015</this.date>
          <this.texts>
            <this.timelinePoint
              color="info"
              text="Primary education"
              tooltip="[2009-2015] German primary school education, completed with allowance for secondary school education."
            />
          </this.texts>
        </this.entry>
        <this.dotted />
        <this.entry>
          <this.date>2018</this.date>
          <this.texts>
            <this.timelinePoint
              color="info"
              text="Secondary education"
              tooltip="[2015-2018] German secondary school education, completed with vocational diploma."
            />
            <this.timelinePoint
              color="success"
              text="Best 1st semester uni project"
              tooltip="My team got voted the best first semester project!"
            />
            <this.timelinePoint
              color="link"
              text="Dutch certificate"
              tooltip="Right before starting my study!"
            />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2019</this.date>
          <this.texts>
            <this.timelinePoint
              color="warning"
              text="Started with Rust"
              tooltip="Starting point of learning rust"
            />
            <this.timelinePoint
              color="success"
              text="Best 2nd semester uni project"
              tooltip="My team managed to be one of the best projects!"
            />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2020</this.date>
          <this.texts>
            <this.timelinePoint
              color="info"
              text="Internship"
              tooltip="Hopefully a fantastic experience!"
            />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2020</this.date>
          <this.texts>
            <this.timelinePoint
              color="info"
              text="Minor"
              tooltip="Not yet sure what ..."
            />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2022</this.date>
          <this.texts>
            <this.timelinePoint
              color="info"
              text="International study"
              tooltip="[2018-2022] Software engineering study, abroad in the Netherlands. To be completed with a bachelor of science degree."
            />
          </this.texts>
        </this.entry>
      </this.timeline>
    );
  }
}
