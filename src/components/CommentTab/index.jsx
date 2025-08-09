import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Comment from '../Comment';
import {
  createComment,
  getCommentsByPostId,
} from '../../services/Comments/comments.service';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faFaceLaugh } from '@fortawesome/free-solid-svg-icons';
import CloseButton from '../CloseButton';
import { useDrawer } from '../../contexts/DrawerContext';
import Text from '../Text';

function CommentTab({ post_id }) {
  const { closeDrawer } = useDrawer();
  const [commentsList, setComments] = useState([]);
  const [content, setContent] = useState('');

  //Lấy comments
  const fetchComments = async () => {
    if (!post_id) {
      setComments([]);
      return;
    }
    try {
      // const comments = await getCommentsByPostId(post_id);
      const comments = [];
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  //Đăng comment
  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment(post_id, { content });
      setContent('');
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  return (
    <>
      <div className={styles.DivFeedNavigationContainer}>
        {/* Bổ sung sau */}
      </div>
      <div className={styles.DivCommentSidebarTransitionWrapper}>
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
                ({Array.isArray(commentsList.data) && commentsList.data.length})
              </Text>
              <CloseButton onClick={closeDrawer} />
            </div>
          </div>
          <div className={styles.DivCommentMain}>
            <div className={styles.DivCommentListContainer}>
              {Array.isArray(commentsList.data) &&
                commentsList.data.map(
                  (comment) =>
                    comment && (
                      <div
                        className={styles.DivCommentObjectWrapper}
                        key={comment.id}
                      >
                        <Comment data={comment} setComments={setComments} />
                      </div>
                    )
                )}
            </div>
          </div>
          <div className={styles.DivCommentFooter}>
            <div className={styles.DivCommentBarContainer}>
              <div className={clsx(styles.DivCommentInputWrapper, 'eqi68xd2')}>
                <form onSubmit={(event) => handleSubmitComment(event)}>
                  <div className={styles.DivCommentInputContainer}>
                    <div className={styles.DivLayoutContainer}>
                      <div className={styles.DivInputAreaContainer}>
                        <div className={styles.DivInputEditorContainer}>
                          <div
                            className={styles.DivInputAreaContainer}
                            style={{ minWidth: '100px' }}
                          >
                            <div className="DraftEditor-root">
                              <div className="public-DraftEditorPlaceholder-root">
                                <input
                                  type="text"
                                  placeholder="Add comment..."
                                  className={styles.InputContainer}
                                  value={content}
                                  onChange={(event) =>
                                    setContent(event.currentTarget.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="DraftEditor-editorContainer">
                              <div className="public-DraftEditor-content"></div>
                            </div>
                          </div>
                        </div>
                        <div className="TUXTooltip-reference">
                          <Button
                            icon={<FontAwesomeIcon icon={faAt} />}
                            mentionSuggest
                            secondary
                            isDefault
                            size="medium"
                          />
                        </div>
                        <div className="TUXTooltip-reference">
                          <Button
                            icon={<FontAwesomeIcon icon={faFaceLaugh} />}
                            emoji
                            secondary
                            isDefault
                            size="medium"
                          />
                        </div>
                      </div>
                    </div>
                    <button className={styles.PostButton} role="button">
                      Đăng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

CommentTab.propTypes = {
  post_id: PropTypes.number.isRequired,
};

export default CommentTab;
