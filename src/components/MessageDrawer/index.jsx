import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import styles from './MessageDrawer.module.scss';
import { faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedConversation } from '../../features/conversation/conversationSlice';
import { getConversations } from '../../features/conversation/getAllAsync';
import formatRelativeTime from '../../function/formatRelativeTime';
import { useSearchParams } from 'react-router-dom';
import socketClient from '../../utils/socketClient';

export default function MessageDrawer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const conversations = useSelector(
    (state) => state.conversation.conversations
  );
  const pendingConversations = useSelector(
    (state) => state.conversation.pendingConversations
  );

  const [isRequest, setIsRequest] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  //Pusher
  useEffect(() => {
    if (!currentUser?.id) return;
    const pusher = socketClient;

    const channelOfUser = pusher.subscribe(`conversation-of-${currentUser.id}`);
    channelOfUser.bind('new-conversation', async (newConversation) => {
      console.log(newConversation);
      // setConversations((prev) => {
      //   return [newConversation, ...prev];
      // });
    });

    channelOfUser.bind('update-conversation', async (updatedConversation) => {
      // setConversations((prev) => {
      //   return prev.map((c) =>
      //     c.id === updatedConversation.id ? updatedConversation : c
      //   );
      // });
    });

    channelOfUser.bind('delete-conversation', async (conversationId) => {
      // setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    });

    return () => {
      channelOfUser.unbind_all();
      pusher.unsubscribe(channelOfUser.name);
    };
  }, [currentUser?.id]);

  return (
    <div className={styles.DivDrawerContainer}>
      <div className={styles.DivMessageDrawerContainer}>
        <div mode="2" className={styles.DivConversationListContainer}>
          <div className={styles.DivFullSideNavConversationHeader}>
            {isRequest && (
              <Button
                size="medium"
                capsule
                secondary
                backIcon
                icon={<FontAwesomeIcon icon={faChevronLeft} fontSize={12} />}
                onClick={() => setIsRequest(false)}
              />
            )}
            <h2
              className="TUXText TUXText--tiktok-display TUXText--weight-bold css-1alhq8z-StyledTUXText e1vx58lt0"
              style={{ color: 'inherit', fontSize: 20, letterSpacing: '0.3px' }}
            >
              {isRequest ? 'Tin nhắn' : 'Yêu cầu tin nhắn'}
            </h2>
          </div>
          <div className={styles.DivListContent}>
            <div
              className={styles['DivScrollContainer-StyledScroll']}
              style={{
                height: '100%',
                paddingLeft: 'unset',
                paddingRight: 0,
              }}
            >
              <div
                className={styles.DivScrollWrapper}
                style={{ height: '100%', overflow: 'auto' }}
              >
                {!isRequest ? (
                  <>
                    {/* Nếu tài khoản này không có một cuộc hội thoại nào */}
                    {conversations.length === 0 && (
                      <div
                        className={styles.DivFullSideNavEmptyMessageContainer}
                      >
                        <div
                          className={
                            styles.DivFullSideNavEmptyMessageIconContainer
                          }
                        >
                          <svg
                            fill="currentColor"
                            color="var(--ui-shape-neutral-3)"
                            fontSize="24"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                          >
                            <path d="M24 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 24 7Zm0 19c10.3 0 16.67 6.99 17 17 .02.55-.43 1-1 1h-2c-.54 0-.98-.45-1-1-.3-7.84-4.9-13-13-13s-12.7 5.16-13 13c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1 .33-10.01 6.7-17 17-17Z" />
                          </svg>
                        </div>
                        <p
                          className="TUXText TUXText--tiktok-sans TUXText--weight-medium css-1658qcl-StyledTUXText e1vx58lt0"
                          style={{
                            color: 'inherit',
                            fontSize: 14,
                            letterSpacing: '0.0938px',
                          }}
                        >
                          No messages yet
                        </p>
                      </div>
                    )}
                    {/* Các request */}
                    {pendingConversations && (
                      <div
                        className={styles.DivRequestGroup}
                        onClick={() => setIsRequest(true)}
                      >
                        <div className={styles.DivRequestInfo}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="64"
                            height="64"
                            className={styles.StyledRequestAvatar}
                          >
                            {/* Vòng tròn nền */}
                            <circle cx="32" cy="32" r="32" fill="#5A6195" />

                            {/* Bong bóng chat */}
                            <path
                              d="M32 18C24.27 18 18 23.52 18 30c0 3.31 1.71 6.28 4.48 8.4l-.78 5.59a1 1 0 0 0 1.47 1.01l6.19-3.13c.87.18 1.79.27 2.73.27 7.73 0 14-5.52 14-12s-6.27-12-14-12Z"
                              fill="#fff"
                            />
                            <rect
                              x="26"
                              y="28"
                              width="12"
                              height="2"
                              rx="1"
                              fill="#5A6195"
                            />
                            <rect
                              x="26"
                              y="33"
                              width="8"
                              height="2"
                              rx="1"
                              fill="#5A6195"
                            />
                          </svg>
                          <div className={styles.DivInfoTextWrapper}>
                            {/* Title Conversation */}
                            <p className={styles.PInfoNickname}>
                              Yêu cầu tin nhắn
                            </p>
                            {/* Last Message */}
                            <p className={styles.PInfoExtractTime}>
                              <span className={styles.SpanInfoExtract}>
                                Bạn có {pendingConversations.length} yêu cầu
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* New Message */}
                        <div className={styles.SpanNewMessage}>
                          {pendingConversations.length}
                        </div>
                      </div>
                    )}
                    {/* Conversation */}
                    {conversations.map((c, i) => (
                      <div
                        key={c.id}
                        id="more-acton-icon-0"
                        tabIndex={i}
                        data-e2e="chat-list-item"
                        className={styles.DivItemWrapper}
                        onClick={() => {
                          searchParams.set('conversation', c.id);
                          setSearchParams(searchParams);
                          dispatch(setSelectedConversation(c));
                        }}
                      >
                        <div className={styles.DivItemInfo}>
                          <div className={styles.DivInfoAvatarWrapper}>
                            <span
                              shape="circle"
                              data-e2e=""
                              className={`${styles.SpanAvatarContainer} e1e9er4e0`}
                              style={{ width: '48px', height: '48px' }}
                            >
                              <img
                                loading="lazy"
                                alt=""
                                src={c.avatar}
                                className={styles.ImgAvatar}
                              />
                            </span>
                            <div className={styles.DivInfoAvatarMask}></div>
                          </div>

                          <div className={styles.DivInfoTextWrapper}>
                            <p className={styles.PInfoNickname}>{c.name}</p>
                            <p className={styles.PInfoExtractTime}>
                              <span className={styles.SpanInfoExtract}>
                                {c.lastMessage?.content}
                              </span>
                              <span className={styles.SpanInfoTime}>
                                {c.lastMessage?.createdAt
                                  ? formatRelativeTime(c.lastMessage?.createdAt)
                                  : ''}
                              </span>
                            </p>
                          </div>
                        </div>
                        {c.unreadCount > 0 && (
                          <div className={styles.SpanNewMessage}>
                            {c.unreadCount}
                          </div>
                        )}
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className={styles.StyledMoreActionIcon}
                        />
                      </div>
                    ))}
                    {/* Danh sách các cuộc hội thoại */}
                  </>
                ) : (
                  pendingConversations.map((req, i) => (
                    <div
                      key={req.id}
                      id="more-acton-icon-0"
                      tabIndex={i}
                      data-e2e="chat-list-item"
                      className={styles.DivItemWrapper}
                      onClick={() => dispatch(setSelectedConversation(req))}
                    >
                      <div className={styles.DivItemInfo}>
                        <div className={styles.DivInfoAvatarWrapper}>
                          <span
                            shape="circle"
                            data-e2e=""
                            className={`${styles.SpanAvatarContainer} e1e9er4e0`}
                            style={{ width: '48px', height: '48px' }}
                          >
                            <img
                              loading="lazy"
                              alt=""
                              src={req.avatar}
                              className={styles.ImgAvatar}
                            />
                          </span>
                          <div className={styles.DivInfoAvatarMask}></div>
                        </div>

                        <div className={styles.DivInfoTextWrapper}>
                          <p className={styles.PInfoNickname}>{req.name}</p>
                          <p className={styles.PInfoExtractTime}>
                            <span className={styles.SpanInfoExtract}>
                              {req.lastMessage?.content}
                            </span>
                            <span className={styles.SpanInfoTime}>
                              {req.lastMessage?.createdAt}
                            </span>
                          </p>
                        </div>
                      </div>
                      {req.unreadCount > 0 && (
                        <div className={styles.SpanNewMessage}>
                          {req.unreadCount}
                        </div>
                      )}
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className={styles.StyledMoreActionIcon}
                      />
                    </div>
                  ))
                )}
                {
                  <div aria-live="off" className={styles.DivMessageStatus}>
                    <div></div>
                    <div></div>
                  </div>
                }
              </div>
              <div
                className={styles.DivScrollBar}
                style={{
                  height: '665.2px',
                  transform:
                    'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(1.0006) translateZ(-0.000600906px) translateZ(-2px)',
                }}
              >
                <div className={styles.DivScrollBarThumb}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
