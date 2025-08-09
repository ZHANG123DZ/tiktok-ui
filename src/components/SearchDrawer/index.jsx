import clsx from 'clsx';

import styles from './styles.module.scss';
import { useState } from 'react';

function SearchDrawer() {
  const searchContent = 'israel và iran mới nhất';
  const [search, setSearch] = useState(searchContent);
  const searchResult = [
    'israel và iran mới nhất',
    'israel và iran mới nhất 2025',
    'israel và iran mới nhất trực tiếp',
    'israel and iran',
    'israel và iran mới nhất live',
    'israel và iran mới nhất thầy hữu giang',
    'israel và iran mới nhất tin nóng',
    'israel và iran mới nhất việt nam',
  ];

  return (
    <div className={styles.DivSearchContainer}>
      <div className={styles.DivSearchDriverHeader}>
        <h2
          className="TUXText TUXText--tiktok-display TUXText--weight-bold"
          style={{ letterSpacing: '0.3px', color: 'inherit', fontSize: 20 }}
        >
          Search
        </h2>
      </div>

      <div className={styles.DivSearchFormContainer}>
        <form
          data-e2e="search-box"
          className={clsx('search-input', styles.FormElement)}
          action="/search"
        >
          <h1 style={{ display: 'none', alignItems: 'center' }}>{search}</h1>
          <input
            placeholder="Search"
            name="q"
            type="search"
            autoComplete="off"
            role="combobox"
            aria-controls=""
            aria-label="Search"
            aria-expanded="false"
            aria-autocomplete="list"
            data-e2e="search-user-input"
            className={styles.InputElement}
            value={search}
          />
          <div data-e2e="reset-search-form" className={styles.DivIconWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 48 48"
              fill="rgba(255, 255, 255, .34)"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 12px' }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46ZM15.1466 30.7323L21.8788 24.0001L15.1466 17.2679C14.756 16.8774 14.756 16.2442 15.1466 15.8537L15.8537 15.1466C16.2442 14.756 16.8774 14.756 17.2679 15.1466L24.0001 21.8788L30.7323 15.1466C31.1229 14.756 31.756 14.756 32.1466 15.1466L32.8537 15.8537C33.2442 16.2442 33.2442 16.8774 32.8537 17.2679L26.1214 24.0001L32.8537 30.7323C33.2442 31.1229 33.2442 31.756 32.8537 32.1466L32.1466 32.8537C31.756 33.2442 31.1229 33.2442 30.7323 32.8537L24.0001 26.1214L17.2679 32.8537C16.8774 33.2442 16.2442 33.2442 15.8537 32.8537L15.1466 32.1466C14.756 31.756 14.756 31.1229 15.1466 30.7323Z"
              />
            </svg>
          </div>
          <div className={styles.DivInputBorder}></div>
        </form>

        <ul
          id="header-sug-results"
          role="listbox"
          aria-label="Search suggestions"
          data-e2e="sug-container"
          className={styles.UlContainer}
        >
          {/* Mỗi <li> bên dưới nên render từ mảng data searchResult */}
          {searchResult.map((text, idx) => (
            <li
              key={idx}
              id={`sug-list-item-${idx}`}
              data-e2e="content-sug-item"
              role="option"
              className={styles.LiItemContainer}
            >
              <div className={styles.DivSearchIconContainer}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                  />
                </svg>
              </div>
              <div className={styles.DivSugItemContent}>
                <div className={styles.DivSugItemWrapper}>
                  <h4 className={styles.H4ItemTitle}>{text}</h4>
                  <div className={styles.DivActionContainer}>
                    <div
                      aria-label="more"
                      role="button"
                      tabIndex={0}
                      className={styles.DivMoreContainer}
                    >
                      <svg
                        className={styles.StyledMoreIcon}
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li
            id="sug-list-item-8"
            data-e2e="sug-more"
            role="option"
            className={styles.LiItemContainerMore}
          >
            <p className={styles.PMoreText}>
              View all results for “israel và iran mới nhất”
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchDrawer;
