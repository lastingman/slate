import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";

import ProcessedText from "~/components/core/ProcessedText";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const placeholder =
  "https://slate.textile.io/ipfs/bafkreidq27ycqubd4pxbo76n3rv5eefgxl3a2lh3wfvdgtil4u47so3nqe";

const STYLES_IMAGE_ROW = css`
  overflow: hidden;
  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
    margin: 0 -8px;
  }
`;

const STYLES_ITEM_BOX = css`
  height: calc(33.33% - 4px);
  overflow: hidden;
  margin: 0px 0px 4px 4px;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset;
  cursor: pointer;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 8px;
  }
`;

const STYLES_PLACEHOLDER = css`
  width: 100%;
  height: 320px;
  background-size: cover;
  background-position: 50% 50%;
  margin-bottom: 4px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 100%;
  }
`;

export class SlatePreviewRow extends React.Component {
  render() {
    let numItems = this.props.numItems || 4;
    let objects;
    if (this.props.slate.data.objects.length === 0) {
      objects = [
        <div
          css={STYLES_PLACEHOLDER}
          style={{
            backgroundImage: `url(${placeholder})`,
            ...this.props.imageStyle,
          }}
        />,
      ];
    } else {
      let trimmed =
        this.props.slate.data.objects.length > numItems
          ? this.props.slate.data.objects.slice(1, numItems)
          : this.props.slate.data.objects.slice(1, this.props.slate.data.objects.length);
      objects = trimmed.map((each) => (
        <div key={each.id} css={STYLES_ITEM_BOX}>
          <SlateMediaObjectPreview
            blurhash={each.blurhash}
            charCap={30}
            centeredImage
            type={each.type}
            url={each.url}
            style={this.props.previewStyle}
            title={each.title || each.name}
            iconOnly={this.props.small}
            coverImage={each.coverImage}
          />
        </div>
      ));
    }
    return (
      <div css={STYLES_IMAGE_ROW} style={{ height: `100%`, ...this.props.containerStyle }}>
        {objects}
      </div>
    );
  }
}

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_CREATE_NEW = css`
  color: ${Constants.system.darkGray};
  box-shadow: 0px 0px 0px 1px rgba(229, 229, 229, 0.5) inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0;
    border-radius: 8;
    width: 100%;
    height: 100%;
  }
`;

const STYLES_BLOCK = css`
  border-radius: 4px;
  box-shadow: 0 0 40px 0 ${Constants.system.shadow};
  padding: 24px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  height: 440px;
  width: 100%;
  background-color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto;
    height: auto;
  }
`;

const STYLES_TITLE_LINE = css`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 8px;
  overflow-wrap: break-word;
  justify-content: space-between;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_TAG = css`
  margin-right: 16px;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid ${Constants.system.black};
  color: ${Constants.system.black};
  font-family: ${Constants.font.semiBold};
  font-size: 0.9rem;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${Constants.system.darkGray};

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_CONTEXT_MENU = css`
  position: absolute;
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  height: 24px;
`;

const STYLES_PREVIEW = css`
  display: flex;
`;

const STYLES_OBJECT_COUNT = css`
  width: auto;
  font-size: ${Constants.typescale.lvlN1};
  color: ${Constants.system.darkGray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 8px 0 16px 0;
  }
`;

export class SlatePreviewBlock extends React.Component {
  _ref;
  _test;

  state = {
    showMenu: false,
    copyValue: "",
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
      this._handleHide();
    });
  };

  _handleClick = (e) => {
    e.stopPropagation();
    if (this.state.showMenu) {
      this._handleHide();
      return;
    }
    this.setState({ showMenu: true });
  };

  _handleHide = (e) => {
    this.setState({ showMenu: false });
  };

  render() {
    let count = 0;
    const { objects } = this.props.slate.data;
    if (objects.length > 4) {
      const set = this.props.slate.data.objects.slice(0, 4);
      for (let object of set) {
        if (object.type.startsWith("image/") && !object.type.startsWith("image/svg")) {
          count++;
        }
      }
    }
    let first = objects ? objects[0] : null;
    let contextMenu = (
      <React.Fragment>
        <Boundary
          captureResize={true}
          captureScroll={false}
          enabled
          onOutsideRectEvent={this._handleHide}
        >
          <PopoverNavigation
            style={{
              top: "16px",
              right: "-12px",
            }}
            navigation={
              this.props.isOwner
                ? [
                    {
                      text: "Copy URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          Strings.getURLFromPath(
                            `/${this.props.username}/${this.props.slate.slatename}`
                          )
                        ),
                    },
                    {
                      text: "Copy slate ID",
                      onClick: (e) => this._handleCopy(e, this.props.slate.id),
                    },
                  ]
                : [
                    {
                      text: "Copy URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          Strings.getURLFromPath(
                            `/${this.props.username}/${this.props.slate.slatename}`
                          )
                        ),
                    },
                  ]
            }
          />
        </Boundary>
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </React.Fragment>
    );

    return (
      <div css={STYLES_BLOCK}>
        {this.props.external ? (
          <React.Fragment>
            <span css={STYLES_MOBILE_HIDDEN}>
              <div css={STYLES_TITLE_LINE}>
                <div css={STYLES_TITLE} style={{ width: `85%` }}>
                  {this.props.slate.data.name}
                </div>
                <div css={STYLES_OBJECT_COUNT}>
                  {objects.length} file
                  {objects.length > 1 ? "s" : ""}
                </div>
              </div>
              {this.props.slate.data.body ? (
                <div css={STYLES_BODY}>{this.props.slate.data.body}</div>
              ) : (
                <div style={{ height: "41px" }} />
              )}
              {objects.length === 1 || (objects.length != 0 && count <= 3) ? (
                <div
                  style={{
                    width: "100%",
                    height: 320,
                  }}
                >
                  <SlateMediaObjectPreview
                    blurhash={first.blurhash}
                    centeredImage
                    charCap={30}
                    type={first.type}
                    url={first.url}
                    title={first.title || first.name}
                    coverImage={first.coverImage}
                  />
                </div>
              ) : first ? (
                <div css={STYLES_PREVIEW}>
                  <div
                    style={{
                      width: "75%",
                      height: 320,
                    }}
                  >
                    <SlateMediaObjectPreview
                      blurhash={first.blurhash}
                      centeredImage
                      charCap={30}
                      type={first.type}
                      url={first.url}
                      title={first.title || first.name}
                      coverImage={first.coverImage}
                    />
                  </div>
                  <div
                    style={{
                      width: `25%`,
                      height: 324,
                    }}
                  >
                    <SlatePreviewRow {...this.props} previewStyle={this.props.previewStyle} />
                  </div>
                </div>
              ) : (
                <div
                  css={STYLES_PLACEHOLDER}
                  style={{
                    backgroundImage: `url(${placeholder})`,
                    ...this.props.imageStyle,
                  }}
                />
              )}
            </span>
            <span css={STYLES_MOBILE_ONLY}>
              <div css={STYLES_TITLE}>{this.props.slate.data.name}</div>
              <div css={STYLES_OBJECT_COUNT}>
                {objects.length} file
                {objects.length > 1 ? "s" : ""}
              </div>
              <div
                style={{
                  width: "100%",
                  height: `320px`,
                }}
              >
                {first ? (
                  <SlateMediaObjectPreview
                    blurhash={first.blurhash}
                    centeredImage
                    charCap={30}
                    type={first.type}
                    url={first.url}
                    title={first.title || first.name}
                    coverImage={first.coverImage}
                  />
                ) : (
                  <div
                    css={STYLES_PLACEHOLDER}
                    style={{
                      backgroundImage: `url(${placeholder})`,
                      ...this.props.imageStyle,
                    }}
                  />
                )}
              </div>
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div css={STYLES_TITLE_LINE}>
              <div css={STYLES_TITLE}>{this.props.slate.data.name}</div>
              <div style={{ height: "16px" }}>
                {this.props.isOwner && !this.props.slate.data.public ? (
                  <SVG.SecurityLock
                    height="16px"
                    style={{ color: Constants.system.grayBlack, marginRight: 24 }}
                  />
                ) : null}
              </div>
              {this.props.username ? (
                <div
                  style={{ marginLeft: "auto" }}
                  ref={(c) => {
                    this._test = c;
                  }}
                >
                  <div css={STYLES_ICON_BOX} onClick={this._handleClick}>
                    <SVG.MoreHorizontal height="24px" />
                    {this.state.showMenu ? (
                      <div css={STYLES_CONTEXT_MENU}>{contextMenu}</div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <span css={STYLES_MOBILE_HIDDEN}>
              <div style={{ height: "44px" }}>
                {this.props.slate.data.body ? (
                  <div css={STYLES_BODY}>{this.props.slate.data.body}</div>
                ) : this.props.isOwner ? (
                  <div style={{ height: "44px" }} />
                ) : (
                  <div style={{ height: "40px" }} />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: `304px`,
                }}
              >
                {first ? (
                  <SlateMediaObjectPreview
                    blurhash={first.blurhash}
                    centeredImage
                    charCap={30}
                    type={first.type}
                    url={first.url}
                    title={first.title || first.name}
                    coverImage={first.coverImage}
                  />
                ) : this.props.isOwner ? (
                  <div css={STYLES_CREATE_NEW} key="add-files">
                    <SVG.Plus height="24px" />
                    <div>Add Files</div>
                  </div>
                ) : (
                  <div
                    css={STYLES_PLACEHOLDER}
                    style={{
                      backgroundImage: `url(${placeholder})`,
                      ...this.props.imageStyle,
                    }}
                  />
                )}
              </div>
            </span>
            <span css={STYLES_MOBILE_ONLY}>
              <div
                css={STYLES_TITLE}
                style={{ marginBottom: 8, fontSize: Constants.typescale.lvl1 }}
              >
                {this.props.slate.data.name}
              </div>
              <div css={STYLES_OBJECT_COUNT} style={{ marginBottom: 16, fontSize: 12 }}>
                {objects.length} file
                {objects.length === 1 ? "" : "s"}
              </div>
              <div
                style={{
                  width: "100%",
                  height: `300px`,
                }}
              >
                {first ? (
                  <SlateMediaObjectPreview
                    blurhash={first.blurhash}
                    centeredImage
                    charCap={30}
                    type={first.type}
                    url={first.url}
                    style={{ borderRadius: 8 }}
                    imageStyle={{ borderRadius: 8 }}
                    title={first.title || first.name}
                    coverImage={first.coverImage}
                  />
                ) : this.props.isOwner ? (
                  <div css={STYLES_CREATE_NEW} key="add-files">
                    <SVG.Plus height="24px" />
                    <div>Add Files</div>
                  </div>
                ) : (
                  <div
                    css={STYLES_PLACEHOLDER}
                    style={{
                      backgroundImage: `url(${placeholder})`,
                      ...this.props.imageStyle,
                    }}
                  />
                )}
              </div>
            </span>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const STYLES_SLATES = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding-bottom: 48px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

export default class SlatePreviewBlocks extends React.Component {
  render() {
    return (
      <div css={STYLES_SLATES}>
        {this.props.external
          ? this.props.slates.map((slate) => (
              <a
                key={slate.id}
                style={{ textDecoration: "none", color: Constants.system.black }}
                href={
                  this.props.username
                    ? `/${this.props.username}/${slate.slatename}`
                    : `/${slate.username}/${slate.slatename}`
                }
              >
                <SlatePreviewBlock
                  isOwner={this.props.isOwner}
                  username={this.props.username}
                  slate={slate}
                  external={this.props.external}
                />
              </a>
            ))
          : this.props.slates.map((slate) => (
              <div
                key={slate.id}
                onClick={() =>
                  this.props.onAction({
                    type: "NAVIGATE",
                    value: "NAV_SLATE",
                    data: { decorator: "SLATE", ...slate },
                  })
                }
              >
                <SlatePreviewBlock
                  isOwner={this.props.isOwner}
                  username={this.props.username}
                  slate={slate}
                  external={this.props.external}
                />
              </div>
            ))}
      </div>
    );
  }
}

// this.props.slate.data.public ? (
//                   <div
//                     css={STYLES_TAG}
//                     style={{
//                       borderColor: Constants.system.brand,
//                       color: Constants.system.brand,
//                     }}
//                   >
//                     Public
//                   </div>
//                 ) : (
//                   <div
//                     css={STYLES_TAG}
//                     style={{
//                       color: Constants.system.darkGray,
//                       borderColor: Constants.system.darkGray,
//                     }}
//                   >
//                     Private
//                   </div>
//                 )
