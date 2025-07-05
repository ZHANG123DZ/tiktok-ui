import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faEllipsis,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';
import Avatar from '../Avatar';
import Popover from '../Popover';
import { useState } from 'react';
import Text from '../Text';

function Comment({ data, setComments }) {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <div className={styles.DivCommentItemWrapper}>
        <Avatar />
        <div className={styles.DivCommentContentWrapper}>
          <div className={styles.DivCommentHeaderWrapper}>
            <div className={styles.DivUsernameContentWrapper}>
              <div className={styles.DivTriggerWrapper}>
                <a href="#">
                  <Text
                    className="StyledTUXText"
                    weight={'medium'}
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px',
                      textWrap: 'nowrap',
                    }}
                  >
                    USER NAME
                  </Text>
                </a>
              </div>
              <Text
                className="StyledTUXText"
                weight={'medium'}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  textWrap: 'nowrap',
                }}
              ></Text>
            </div>
            <div className={styles.DivMore}>
              <div
                className={styles.DivMoreTriggerWrapper}
                style={{ cursor: 'pointer' }}
                onClick={() => setActive(true)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
              {isActive && (
                <Popover
                  data={data}
                  active={isActive}
                  setComments={setComments}
                  setActive={setActive}
                />
              )}
            </div>
          </div>
          <span>
            <Text as="p" className="StyledTUXText">
              {data.content}
            </Text>
          </span>
          <div className={styles.DivCommentSubContentSplitWrapper}>
            <div className={styles.DivCommentSubContentWrapper}>
              <Text
                as="span"
                className="StyledTUXText"
                weight={'normal'}
                style={{
                  color: 'var(--ui-text-3)',
                  fontSize: '14px',
                  textWrap: 'nowrap',
                }}
              >
                4-11
              </Text>
              <div className={styles.DivLikeContainer}>
                <FontAwesomeIcon icon={faHeart} />
                <Text
                  as="span"
                  className="StyledTUXText"
                  weight={'normal'}
                  style={{
                    color: 'var(--ui-text-3)',
                    fontSize: '14px',
                    textWrap: 'nowrap',
                    marginLeft: '5px',
                  }}
                >
                  277
                </Text>
              </div>
              <Text
                as="span"
                className="StyledTUXText"
                weight={'medium'}
                style={{
                  color: 'var(--ui-text-3)',
                  fontSize: '14px',
                  textWrap: 'nowrap',
                }}
                role="button"
              >
                Reply
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.DivReplyContainer}>
        <div className={styles.DivViewMoreRepliesWrapper}>
          <div className={styles.DivViewMoreRepliesAvatarSpacer}></div>
          <div className={styles.DivViewRepliesContainer}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </div>
    </>
  );
}

Comment.propTypes = {
  data: PropTypes.object.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default Comment;
