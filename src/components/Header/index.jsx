import React from 'react';
import clsx from 'clsx';
import './Header.css'; // nếu muốn style tách riêng

function Header() {
  return (
    <div
      id="app-header"
      className="css-1nhxvas-DivHeaderContainer e1hllgjf0"
      style={{ display: 'flex' }}
    >
      {/* Logo bên trái */}
      <div className="css-1a0rjhz-DivHeaderWrapperMain-StyledDivHeaderWrapperMainV2 e1hllgjf2">
        <div className="css-t4zcgw-DivHeaderLeftContainer etz70ds1">
          <a
            data-e2e="tiktok-logo"
            aria-label="Go to TikTok For You feed"
            className="css-1431rw4-StyledLinkLogo eq9n9li0 link-a11y-focus"
            href="/"
            style={{ position: 'relative' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="118"
              height="42"
              fill="currentColor"
              alt="TikTok"
            >
              <use xlinkHref="#logo-light-0ca3c974"></use>
            </svg>
            <strong>TikTok</strong>
          </a>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="css-3z2zs6-DivHeaderCenterContainer etz70ds0">
          <div className="css-1asq5wp-DivSearchFormContainer e1hi1cmj0">
            <form
              data-e2e="search-box"
              className="search-input css-1x92qzh-FormElement e14ntknm0"
              action="/search"
            >
              <input
                placeholder="Search"
                name="q"
                type="search"
                autoComplete="off"
                role="combobox"
                aria-label="Search"
                aria-expanded="false"
                aria-autocomplete="list"
                data-e2e="search-user-input"
                className="css-1geqepl-InputElement e14ntknm3"
              />
              <span className="css-gin10i-SpanSpliter e14ntknm6"></span>
              <button
                data-e2e="search-box-button"
                type="submit"
                aria-label="Search"
                className="css-16rv2p6-ButtonSearch e14ntknm7"
              >
                <div className="css-17iic05-DivSearchIconContainer e14ntknm8">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="rgba(255, 255, 255, .34)"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                    ></path>
                  </svg>
                </div>
              </button>
              <div className="css-1bmf8gr-DivInputBorder e14ntknm1"></div>
            </form>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="css-q8q040-DivHeaderRightContainer e1wisz610">
          {/* Upload */}
          <div
            data-e2e="upload-icon"
            className="css-szsi1x-DivUploadContainer eqzodb00"
          >
            <a
              href="/tiktokstudio/upload?from=upload"
              target="_self"
              aria-label="Upload a video"
              className="css-48yu17-StyledLink eqzodb02 link-a11y-focus"
            >
              <div className="css-1sacct4-DivUpload eqzodb04">
                <svg
                  className="css-qeydvm-StyledPlusIcon eqzodb05"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"
                  ></path>
                </svg>
                <span className="css-y3rt08-SpanUploadText eqzodb06">
                  Upload
                </span>
              </div>
            </a>
          </div>

          {/* Icon message */}
          <div className="css-32faz3">
            <div
              data-e2e="top-dm-icon"
              className="css-9j9jz0-DivMessageIconContainer e1nx07zo0"
            >
              <a
                aria-label="Open messages"
                className="link-a11y-focus"
                href="/"
              >
                <span>
                  <svg
                    className="css-y48l9g-StyledIcon e1nx07zo1"
                    width="1em"
                    height="1em"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div
            id="header-more-menu-icon"
            tabIndex={0}
            role="button"
            aria-label="Open settings menu"
            aria-expanded="false"
            aria-haspopup="true"
            data-e2e="profile-icon"
            className="css-15iwytd-DivProfileContainer ey7kxvi0"
            style={{
              backgroundImage:
                'url("https://p16-common-sign-useastred.tiktokcdn-eu.com/tos-useast2a-avt-0068-giso/7132002602534830107~tplv-tiktokx-cropcenter:720:720.jpeg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
