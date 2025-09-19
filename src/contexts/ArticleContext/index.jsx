import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.scss';
import MainVideoCard from '../../components/MainVideoCard/MainVideoCard';
import ActionBar from '../../components/ActionBar/ActionBar';
import ShareModal from '../../components/ShareModal';
const ArticleContext = createContext();

export const ArticleProvider = ({
  data,
  activeComments,
  setActiveComments,
  setPost,
}) => {
  const { ref, inView, entry } = useInView();
  useEffect(() => {
    if (inView) setPost(data);
  }, [data, inView, setPost]);

  const [activeShare, setActiveShare] = useState(false);

  const clickCommentsButton = () => {
    setActiveComments((prev) => {
      if (prev) {
        setPost(null);
      } else {
        setPost(data);
      }
      return !prev;
    });
  };

  const clickShareButton = () => {
    setActiveShare(!activeShare);
  };
  const autoScroll = () => {
    if (entry?.target?.nextElementSibling) {
      entry.target.nextElementSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <ArticleContext.Provider
        value={{
          data,
          clickCommentsButton,
          clickShareButton,
          activeComments,
          activeShare,
        }}
      >
        <article className={styles.ArticleItemContainer} ref={ref}>
          <div className={styles.DivContentFlexLayout}>
            <MainVideoCard data={data} onEnded={autoScroll} />
            <ActionBar data={data} />
          </div>
        </article>
        {activeShare && (
          <ShareModal
            isOpen={activeShare}
            onClose={() => setActiveShare(false)}
            shareToFriends={true}
          />
        )}
      </ArticleContext.Provider>
    </>
  );
};

ArticleProvider.propTypes = {
  data: PropTypes.object.isRequired,
  activeComments: PropTypes.bool.isRequired,
  setActiveComments: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
};

export const useArticle = () => useContext(ArticleContext);
