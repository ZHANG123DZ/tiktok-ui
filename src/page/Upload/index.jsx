import { useState } from 'react';
import styles from './Upload.module.scss';
import postService from '../../services/post/post.service';
import mediaService from '../../services/media/media.service';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import anyUrlToFile from '../../utils/anyUrlToFile';
import Loading from '../../components/Loading';

function Upload() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewThumbnail, setPreviewThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Chọn file video
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setVideoFile(file);
      setPreviewVideo(URL.createObjectURL(file));
    } else {
      alert('Vui lòng chọn file video MP4!');
    }
  };

  // Chọn file thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
      setPreviewThumbnail(URL.createObjectURL(file));
    } else {
      alert('Vui lòng chọn file ảnh (JPG, PNG, v.v.)!');
    }
  };

  // API mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnailFile) {
      alert('Vui lòng chọn đầy đủ video và ảnh thumbnail!');
      return;
    }

    setIsLoading(true); // 🟡 Bật loading

    try {
      const vidFile = await anyUrlToFile(
        previewVideo,
        `${currentUser.id}-${new Date().toISOString()}`
      );
      const resVid = await mediaService.uploadSingleFile({
        message: vidFile,
        folder: `post/video/${currentUser?.id}`,
      });

      const imgFile = await anyUrlToFile(
        previewThumbnail,
        `${currentUser.id}-${new Date().toISOString()}`
      );
      const resImg = await mediaService.uploadSingleFile({
        message: imgFile,
        folder: `post/thumbnail/${currentUser?.id}`,
      });

      const postData = {
        title,
        description,
        content: resVid.url,
        thumbnail: resImg.url,
        type: 'video',
      };

      await postService.createPost(postData);
      toast.success('Đăng bài thành công', { closeButton: true });
    } catch (err) {
      console.error('❌ Lỗi khi upload:', err);
      toast.error('Đăng bài không thành công', { closeButton: true });
    } finally {
      setIsLoading(false); // 🔵 Tắt loading dù có lỗi hay không
    }
  };

  return (
    <div className={styles.uploadWrapper}>
      {isLoading && (
        <div className={styles.overlay}>
          <Loading />
        </div>
      )}
      <h1 className={styles.title}>🚀 Đăng Video Mới</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Video Upload */}
        <div className={styles.uploadBox}>
          <label className={styles.label}>🎬 Chọn video (.mp4)</label>
          <input type="file" accept="video/mp4" onChange={handleVideoChange} />
          {previewVideo && (
            <video
              className={styles.previewVideo}
              src={previewVideo}
              controls
            />
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className={styles.uploadBox}>
          <label className={styles.label}>🖼️ Chọn ảnh thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              alt="Thumbnail Preview"
              className={styles.previewThumbnail}
            />
          )}
        </div>

        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>📝 Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề cho video..."
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>📄 Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả chi tiết..."
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => window.location.reload()}
          >
            ❌ Hủy
          </button>
          <button type="submit" className={styles.submitBtn}>
            🚀 Đăng Ngay
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
