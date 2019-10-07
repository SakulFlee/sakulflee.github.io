import React from 'react';
import {Link} from 'react-router-dom';

import './Tag.scss';

type TagProperties = {
    text: string,
    tooltip: string,
    color: string,
    tooltipOnly?: boolean,
    active?: boolean,
    multiLine?: boolean,
    underline?: boolean,
    size?: string,
    linkTo?: string,
}

type TagState = {}

export default class Tag extends React.Component<TagProperties, TagState> {
    static defaultProps = {
        tooltipOnly: false,
        active: false,
        multiLine: false,
        underline: false,
        tooltipClass: "is-tooltip-info",
        textColor: "has-text-white",
        size: "",
    }

    render(): JSX.Element {
        let textColor = (this.props.color === 'warning' || this.props.color === 'white') ? 'has-text-black' : 'has-text-white';
        return (
            <div className={`is-half is-family-code ${textColor} ${this.props.tooltipOnly ? "" : "tag"} ${this.props.underline ? "has-text-underlined" : ""} tooltip ${this.props.multiLine ? "is-tooltip-multiline" : ""} ${this.props.active ? "is-tooltip-active" : ""} is-${this.props.color} is-tooltip-${this.props.color} ${this.props.size}`} data-tooltip={this.props.tooltip}>
                {this.props.linkTo == null ? this.props.text : <Link className={`${textColor}`} to={this.props.linkTo}>{this.props.text}</Link>} 
            </div>
        );
    }
}