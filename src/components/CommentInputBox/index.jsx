import clsx from 'clsx';
import styles from './CommentInputBox.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import ChatInput from '../ChatInput';
import EmojiPanel from '../EmojiPanel';
import useClickOutside from '../../hooks/useClickOutside';
import { useSelector } from 'react-redux';
import commentService from '../../services/comment/comment.service';

// {
//     id: 28,
//     postId: 4,
//     content: 'Đây là cái gì v',
//     likes: 234,
//     isLiked: false,
//     isAuthorLiked: true,
//     author: {
//       id: 6,
//       username: 'dang',
//       name: 'Đăng đẹp trai',
//       avatar:
//         'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-dam.jpg',
//       followers: 2345,
//       likes: 2395,
//     },
//     replies: [
//       {
//         id: 23,
//         postId: 4,
//         content: 'Đây là qq gì v',
//         likes: 234,
//         isLiked: true,
//         isAuthorLiked: false,
//         author: {
//           id: 1,
//           username: 'dansg',
//           name: 'Đăng đần',
//           avatar:
//             'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
//           followers: 2345,
//           likes: 2395,
//         },
//         parentId: 23,
//         sender: 'other',
//         createdAt: '2025-08-14 18:14:16.868',
//       },

function CommentInputBox({ setComments = () => {}, replyId = null, postId }) {
  const [content, setContent] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);
  const handleTyping = (text) => setContent(text);
  const [submitTick, setSubmitTick] = useState(0);

  //Emoji
  const [openEmoji, setOpenEmoji] = useState(false);
  const buttonEmojiRef = useRef();
  const emojiPanelRef = useRef();
  const emojiInsertRef = useRef();

  useClickOutside([emojiPanelRef, buttonEmojiRef], () => {
    setOpenEmoji(false);
  });

  const handlePost = async () => {
    if (currentUser?.id && content.trim()) {
      const data = {
        postId: postId,
        authorId: currentUser.id,
        content,
        parentId: replyId,
      };
      await commentService.createComment(postId, data);
      setContent('');
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
              <ChatInput
                value={content}
                placeholder="Thêm bình luận..."
                onSubmit={handlePost}
                onChange={handleTyping}
                submitSignal={submitTick}
                submitEvenIfEmpty={true}
                onInsertEmojiRef={emojiInsertRef}
              />
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
            onClick={() => setOpenEmoji((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
          {openEmoji && (
            <EmojiPanel
              panelRef={emojiPanelRef}
              handleClickEmoji={(emoji) => emojiInsertRef.current?.(emoji)}
            />
          )}
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
