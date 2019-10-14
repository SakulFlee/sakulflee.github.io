import React from "react";
import { Link } from "react-router-dom";

import "./Tag.scss";

type TagProperties = {
  text: string;
  tooltip: string;
  color: string;
  tooltipOnly?: boolean;
  active?: boolean;
  multiLine?: boolean;
  underline?: boolean;
  size?: string;
  linkTo?: string;
};

type TagState = {};

export default class Tag extends React.Component<TagProperties, TagState> {
  static defaultProps = {
    tooltipOnly: false,
    active: false,
    multiLine: false,
    underline: false,
    tooltipClass: "is-tooltip-info",
    textColor: "has-text-white",
    size: ""
  };

  render(): JSX.Element {
    let textColor =
      this.props.color === "warning" || this.props.color === "white"
        ? "has-text-black"
        : "has-text-white";

    let classes = `is-half is-family-code tooltip ${textColor} is-${this.props.color} is-tooltip-${this.props.color} ${this.props.size}`;
    if (!this.props.tooltipOnly) classes += " tag";
    if (this.props.underline) classes += " has-text-underlined";
    if (this.props.multiLine) classes += " is-tooltip-multiline";
    if (this.props.active) classes += " is-tooltip-active";

    if (this.props.linkTo == null) {
      return (
        <div className={classes} data-tooltip={this.props.tooltip}>
          {this.props.text}
        </div>
      );
    } else {
      return (
        <Link
          to={this.props.linkTo}
          className={`${textColor} ${classes}`}
          data-tooltip={this.props.tooltip}
        >
          {this.props.text}
        </Link>
      );
    }
  }
}
