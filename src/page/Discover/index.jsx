import DiscoverCard from '../../components/VideoCard';
import { Tab, TabList, TabPanels, Tabs } from '../../components/Tabs/Tabs';
import styles from './Discover.module.scss';

function Discover() {
  return (
    <div
      className={styles['DivShareLayoutBase-StyledShareLayoutV2-ExploreLayout']}
    >
      <div className={styles.DivShareLayoutContentV2}>
        <Tabs defaultIndex={0}>
          <div
            className={styles.DivCategoryListWrapper}
            style={{ top: '0px', width: '100%', zIndex: '10' }}
          >
            <div className={styles.DivCategoryListContainer}>
              <div className={styles.DivCategoryList}>
                <TabList>
                  <Tab className={styles.ButtonCategoryItemContainer}>
                    <span className={styles.SpanCategoryName}>Tất cả</span>
                  </Tab>
                  <Tab className={styles.ButtonCategoryItemContainer}>
                    <span className={styles.SpanCategoryName}>
                      Hát &amp; Nhảy
                    </span>
                  </Tab>
                  <Tab className={styles.ButtonCategoryItemContainer}>
                    <span className={styles.SpanCategoryName}>Hài kịch</span>
                  </Tab>
                </TabList>
              </div>
            </div>
          </div>

          <TabPanels>
            <div className={styles.DivThreeColumnContainer}>
              <div className={styles.DivVideoFeedV2}>
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
                <DiscoverCard />
              </div>
            </div>
            <div className={styles.DivThreeColumnContainer}>
              <div className={styles.DivVideoFeedV2}>
                <DiscoverCard />
              </div>
            </div>
            <div className={styles.DivThreeColumnContainer}>
              <div className={styles.DivVideoFeedV2}>
                <DiscoverCard />
              </div>
            </div>
          </TabPanels>
        </Tabs>
        {/* DivCategoryListWrapper */}

        {/* DivThreeColumnContainer */}
      </div>
    </div>
  );
}

export default Discover;
