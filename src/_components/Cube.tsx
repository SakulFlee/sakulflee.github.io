import React from "react";
import styled from "styled-components";

import './Cube.scss';

type CubeData = {
  size: number;
  left: number;
  top: number;
  colour: string;
  animation: string;
};

export default class Cube extends React.Component<CubeData, CubeData> {
  styled_cube = styled.div`
    position: absolute;

    top: ${this.props.top}%;
    left: ${this.props.left}%;

    width: ${this.props.size}px;
    height: ${this.props.size}px;

    border-radius: 25%;
    border-width: 5px;
    border-color: #363636;
    border-style: solid;

    background: ${this.props.colour};

    z-index: 2;

    box-shadow: 5px 5px 3px #363636;

    animation: ${this.props.animation};
  `;

  render(): JSX.Element {
    return <this.styled_cube/>;
  }
}
