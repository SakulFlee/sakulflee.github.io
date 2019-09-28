import React from 'react';
import styled from 'styled-components'; 

type LineData = {
    degree: number,
}

export default class Line extends React.Component<LineData, LineData> {
    line = styled.div`
        position: absolute;
        left: 50%;
        top: -20%;
        width: 60%;
        height: 120%;
    
        background: rgba(25, 25, 25, 100);
        transform: skew(${this.props.degree}deg);
    
        z-index: 1;
    `;

    constructor(props: LineData) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <this.line/>
        );
    }
}