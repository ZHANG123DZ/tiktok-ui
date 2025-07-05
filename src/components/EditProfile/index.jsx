import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import CloseButton from '../CloseButton';
import { useModal } from '../../contexts/ModalContext';

function EditProfile() {
  const {closeModal} = useModal();

  return (
    <div className={styles.DivModalContainer}>
                <div className={styles.DivHeaderContainer}>
                  <h1 className={styles.H1Header}>Sửa hồ sơ</h1>
                  <CloseButton onClick={closeModal}/>
                </div>
                <div className={styles.DivContentContainer}>
                  <div
                    className={
                      styles['DivItemContainer-StyledItemContainerWithLine']
                    }
                  >
                    <div className={styles.DivLabel}>Ảnh hồ sơ</div>
                    <div className={styles.DivAvatarContent}>
                      <div
                        className={styles['DivContainer-StyledAvatar']}
                        style={{ width: '96px', height: '96px' }}
                      >
                        <span
                          className={styles['SpanAvatarContainer-StyledAvatar']}
                          style={{ width: '96px', height: '96px' }}
                        >
                          <img src="./" alt="" className={styles.ImgAvatar} />
                        </span>
                      </div>
                      <div className={styles.DivAvatarEditIcon}>
                        <FontAwesomeIcon icon={faPen} />
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                          className={styles.InputUpload}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      styles['DivItemContainer-StyledItemContainerWithLine']
                    }
                  >
                    <div className={styles.DivLabel}>TikTok ID</div>
                    <div className={styles.DivEditAreaContainer}>
                      <input
                        type="text"
                        value={''}
                        className={styles.InputText}
                      />
                      <p className={styles['PProfileSite']}>
                        www.tiktok.com/@thanghoang9051
                      </p>
                      <p className={styles['PProfileSite-StyledTip']}>
                        TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch
                        dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ
                        của bạn cũng sẽ thay đổi.
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      styles['DivItemContainer-StyledItemContainerWithLine']
                    }
                  >
                    <div className={styles.DivLabel}>Tên</div>
                    <div className={styles.DivEditAreaContainer}>
                      <input
                        type="text"
                        placeholder="Tên"
                        className={styles.InputText}
                        value={''}
                      />
                      <p className={styles['PProfileSite-StyledTip']}>
                        Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.
                      </p>
                    </div>
                  </div>
                  <div className={styles['DivItemContainer']}>
                    <div className={styles.DivLabel}>Tiểu sử</div>

                    <div className={styles.DivEditAreaContainer}>
                      <textarea
                        placeholder="Tiểu sử"
                        className={styles['InputText-StyledInputTextArea']}
                      ></textarea>
                      <div className={styles.DivTextCount}>
                        <span>0/80</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.DivFooterContainer}>
                  <button className={styles['Button-StyledBtn']}>Huỷ</button>
                  <button className={styles['Button-StyledBtn']} disabled>
                    Lưu
                  </button>
                </div>
              </div>
  );
}

export default EditProfile;
