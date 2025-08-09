import { Tab, TabList, TabPanels, Tabs } from '../../components/Tabs/Tabs';
import styles from './Search.module.scss';
import UserList from '../../components/UserList/UserList';

function Search() {
  return (
    <div className={styles.DivMainContainer}>
      <div className={styles.DivSearchContainer}>
        <Tabs>
          <TabList className={styles.DivTabsContainer}>
            {/* Top */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_top"
                  aria-controls="tabs-0-panel-search_top"
                >
                  Top
                </div>
              </div>
            </Tab>
            {/* User */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_user"
                  aria-controls="tabs-0-panel-search_user"
                >
                  Người dùng
                </div>
              </div>
            </Tab>
            {/* Video */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_video"
                  aria-controls="tabs-0-panel-search_video"
                >
                  Video
                </div>
              </div>
            </Tab>
            {/* LIVE */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_live"
                  aria-controls="tabs-0-panel-search_live"
                >
                  LIVE
                </div>
              </div>
            </Tab>
          </TabList>
          <TabPanels className={styles.DivPanelContainer}>
            {/* Notify */}
            <div className={styles['DivContainer']}>
              <img
                src="https://p16-ssop-sg.tiktokcdn.com/tos-alisg-i-vuey2g82k3-sg/aid/63c83df9-ff78-49bd-b19d-29e6f944c46f~tplv-vuey2g82k3-image.png"
                className={styles['ImgGuideReminder']}
                alt=""
              />
              <div className={styles['DivGuideReminderContent']}>
                <p className={styles['PGuideReminderTitle']}>
                  Sự kiện thường xuyên thay đổi
                </p>
                <div className={styles['DivReminderDesc']}>
                  <div className={styles['DivWrapper']}>
                    <div
                      className={styles['DivText']}
                      style={{ maxHeight: '66px' }}
                    >
                      <div className={styles['DivBtnWrapper']}>
                        <button
                          type="button"
                          className={styles['ButtonExpand']}
                        >
                          Tìm hiểu thêm
                        </button>
                      </div>
                      Khi các sự kiện đang diễn ra nhanh chóng, có thể nội dung
                      mà bạn xem không phải lúc nào cũng chính xác. Hãy cẩn thận
                      khi tương tác với nội dung nhạy cảm và nhớ xác minh thông
                      tin với các nguồn đáng tin cậy. Vui lòng báo cáo bất cứ
                      điều gì bạn cho rằng có thể sẽ vi phạm %s của chúng tôi
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <UserList />
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default Search;
