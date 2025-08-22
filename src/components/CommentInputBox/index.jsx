import clsx from 'clsx';
import styles from './CommentInputBox.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

function CommentInputBox() {
  const [content, setContent] = useState('');
  const contentEditableRef = useRef(null);

  const handlePost = () => {
    if (content.trim()) {
      //   onSubmit?.(content.trim()); // Gửi content ra ngoài qua props nếu có
      console.log(content.trim());
      setContent('');
      if (contentEditableRef.current) {
        contentEditableRef.current.innerText = '';
      }
    }
  };

  return (
    <div className={styles.DivCommentInputContainer}>
      <div className={styles.DivLayoutContainer}>
        <div data-e2e="comment-input" className={styles.DivInputAreaContainer}>
          <div
            data-e2e="comment-text"
            className={styles.DivInputEditorContainer}
          >
            <div className={styles.DivInputArea}>
              <div className="DraftEditor-root">
                {!content && (
                  <div className={styles['public-DraftEditorPlaceholder-root']}>
                    <div
                      className={styles['public-DraftEditorPlaceholder-inner']}
                      id="placeholder-bpr6b"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      Add comment...
                    </div>
                  </div>
                )}
                <div className={styles['DraftEditor-editorContainer']}>
                  <div
                    ref={contentEditableRef}
                    aria-describedby="placeholder-bpr6b"
                    className={clsx(
                      'notranslate',
                      styles['public-DraftEditor-content']
                    )}
                    contentEditable={true}
                    role="textbox"
                    spellCheck={false}
                    style={{
                      outline: 'none',
                      userSelect: 'text',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                    }}
                    onInput={(e) => setContent(e.currentTarget.textContent)}
                    suppressContentEditableWarning={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mention Button */}
          <div
            aria-label="“@” a user to tag them in your comments"
            aria-expanded="false"
            role="button"
            tabIndex={0}
            data-e2e="comment-at-icon"
            className={styles.DivMentionButton}
          >
            <FontAwesomeIcon icon={faAt} />
          </div>

          {/* Emoji Button */}
          <div
            aria-label="Click to add emojis"
            aria-expanded="false"
            role="button"
            tabIndex={0}
            data-e2e="comment-emoji-icon"
            className={styles.DivEmojiButton}
          >
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
        </div>
      </div>
      {/* Post Button */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Post"
        data-e2e="comment-post"
        className={clsx(styles.DivPostButton, {
          [styles.disabled]: !content.trim(),
        })}
        onClick={handlePost}
        style={{
          cursor: content.trim() ? 'pointer' : 'not-allowed',
          color: content.trim() ? 'var(--ui-text-primary)' : 'inherit',
        }}
      >
        Post
      </div>
    </div>
  );
}

export default CommentInputBox;
