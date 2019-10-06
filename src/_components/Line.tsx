import React from 'react';
import styled from 'styled-components'; 

type LineData = {
    degree: number,
}

export default class Line extends React.Component<LineData, LineData> {
    line = styled.div`
        position: absolute;
        left: 50vw;
        top: -20vh;
        width: 60vw;
        height: 120vh;
    
        background: rgba(25, 25, 25, 100);
        transform: skew(${this.props.degree}deg);
    
        z-index: 1;
    `;

    render(): JSX.Element {
        return (
            <this.line/>
        );
    }
}