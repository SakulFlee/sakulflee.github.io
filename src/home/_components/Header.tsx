import React from "react";

const Trianglify = require('trianglify');

type HeaderProperties = {
    maxHeightInPercent: number,
};

type HeaderState = {
    width: number,
    height: number,
};

export default class Header extends React.Component<HeaderProperties, HeaderState> {
    static defaultProps: HeaderProperties = {
        maxHeightInPercent: 100,
    };

    updateDimensions = () => {
        let maxHeight = window.innerHeight * (this.props.maxHeightInPercent / 100);
        this.setState({
            width: window.innerWidth,
            height: maxHeight
        });
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render(): JSX.Element {
        if (this.state == null) return <p>Loading ...</p>;

        let pattern = Trianglify({
            width: this.state.width, 
            height: this.state.height,
            cell_size: 30 + Math.random() * 100
        });

        let style = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
            position: 'static' as 'static',
            top: 0,
            left: 0,
        };

        return (
                <svg 
                    style={style} 
                    dangerouslySetInnerHTML={{__html: pattern.svg().innerHTML}}
                />
        );
    }
}