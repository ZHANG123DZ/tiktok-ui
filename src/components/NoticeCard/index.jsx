import styles from './NoticeCard.module.scss';

function NoticeCard() {
  return (
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
            <div className={styles['DivText']} style={{ maxHeight: '66px' }}>
              <div className={styles['DivBtnWrapper']}>
                <button type="button" className={styles['ButtonExpand']}>
                  Tìm hiểu thêm
                </button>
              </div>
              Khi các sự kiện đang diễn ra nhanh chóng, có thể nội dung mà bạn
              xem không phải lúc nào cũng chính xác. Hãy cẩn thận khi tương tác
              với nội dung nhạy cảm và nhớ xác minh thông tin với các nguồn đáng
              tin cậy. Vui lòng báo cáo bất cứ điều gì bạn cho rằng có thể sẽ vi
              phạm %s của chúng tôi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;
