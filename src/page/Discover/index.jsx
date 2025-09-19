import DiscoverCard from '../../components/VideoCard';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '../../components/Tabs/Tabs';
import styles from './Discover.module.scss';
import VideoList from '../../components/VideoList';
//Call API
function Discover() {
  return (
    <div
      className={styles['DivShareLayoutBase-StyledShareLayoutV2-ExploreLayout']}
    >
      <div className={styles.DivShareLayoutContentV2}>
        <Tabs defaultValue={'all'}>
          <div
            className={styles.DivCategoryListWrapper}
            style={{ top: '0px', width: '100%', zIndex: '10' }}
          >
            <div className={styles.DivCategoryListContainer}>
              <TabList>
                <div className={styles.DivCategoryList}>
                  <Tab value={'all'}>
                    <div className={styles.ButtonCategoryItemContainer}>
                      <span className={styles.SpanCategoryName}>Tất cả</span>
                    </div>
                  </Tab>
                  <Tab value={'sing&dance'}>
                    <div className={styles.ButtonCategoryItemContainer}>
                      <span className={styles.SpanCategoryName}>
                        Hát &amp; Nhảy
                      </span>
                    </div>
                  </Tab>
                  <Tab value={'comedy'}>
                    <div className={styles.ButtonCategoryItemContainer}>
                      <span className={styles.SpanCategoryName}>Hài kịch</span>
                    </div>
                  </Tab>
                </div>
              </TabList>
            </div>
          </div>

          <TabPanels>
            <TabPanel value={'all'}>
              <VideoList variant="discover" />
              <VideoList variant="discover" />
            </TabPanel>
            <TabPanel value={'sing&dance'}>
              <VideoList variant="discover" />
              <VideoList variant="discover" />
              <VideoList variant="discover" />
            </TabPanel>
            <TabPanel value={'comedy'}>
              <VideoList variant="discover" />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* DivCategoryListWrapper */}

        {/* DivThreeColumnContainer */}
      </div>
    </div>
  );
}

export default Discover;
