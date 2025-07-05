import { useState } from 'react';
import { createPost } from '../../services/Posts/posts.service';
import styles from './styles.module.scss';

function Upload() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const toggleAdvanced = () => {
    setAdvancedOpen(!advancedOpen);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const cancelUpload = () => {
    if (window.confirm('Bạn có chắc muốn hủy? Tất cả dữ liệu sẽ bị mất.')) {
      // Reset form logic here
      setSelectedFiles([]);
      setAdvancedOpen(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🎵 TikTok Upload</h1>
        <p>Đăng video hoặc hình ảnh của bạn</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* File Upload */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            📁 Chọn file video/hình ảnh
          </label>
          <label className={styles.fileUpload}>
            <input
              type="file"
              multiple
              accept="video/*,image/*"
              required
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div className={styles.fileUploadContent}>
              <div className={styles.fileIcon}>📎</div>
              <div className={styles.fileText}>
                {selectedFiles.length > 0
                  ? `Đã chọn ${selectedFiles.length} file`
                  : 'Kéo thả file hoặc nhấn để chọn'}
              </div>
              <div className={styles.fileSubtext}>
                {selectedFiles.length > 0
                  ? selectedFiles.map((file) => file.name).join(', ')
                  : 'Hỗ trợ video MP4, MOV và hình ảnh JPG, PNG'}
              </div>
            </div>
          </label>
        </div>

        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>📝 Tiêu đề</label>
          <input
            type="text"
            className={styles.formControl}
            placeholder="Nhập tiêu đề cho video/hình ảnh của bạn..."
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>📄 Mô tả</label>
          <textarea
            className={styles.formControl}
            placeholder="Viết mô tả chi tiết về nội dung..."
            rows={4}
          />
        </div>

        {/* Hashtags */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>#️⃣ Hashtags</label>
          <input
            type="text"
            className={styles.formControl}
            placeholder="#trending #viral #fyp #xuhuong"
          />
        </div>

        {/* Location and Link */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>📍 Vị trí</label>
            <input
              type="text"
              className={styles.formControl}
              placeholder="Thêm vị trí..."
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>🔗 Liên kết</label>
            <input
              type="url"
              className={styles.formControl}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            👁️ Ai có thể xem video này?
          </label>
          <div className={styles.privacyOptions}>
            <label className={styles.privacyOption}>
              <input
                type="radio"
                name="privacy"
                value="public"
                defaultChecked
              />
              <div className={styles.privacyContent}>
                <span className={styles.privacyIcon}>🌍</span>
                <div>Công khai</div>
              </div>
            </label>
            <label className={styles.privacyOption}>
              <input type="radio" name="privacy" value="friends" />
              <div className={styles.privacyContent}>
                <span className={styles.privacyIcon}>👥</span>
                <div>Bạn bè</div>
              </div>
            </label>
            <label className={styles.privacyOption}>
              <input type="radio" name="privacy" value="private" />
              <div className={styles.privacyContent}>
                <span className={styles.privacyIcon}>🔒</span>
                <div>Riêng tư</div>
              </div>
            </label>
          </div>
        </div>

        {/* Advanced Options */}
        <div className={styles.advancedOptions}>
          <div
            className={styles.advancedTitle}
            onClick={toggleAdvanced}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleAdvanced();
              }
            }}
          >
            ⚙️ Tùy chọn nâng cao
          </div>
          {advancedOpen && (
            <div className={styles.advancedContent}>
              {/* Audio Settings */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>🎵 Âm thanh</label>
                <div className={styles.selectControl}>
                  <select className={styles.formControl}>
                    <option value="original">Âm thanh gốc</option>
                    <option value="mute">Tắt âm thanh</option>
                    <option value="music">Thêm nhạc nền</option>
                  </select>
                </div>
              </div>

              {/* Target Audience */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>🎯 Đối tượng</label>
                <div className={styles.selectControl}>
                  <select className={styles.formControl}>
                    <option value="all">Tất cả</option>
                    <option value="teen">13-17 tuổi</option>
                    <option value="adult">18+ tuổi</option>
                  </select>
                </div>
              </div>

              {/* Other Options */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>📊 Tùy chọn khác</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="options"
                      value="comments"
                      defaultChecked
                    />
                    <span>Cho phép bình luận</span>
                  </label>
                  <label className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="options"
                      value="duet"
                      defaultChecked
                    />
                    <span>Cho phép Duet</span>
                  </label>
                  <label className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="options"
                      value="stitch"
                      defaultChecked
                    />
                    <span>Cho phép Stitch</span>
                  </label>
                  <label className={styles.checkboxItem}>
                    <input type="checkbox" name="options" value="download" />
                    <span>Cho phép tải xuống</span>
                  </label>
                </div>
              </div>

              {/* Schedule Post */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>⏰ Lên lịch đăng</label>
                <input type="datetime-local" className={styles.formControl} />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={cancelUpload}
          >
            ❌ Hủy
          </button>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            🚀 Đăng ngay
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
