import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Article from '../../components/Article';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.scss';
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

  const [activeShare, setShare] = useState(false);

  const clickCommentsButton = () => {
    setActiveComments(!activeComments);
  };

  const clickShareButton = () => {
    setShare(!activeShare);
  };

  return (
    <>
      <ArticleContext.Provider
        value={{
          clickCommentsButton,
          clickShareButton,
          activeComments,
          activeShare,
        }}
      >
        <article className={styles.ArticleItemContainer} ref={ref}>
          <Article data={data} />
        </article>
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
