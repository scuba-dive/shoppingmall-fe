import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import styles from './ImageUpload.module.css';

function ImageUpload({ color, onImageChange, preview }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      onImageChange(color, file);
    } else {
      toast.error('이미지 파일만 업로드 가능합니다.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const { files } = e.dataTransfer;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleRemove = () => {
    onImageChange(color, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <h3 className={styles.colorLabel}>{color}</h3>

      <div
        className={`${styles.uploadArea} ${isDragOver ? styles.dragOver : ''} ${preview ? styles.hasImage : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${color} 색상 이미지 업로드`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className={styles.hiddenInput}
        />

        {preview ? (
          <div className={styles.imagePreview}>
            <img src={preview} alt={`${color} 미리보기`} className={styles.previewImage} />
            <div className={styles.imageOverlay}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className={styles.removeButton}
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.uploadContent}>
            <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className={styles.uploadText}>
              <span>클릭하여 이미지 선택</span>
              <br />
              <span className={styles.dragText}>또는 드래그하여 업로드</span>
            </p>
            <p className={styles.fileInfo}>PNG, JPG, JPEG, WebP (최대 3MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  color: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
  preview: PropTypes.string,
};

ImageUpload.defaultProps = {
  preview: '',
};

export default ImageUpload;
