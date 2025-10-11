import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Comment from '../Comment';

import { useEffect, useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDrawer } from '../../contexts/DrawerContext';
import Text from '../Text';
import CommentInputBox from '../CommentInputBox';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import socketClient from '../../utils/socketClient';
import commentService from '../../services/comment/comment.service';

const mockComments = [
  {
    id: 23,
    postId: 4,
    content: 'Đây là cái gì v',
    likes: 234,
    isLiked: false,
    isAuthorLiked: true,
    author: {
      id: 6,
      username: 'dang',
      name: 'Đăng đẹp trai',
      avatar:
        'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-dam.jpg',
      followers: 2345,
      likes: 2395,
    },
    replies: [
      {
        id: 23,
        postId: 4,
        content: 'Đây là qq gì v',
        likes: 234,
        isLiked: true,
        isAuthorLiked: false,
        author: {
          id: 7,
          username: 'dansg',
          name: 'Đăng đần',
          avatar:
            'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
          followers: 2345,
          likes: 2395,
        },
        parentId: 23,
        sender: 'other',
        createdAt: '2025-08-14 18:14:16.868',
      },
      {
        id: 26,
        postId: 4,
        content: 'Đây là qq gì v',
        likes: 234,
        isLiked: true,
        parentId: 23,
        isAuthorLiked: true,
        author: {
          id: 7,
          username: 'dangd',
          name: 'Đăng đần',
          avatar:
            'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
          followers: 2345,
          likes: 25,
        },
        sender: 'other',
        createdAt: '2025-08-14 18:14:16.868',
      },
    ],
    sender: 'other',
    createdAt: '2025-08-14 18:14:16.868',
  },
  {
    id: 28,
    postId: 4,
    content: 'Đây là cái gì v',
    likes: 234,
    isLiked: false,
    isAuthorLiked: true,
    author: {
      id: 6,
      username: 'dang',
      name: 'Đăng đẹp trai',
      avatar:
        'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-dam.jpg',
      followers: 2345,
      likes: 2395,
    },
    replies: [
      {
        id: 23,
        postId: 4,
        content: 'Đây là qq gì v',
        likes: 234,
        isLiked: true,
        isAuthorLiked: false,
        author: {
          id: 1,
          username: 'dansg',
          name: 'Đăng đần',
          avatar:
            'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
          followers: 2345,
          likes: 2395,
        },
        parentId: 23,
        sender: 'other',
        createdAt: '2025-08-14 18:14:16.868',
      },
      {
        id: 26,
        postId: 4,
        content: 'Đây là qq gì v',
        likes: 234,
        isLiked: true,
        parentId: 23,
        isAuthorLiked: true,
        author: {
          id: 8,
          username: 'dangd',
          name: 'Đăng đần',
          avatar:
            'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
          followers: 2345,
          likes: 25,
        },
        sender: 'other',
        createdAt: '2025-08-14 18:14:16.868',
      },
    ],
    sender: 'other',
    createdAt: '2025-08-14 18:14:16.868',
  },
];

const post = {
  author: {
    id: 7,
    avatar:
      'https://maunaildep.com/wp-content/uploads/2025/04/anh-gai-xinh-k10-chan-dai.jpg',
  },
  comments: 3,
};

function CommentTab({ postId }) {
  const { closeDrawer } = useDrawer();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [commentsList, setComments] = useState(mockComments);

  useEffect(() => {
    const fetchComments = async () => {
      await commentService.getCommentsByPostId(postId);
    };
    fetchComments();
  }, [postId]);
  //Lấy comments
  // const fetchComments = async () => {
  //   if (!postId) {
  //     setComments([]);
  //     return;
  //   }
  //   try {
  //     // const comments = await getCommentsByPostId(postId);
  //     const comments = [];
  //     setComments(comments);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Đăng comment
  // const handleSubmitComment = async (event) => {
  //   event.preventDefault();
  //   if (!content.trim()) return;

  //   try {
  //     await createComment(postId, { content });
  //     setContent('');
  //     fetchComments();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, [postId]);
  const addReplyToComments = (comments, parentId, newReply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComments(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  useEffect(() => {
    if (!postId) return;

    const pusher = socketClient;

    const channel = pusher.subscribe(`post-${postId}-comments`);
    channel.bind('new-comment', (newComment) => {
      if (newComment.parent_id === null) {
        setComments((prev) => [newComment, ...prev]);
      } else {
        setComments((prev) =>
          addReplyToComments(prev, newComment.parent_id, newComment)
        );
      }
    });
    channel.bind('updated-comment', (editComment) => {
      const updateCommentRecursively = (comments) => {
        return comments.map((comment) => {
          if (comment.id === editComment.id) {
            return {
              ...comment,
              content: editComment.content,
              isEdited: true,
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentRecursively(comment.replies),
            };
          }
          return comment;
        });
      };
      setComments((prev) =>
        updateCommentRecursively(prev, editComment.id, editComment.content)
      );
    });
    channel.bind('delete-comment', (commentId) => {
      const deleteCommentRecursively = (comments) => {
        return comments
          .filter((comment) => Number(comment.id) !== Number(commentId))
          .map((comment) => {
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: deleteCommentRecursively(comment.replies),
              };
            }
            return comment;
          });
      };
      setComments((prev) => deleteCommentRecursively(prev));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [postId]);

  return (
    <div
      className={clsx(
        styles.DivCommentSidebarTransitionWrapper,
        'comment-sidebar-transition-enter-done'
      )}
    >
      <section
        className={
          styles['BaseCommentContainerStyles-SectionCommentSidebarContainer']
        }
      >
        <div className={styles.DivCommentHeader}>
          <div className={styles.DivCommentHeaderTextWrapper}>
            <Text
              as="h4"
              weight={'bold'}
              className="StyledTUXText"
              style={{ fontSize: '15px', color: 'inherit' }}
            >
              Comments
            </Text>
            <Text
              as="h4"
              weight={'medium'}
              className="StyledTUXText"
              style={{ fontSize: '15px', color: 'inherit' }}
            >
              {`(${post.comments})`}
            </Text>
          </div>
          <div className={styles.DivCloseButtonWrapper}>
            <div className={styles['css-1dux0b3']}>
              <Button
                capsule
                size="medium"
                secondary
                className={styles['css-1rxmjnh']}
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  padding: '0px',
                  minWidth: '1.75rem',
                }}
                icon={<FontAwesomeIcon icon={faClose} />}
                onClick={closeDrawer}
              />
            </div>
          </div>
        </div>
        <div className={styles.DivCommentMain}>
          <div className={styles.DivCommentListContainer}>
            {commentsList.map(
              (comment) =>
                commentsList && (
                  <Comment
                    key={comment.id}
                    data={comment}
                    setComments={setComments}
                    post={post}
                  />
                )
            )}
          </div>
        </div>
        <div className={styles.DivCommentFooter}>
          {isAuth ? (
            <div className={styles.DivCommentBarContainer}>
              <div className={styles.DivCommentInputWrapper}>
                <CommentInputBox setComments={setComments} postId={postId} />
              </div>
            </div>
          ) : (
            <div className={styles.DivLoginBar}>
              <span className={styles.SpanLogin}>Đăng nhập</span> để bình luận
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

CommentTab.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentTab;
