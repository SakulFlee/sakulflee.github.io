import React from "react";
import styled, {keyframes} from "styled-components";

import '../css/animation.css';

type CubeData = {
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

    width: 64px;
    height: 64px;

    border-radius: 25%;
    border-width: 5px;
    border-color: #363636;
    border-style: solid;

    background: ${this.props.colour};

    z-index: 2;

    box-shadow: 5px 5px 3px #363636;

    animation: ${this.props.animation};
  `;

  constructor(props: CubeData) {
    super(props);
  }

  render(): JSX.Element {
    return <this.styled_cube/>;
  }
}
