import clsx from 'clsx';
import styles from './Tag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHashtag,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import { useEffect, useRef, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import ShareModal from '../../components/ShareModal';
import tagService from '../../services/tag/tag.service';
import VideoList from '../../components/VideoList';
//Call API
function Tag() {
  const params = useParams();
  const [activeShare, setActiveShare] = useState(false);
  const [videos, setVideos] = useState([]);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const fetchTag = async () => {
      const tagData = await tagService.getTag(params.name);
      setVideos(tagData.posts);
      setTag(tagData);
    };
    fetchTag();
  }, []);

  return (
    <div className={styles['DivShareLayoutBase-StyledShareLayoutV2']}>
      <div className={styles.DivShareLayoutContentV2}>
        <div
          className={clsx(
            styles['DivShareLayoutHeader-StyledDivShareLayoutHeaderV2'],
            styles.e13xij562
          )}
        >
          <div className={clsx(styles.DivShareInfo, styles.evkpurd2)}>
            <div
              className={clsx(styles.DivDefaultImgContainer, styles.evkpurd9)}
            >
              <FontAwesomeIcon
                icon={faHashtag}
                style={{ width: '80px', height: '80px' }}
              />
            </div>

            <div
              className={clsx(styles.DivShareTitleContainer, styles.evkpurd3)}
            >
              <h1
                data-e2e="challenge-title"
                className={clsx(styles.H1ShareTitle, styles.evkpurd4)}
              >
                #{tag?.name}
              </h1>
              <h2
                data-e2e="challenge-vvcount"
                title="posts"
                className={clsx(styles.H2ShareSubTitleThin)}
              >
                {tag?.postCount} bài đăng
              </h2>
            </div>
          </div>

          <div className={clsx(styles.DivButtonsContainer, styles.e6y15916)}>
            <div
              role="button"
              aria-label="Share"
              data-e2e="share-btn"
              tabIndex={0}
              className={clsx(styles.DivShareActions, styles.e6y15919)}
            >
              <FontAwesomeIcon
                icon={faShare}
                className={styles.StyledShareIcon}
                style={{ width: '24px', height: '24px' }}
                onClick={() => setActiveShare(true)}
              />
            </div>
            {activeShare && (
              <ShareModal
                isSharePost={false}
                isOpen={activeShare}
                onClose={() => setActiveShare(false)}
              />
            )}
            <div
              role="button"
              aria-label="Actions"
              tabIndex={0}
              data-e2e="challenge-more"
              className={clsx(styles.DivMoreActions, styles.e6y159110)}
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ width: '24px', height: '24px' }}
              />
            </div>
          </div>
        </div>
        <VideoList variant="topic" videosData={videos} />
      </div>
    </div>
  );
}

export default Tag;
