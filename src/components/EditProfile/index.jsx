import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import CloseButton from '../CloseButton';
import { useModal } from '../../contexts/ModalContext';
import { useState } from 'react';
import defaultAvatar from '../../assets/imgs/defaultAvatar.jpeg';
import userService from '../../services/user/user.service';
import authService from '../../services/auth/auth.service';
import anyUrlToFile from '../../utils/anyUrlToFile';
import uploadService from '../../services/upload/upload.service';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/auth/authAsync';
import mediaService from '../../services/media/media.service';

function EditProfile() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const data = useSelector((state) => state.auth.currentUser);
  const [name, setName] = useState(data.name);
  const [username, setUserName] = useState(data.username);
  const [bio, setBio] = useState(data?.bio || '');
  const prevAvatar = data.avatar;
  const [avatarPreview, setAvatarPreview] = useState(data.avatar);
  const [change, setChange] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
      setChange(true);
      return () => URL.revokeObjectURL(previewURL);
    }
  };

  const onCancel = () => {
    closeModal();
  };

  const onSave = async (e) => {
    e.preventDefault();
    const editData = {
      name: name,
      username: username,
      bio: bio,
    };
    if (prevAvatar !== avatarPreview) {
      const imageFile = await anyUrlToFile(
        avatarPreview,
        `${new Date().toISOString()}`
      );
      const { url } = await mediaService.uploadSingleFile({
        avatar: imageFile,
        folder: `group/avatar`,
      });
      editData.avatar = url;
    }
    await authService.editProfile(editData);
    dispatch(getCurrentUser());
    closeModal();
  };
  return (
    <form onSubmit={(e) => onSave(e)} encType="multipart/form-data">
      <div className={styles.DivModalContainer}>
        <div className={styles.DivHeaderContainer}>
          <h1 className={styles.H1Header}>Sửa hồ sơ</h1>
          <CloseButton onClick={closeModal} />
        </div>
        <div className={styles.DivContentContainer}>
          <div
            className={styles['DivItemContainer-StyledItemContainerWithLine']}
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
          <div
            className={styles['DivItemContainer-StyledItemContainerWithLine']}
          >
            <div className={styles.DivLabel}>TikTok ID</div>
            <div className={styles.DivEditAreaContainer}>
              <input
                type="text"
                value={username}
                placeholder={data.username}
                className={styles.InputText}
                onChange={(e) => {
                  setChange(true);
                  setUserName(e.currentTarget.value);
                }}
              />
              <p className={styles['PProfileSite']}>
                {`www.tiktokk.website/@${username}`}
              </p>
              <p className={styles['PProfileSite-StyledTip']}>
                TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và
                dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ
                thay đổi.
              </p>
            </div>
          </div>
          <div
            className={styles['DivItemContainer-StyledItemContainerWithLine']}
          >
            <div className={styles.DivLabel}>Tên</div>
            <div className={styles.DivEditAreaContainer}>
              <input
                type="text"
                placeholder={data.name}
                className={styles.InputText}
                value={name}
                onChange={(e) => {
                  setChange(true);
                  setName(e.currentTarget.value);
                }}
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
                    setChange(true);
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
            disabled={!change}
            style={{
              backgroundColor: change
                ? 'rgb(255, 59, 92)'
                : 'rgba(255, 255, 255, 0.08)',
            }}
            onClick={(e) => onSave(e)}
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
