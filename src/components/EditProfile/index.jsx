import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import CloseButton from '../CloseButton';
import { useModal } from '../../contexts/ModalContext';
import { useState } from 'react';
import defaultAvatar from '../../assets/imgs/defaultAvatar.jpeg';

function EditProfile({ data }) {
  const { closeModal } = useModal();
  const [name, setName] = useState(data.name);
  const [username, setUserName] = useState(data.username);
  const [bio, setBio] = useState(data?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(data.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);

      return () => URL.revokeObjectURL(previewURL);
    }
  };

  const onCancel = () => {
    console.log('Hủy');
    closeModal();
  };

  const onSave = () => {
    console.log('Save');
    closeModal();
  };
  return (
    <div className={styles.DivModalContainer}>
      <div className={styles.DivHeaderContainer}>
        <h1 className={styles.H1Header}>Sửa hồ sơ</h1>
        <CloseButton onClick={closeModal} />
      </div>
      <div className={styles.DivContentContainer}>
        <div className={styles['DivItemContainer-StyledItemContainerWithLine']}>
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
                <img
                  src={avatarPreview || defaultAvatar}
                  alt=""
                  className={styles.ImgAvatar}
                />
              </span>
            </div>
            <div className={styles.DivAvatarEditIcon}>
              <FontAwesomeIcon icon={faPen} />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                className={styles.InputUpload}
                style={{ width: '100%', height: '100%' }}
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
        <div className={styles['DivItemContainer-StyledItemContainerWithLine']}>
          <div className={styles.DivLabel}>TikTok ID</div>
          <div className={styles.DivEditAreaContainer}>
            <input
              type="text"
              value={username}
              placeholder={data.username}
              className={styles.InputText}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
            <p className={styles['PProfileSite']}>
              {`www.tiktokk.website/@${data.username}`}
            </p>
            <p className={styles['PProfileSite-StyledTip']}>
              TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu
              chấm. Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay
              đổi.
            </p>
          </div>
        </div>
        <div className={styles['DivItemContainer-StyledItemContainerWithLine']}>
          <div className={styles.DivLabel}>Tên</div>
          <div className={styles.DivEditAreaContainer}>
            <input
              type="text"
              placeholder={data.name}
              className={styles.InputText}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
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
              placeholder={data.bio || 'Tiểu sử'}
              className={styles['InputText-StyledInputTextArea']}
              value={bio}
              onChange={(e) => {
                if (e.currentTarget.value.length <= 80) {
                  setBio(e.currentTarget.value);
                }
              }}
            ></textarea>
            <div className={styles.DivTextCount}>
              <span>{`${bio?.length || 0}/80`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.DivFooterContainer}>
        <button className={styles['Button-StyledBtn']} onClick={onCancel}>
          Huỷ
        </button>
        <button
          className={styles['Button-StyledBtn']}
          disabled
          onClick={onSave}
        >
          Lưu
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
