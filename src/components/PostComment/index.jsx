import Comment from '../Comment';
import CommentInputBox from '../CommentInputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './PostComment.module.scss';
import { useSelector } from 'react-redux';
import ProtectedButton from '../ProtectedButton';
import { useEffect } from 'react';
import commentService from '../../services/comment/comment.service';

function PostComment() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const topSearch = 'nga và mỹ';
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
  const postId = 773;
  useEffect(() => {
    const fetchComments = async () => {
      await commentService.getCommentsByPostId(postId);
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      <div data-e2e="search-comment-top" className={styles.DivCommentTop}>
        <span className={styles.SpanHint}>Tìm kiếm:</span>
        &nbsp;
        <span className={styles.SpanWordContainer}>
          <span data-e2e="search-comment-top-word" className={styles.SpanWord}>
            {topSearch}
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
      <div style={{ marginBottom: '90px' }}>
        {mockComments.map((comment) => (
          <Comment key={comment.id} data={comment} post={post} />
        ))}
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
            {isAuth ? (
              <div className={styles.DivCommentBarContainer}>
                <div className={styles.DivCommentInputWrapper}>
                  <CommentInputBox />
                </div>
              </div>
            ) : (
              <ProtectedButton>
                <div className={styles.DivLoginBar}>
                  <span className={styles.SpanLogin}>Đăng nhập</span> để bình
                  luận
                </div>
              </ProtectedButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
