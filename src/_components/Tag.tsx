import React from 'react';
import {Link} from 'react-router-dom';

import './Tag.scss';

type TagProperties = {
    text: string,
    tooltip: string,
    tooltipOnly?: boolean,
    active?: boolean,
    multiLine?: boolean,
    underline?: boolean,
    colorClass?: string,
    tooltipClass?: string,
    textColor?: string,
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
        colorClass: "is-info",
        tooltipClass: "is-tooltip-info",
        textColor: "has-text-white",
        size: "",
    }

    render(): JSX.Element {
        return (
            <div className={`is-half is-family-code ${this.props.textColor} ${this.props.tooltipOnly ? "" : "tag"} ${this.props.underline ? "has-text-underlined" : ""} tooltip ${this.props.multiLine ? "is-tooltip-multiline" : ""} ${this.props.active ? "is-tooltip-active" : ""} ${this.props.colorClass} ${this.props.tooltipClass} ${this.props.size}`} data-tooltip={this.props.tooltip}>
                {this.props.linkTo == null ? this.props.text : <Link className={`${this.props.textColor}`} to={this.props.linkTo}>{this.props.text}</Link>} 
            </div>
        );
    }
}