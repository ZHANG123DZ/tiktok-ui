import React from 'react';
import Comment from '../Comment';
import CommentInputBox from '../CommentInputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './PostComment.module.scss';

function PostComment() {
  return (
    <div>
      <div data-e2e="search-comment-top" className={styles.DivCommentTop}>
        <span className={styles.SpanHint}>Tìm kiếm:</span>
        &nbsp;
        <span className={styles.SpanWordContainer}>
          <span data-e2e="search-comment-top-word" className={styles.SpanWord}>
            nga và mỹ
          </span>
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.StyledMagnifyingGlass}
          />
        </span>
        <div className={styles.DivActionContainer}>
          <div
            aria-label="thêm"
            role="button"
            tabIndex={0}
            className={styles.DivMoreContainer}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '80px' }}>
        <Comment />
      </div>

      <div
        className={styles.DivBottomCommentContainer}
        style={{
          position: 'fixed',
          width: '484px',
          zIndex: '2',
          bottom: '0px',
          marginLeft: '0px',
        }}
      >
        <div className={styles.DivBorder}></div>
        <div className={styles.DivCommentInputContainer}>
          <div className={styles.DivLayoutContainer}>
            <CommentInputBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
