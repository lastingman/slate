import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_PRIMARY_TAB_GROUP = css`
  font-size: ${Constants.typescale.lvl2};
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px 0px 24px 0px;
  }
`;

const STYLES_SECONDARY_TAB_GROUP = css`
  font-size: ${Constants.typescale.lvl1};
  margin: 36px 0px 24px 0px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px 0px 24px 0px;
  }
`;

const STYLES_TAB = css`
  padding: 8px;
  margin-right: 16px;
  display: inline-block;
  user-select: none;
  border-radius: 4px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 12px;
    font-size: ${Constants.typescale.lvl1};
  }

  :last-child {
    margin-right: 0px;
  }
`;

export class SecondaryTabGroup extends React.Component {
  render() {
    return (
      <div css={STYLES_SECONDARY_TAB_GROUP} style={this.props.style}>
        {this.props.tabs.map((tab, i) => (
          <div
            css={STYLES_TAB}
            key={this.props.onAction ? tab.title : tab}
            style={{
              color:
                this.props.disabled || this.props.value === i
                  ? Constants.system.black
                  : "rgba(0,0,0,0.25)",
              cursor: this.props.disabled ? "auto" : "pointer",
              ...this.props.itemStyle,
              backgroundColor: this.props.value === i ? Constants.system.white : "transparent",
            }}
            onClick={
              this.props.disabled || this.props.value === i
                ? () => {}
                : this.props.onAction
                ? () => this.props.onAction({ type: "NAVIGATE", value: tab.value })
                : () => this.props.onChange(i)
            }
          >
            {this.props.onAction ? tab.title : tab}
          </div>
        ))}
      </div>
    );
  }
}

export class PrimaryTabGroup extends React.Component {
  render() {
    return (
      <div css={STYLES_PRIMARY_TAB_GROUP} style={this.props.style}>
        {this.props.tabs.map((tab, i) => (
          <div
            css={STYLES_TAB}
            key={this.props.onAction ? tab.title : tab}
            style={{
              padding: "8px 16px 8px 0",
              color:
                this.props.disabled || this.props.value === i
                  ? Constants.system.black
                  : "rgba(0,0,0,0.25)",
              cursor: this.props.disabled ? "auto" : "pointer",
              fontFamily: Constants.font.medium,
              ...this.props.itemStyle,
            }}
            onClick={
              this.props.disabled || this.props.value === i
                ? () => {}
                : this.props.onAction
                ? () => this.props.onAction({ type: "NAVIGATE", value: tab.value })
                : () => this.props.onChange(i)
            }
          >
            {this.props.onAction ? tab.title : tab}
          </div>
        ))}
      </div>
    );
  }
}
