import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import ProcessedText from "~/components/core/ProcessedText";
import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";
import CTATransition from "~/components/core/CTATransition";

const STYLES_PROFILE_INTERNAL = css`
  width: 100%;
  padding: 64px 0px 0px 0px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_PROFILE = css`
  width: 100%;
  padding: 32px 32px 0px 32px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-shrink: 0;
  display: block;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 0px 24px;
  }
`;

const STYLES_PROFILE_INFO = css`
  padding: 32px 32px 0px 32px;
  display: flex;
  line-height: 1.3;
  width: 50%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_PROFILE_INFO_INTERNAL = css`
  display: flex;
  line-height: 1.3;
  margin: 0 auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_INFO_INTERNAL = css`
  display: block;
  width: 100%;
  max-width: 800px;
  text-align: left;
  margin-bottom: 48px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: calc(100% - 64px);
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.white};
  background-size: cover;
  background-position: 50% 50%;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 4px;
  margin: 8px 24px 0 0;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 64px;
    height: 64px;
    margin-right: 16px;
  }
`;

const STYLES_NAME_INTERNAL = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.semiBold};
  max-width: 100%;
  font-weight: 400;
  margin: 0 24px 0 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 8px;
  }
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  margin: 16px 0 16px 0;
  display: flex;
  width: 100%;
  color: ${Constants.system.grayBlack};
`;

const STYLES_STAT = css`
  margin-right: 8px;
  width: 112px;
  flex-shrink: 0;
`;

const STYLES_FLEX = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const STYLES_EXPLORE = css`
  margin: 160px auto 64px auto;
  height: 1px;
  width: 80px;
  background-color: ${Constants.system.gray};
`;

export default class Profile extends React.Component {
  state = {
    exploreSlates: [],
  };

  render() {
    const external = !this.props.onAction;
    let data = this.props.creator ? this.props.creator : this.props.data;
    let exploreSlates = this.props.exploreSlates;

    let total = 0;
    for (let slate of data.slates) {
      total += slate.data.objects.length;
    }
    return (
      <div>
        <div css={external ? STYLES_PROFILE_INFO : STYLES_PROFILE_INFO_INTERNAL}>
          <div
            css={STYLES_PROFILE_IMAGE}
            style={{ backgroundImage: `url('${data.data.photo}')` }}
          />
          <div css={STYLES_INFO_INTERNAL}>
            <div css={STYLES_FLEX} style={{ marginTop: 8 }}>
              <div css={STYLES_NAME_INTERNAL}>{Strings.getPresentationName(data)}</div>
              <div>{this.props.buttons}</div>
            </div>
            <div css={STYLES_STATS}>
              <div css={STYLES_STAT}>
                <div style={{ fontFamily: `${Constants.font.text}` }}>
                  {total} <span style={{ color: `${Constants.system.darkGray}` }}>Public data</span>
                </div>
              </div>
              <div css={STYLES_STAT}>
                <div style={{ fontFamily: `${Constants.font.text}` }}>
                  {data.slates.length}{" "}
                  <span style={{ color: `${Constants.system.darkGray}` }}>Public slates</span>
                </div>
              </div>
            </div>
            {data.data.body ? (
              <div css={STYLES_DESCRIPTION}>
                <ProcessedText text={data.data.body} />
              </div>
            ) : null}
          </div>
        </div>

        {this.state.visible && (
          <div>
            <CTATransition
              onClose={() => this.setState({ visible: false })}
              viewer={this.props.viewer}
              open={this.state.visible}
              redirectURL={`/_?scene=NAV_PROFILE&user=${data.username}`}
            />
          </div>
        )}

        {this.props.onAction ? (
          <div css={STYLES_PROFILE_INTERNAL} style={{ paddingTop: 0 }}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocks
                isOwner={this.props.isOwner}
                external={this.props.onAction ? false : true}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : null}
          </div>
        ) : (
          <div css={STYLES_PROFILE} style={{ paddingTop: 0 }}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocks
                isOwner={this.props.isOwner}
                external={this.props.onAction ? false : true}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : (
              <div>
                {" "}
                <p style={{ marginTop: 40, color: `${Constants.system.darkGray}` }}>
                  No publicly shared slates from @{data.username}.
                </p>
                <div css={STYLES_EXPLORE} />
                <SlatePreviewBlocks
                  slates={exploreSlates}
                  external={this.props.onAction ? false : true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
