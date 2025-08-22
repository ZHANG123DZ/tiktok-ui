import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Comment from '../Comment';

import { useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDrawer } from '../../contexts/DrawerContext';
import Text from '../Text';
import CommentInputBox from '../CommentInputBox';
import clsx from 'clsx';

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
  const [commentsList, setComments] = useState(mockComments);
  const [content, setContent] = useState('');

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
          <div className={styles.DivCommentBarContainer}>
            <div className={styles.DivCommentInputWrapper}>
              <CommentInputBox />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

CommentTab.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentTab;
