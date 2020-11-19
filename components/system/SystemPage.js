import Head from "next/head";
import * as React from "react";
import * as SVG from "~/common/svg";
import * as SVGLogo from "~/common/logo";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_PAGE = css`
  background-color: ${Constants.system.white};
`;

const STYLES_BODY = css`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 0 auto;
  padding: 14px 24px 128px 336px;

  @media (max-width: 568px) {
    padding: 88px 24px 128px 24px;
  }
`;

const STYLES_SIDEBAR = css`
  padding: 88px 24px 128px 24px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 312px;
  background-color: ${Constants.system.white};
  overflow-y: scroll;
  margin-top: 50px;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.system.gray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${Constants.system.brand};
  }

  @media (max-width: 568px) {
    width: 100%;
    position: relative;
    overflow-y: auto;
  }
`;

const STYLES_LINK = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  font-weight: 400;
  display: block;
  margin-top: 8px;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LINK_ACTIVE = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.brand};
  text-decoration: none;
  font-weight: 400;
  display: block;
  margin-top: 8px;
`;

const STYLES_DESCRIPTION = css`
  font-weight: 400;
  margin-top: 4px;
  display: block;
  margin-bottom: 16px;
`;

const STYLES_LABEL = css`
  font-family: ${Constants.font.semiBold};
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  color: ${Constants.system.darkGray};
  letter-spacing: 0.6px;
`;

const SidebarLink = (props) => {
  return (
    <React.Fragment>
      <a
        css={props.url.includes(props.href) ? STYLES_LINK_ACTIVE : STYLES_LINK}
        href={props.href}
        target={props.target}
      >
        {props.title}
      </a>
      {props.children ? <div css={STYLES_DESCRIPTION}>{props.children}</div> : null}
    </React.Fragment>
  );
};

const STYLES_SMALL_LINK = css`
  padding: 0 16px 0 0px;
  font-size: 14px;
  font-family: "inter-semi-bold";
  margin-top: 11px;
  color: #666;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_NAV = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 24px;
  height: 100%;
  margin: 0 auto;
  z-index: 4;
  background-color: ${Constants.system.white};
  border-bottom: 1px solid ${Constants.system.darkGray}; ;
`;

const STYLES_NAV_LEFT = css`
  flex-shrink: 0;
  height: 24px;
`;

const STYLES_NAV_RIGHT = css`
  display: flex;
  justify-content: flex-end;
`;

const STYLES_MAIN = css`
  margin-top: 50px;
`;

const STYLES_NAV_LINKS = css`
  color: ${Constants.system.darkGray};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;
`;

export default class SystemPage extends React.Component {
  render() {
    const { title, description, url, children } = this.props;

    return (
      <div css={STYLES_PAGE}>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://slate.textile.io/ipfs/bafkreifknnc7rs7u7qrwc72dzaazzk3f3r4dnp3m4cuzdnr5zfckaet3se"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta
            property="twitter:image"
            content="https://slate.textile.io/ipfs/bafkreifknnc7rs7u7qrwc72dzaazzk3f3r4dnp3m4cuzdnr5zfckaet3se"
          />

          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        <div css={STYLES_NAV}>
          <div css={STYLES_NAV_LEFT}>
            <a css={STYLES_LINK} href="/" style={{ marginTop: 0 }}>
              <SVGLogo.Logo height="24px" style={{ marginBottom: 14 }} />
            </a>
          </div>
          <div css={STYLES_NAV_RIGHT}>
            <a
              href="https://slate.host/slate/built-with-slate"
              style={{ marginRight: 32 }}
              css={STYLES_NAV_LINKS}
            >
              Built with Slate
            </a>
            <a href="https://github.com/filecoin-project/slate" css={STYLES_NAV_LINKS}>
              Get involved
            </a>
          </div>
        </div>
        <div css={STYLES_MAIN}>
          <div css={STYLES_BODY}>{children}</div>
          <div css={STYLES_SIDEBAR}>
            <span css={STYLES_LABEL}>Built with Slate</span>
            <SidebarLink
              url={url}
              href="/_/experiences/create-address"
              title="CreateFilecoinAddress"
            />
            <SidebarLink
              url={url}
              href="/_/experiences/make-storage-deal"
              title="CreateFilecoinStorageDeal"
            />
            <SidebarLink
              url={url}
              href="/_/experiences/generate-powergate-token"
              title="CreateToken"
            />
            <SidebarLink
              url={url}
              href="/_/experiences/filecoin-wallet-balances"
              title="FilecoinBalancesList"
            />
            <SidebarLink
              url={url}
              href="/_/experiences/list-filecoin-deals"
              title="FilecoinDealsList"
            />
            <SidebarLink
              url={url}
              href="/_/experiences/filecoin-settings"
              title="FilecoinSettings"
            />
            <SidebarLink url={url} href="/_/experiences/friends-list" title="FriendsList" />
            <SidebarLink url={url} href="/_/experiences/peers-list" title="PeersList" />
            <SidebarLink
              url={url}
              href="/_/experiences/send-address-filecoin"
              title="SendAddressFilecoin"
            />
            <span css={STYLES_LABEL}>
              <br />
              <br />
              Design
            </span>
            <SidebarLink url={url} href="/_/system/colors" title="Colors" />
            <SidebarLink url={url} href="/_/system/icons" title="Icons" />
            <SidebarLink url={url} href="/_/system/typography" title="Typography" />

            <span css={STYLES_LABEL}>
              <br />
              <br />
              Components
            </span>
            <SidebarLink url={url} href="/_/system/buttons" title="Buttons" />
            <SidebarLink url={url} href="/_/system/checkboxes" title="Checkboxes" />
            <SidebarLink url={url} href="/_/system/datepicker" title="Datepicker" />
            <SidebarLink url={url} href="/_/system/dropdowns" title="Dropdowns" />
            <SidebarLink url={url} href="/_/system/globe" title="Globe" />
            <SidebarLink url={url} href="/_/system/hover-tile" title="Hover Tile" />
            <SidebarLink url={url} href="/_/system/inputs" title="Inputs" />
            <SidebarLink url={url} href="/_/system/loaders" title="Loaders" />
            <SidebarLink url={url} href="/_/system/modals" title="Modals" />
            <SidebarLink url={url} href="/_/system/radios" title="Radios" />
            <SidebarLink url={url} href="/_/system/sliders" title="Sliders" />
            <SidebarLink url={url} href="/_/system/tables" title="Tables" />
            <SidebarLink url={url} href="/_/system/tabs" title="Tabs" />
            <SidebarLink url={url} href="/_/system/toggles" title="Toggles" />
            <SidebarLink url={url} href="/_/system/tooltips" title="Tooltips" />

            <div
              css={STYLES_SMALL_LINK}
              style={{ marginTop: 48 }}
              onClick={() => {
                window.open("https://github.com/filecoin-project/slate");
              }}
            >
              <SVG.ExpandBox height="12px" style={{ marginRight: 10 }} />
              View source
            </div>
          </div>
        </div>
      </div>
    );
  }
}
