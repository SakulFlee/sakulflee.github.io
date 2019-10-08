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
  spacing = styled.div`
    width: 25.8%;
    height: 32px;

    border-right: dotted magenta ${this.lineWidth}px;
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
        className={`tag is-large is-${props.color} ${textColor} tooltip is-tooltip-${props.color}`}
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
          <this.date>2018</this.date>
          <this.texts>
            <this.timelinePoint color="info" text="ABC!" tooltip="CBA!" />
            <this.timelinePoint color="link" text="AAA" tooltip="BBB" />
            <this.timelinePoint color="dark" text="ASD" tooltip="ASD" />
          </this.texts>
        </this.entry>
        <this.entry>
          <this.date>2019</this.date>
          <this.texts>
            <this.timelinePoint color="danger" text="A0" tooltip="B0" />
            <this.timelinePoint color="warning" text="A1" tooltip="B1" />
            <this.timelinePoint color="success" text="A2" tooltip="B2" />
          </this.texts>
        </this.entry>
        <this.spacing />
        <this.entry>
          <this.date>2020</this.date>
          <this.texts>
            <this.timelinePoint color="white" text="AAA" tooltip="BBB" />
          </this.texts>
        </this.entry>
      </this.timeline>
    );
  }
}
