import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { registerProduct } from '@/services/adminProductApi';
import { validateProductForm } from '@/utils/productValidation';

import ImageUpload from '../ImageUpload/ImageUpload';
import styles from './AdminProductRegistrationModal.module.css';

function AdminProductRegistrationModal({ isOpen, onClose, onStatusChanged }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: {
      파랑: null,
      빨강: null,
      검정: null,
    },
  });

  const [imagePreviews, setImagePreviews] = useState({
    파랑: '',
    빨강: '',
    검정: '',
  });

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때마다 폼 초기화
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        images: {
          파랑: null,
          빨강: null,
          검정: null,
        },
      });
      setImagePreviews({
        파랑: '',
        빨강: '',
        검정: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (color, file) => {
    setFormData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [color]: file,
      },
    }));

    // 미리보기 생성
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => ({
          ...prev,
          [color]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviews((prev) => ({
        ...prev,
        [color]: '',
      }));
    }
  };

  const handleConfirm = async () => {
    const errors = validateProductForm(formData);

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      await registerProduct(formData);
      toast.success('상품이 성공적으로 등록되었습니다.');

      if (onStatusChanged) {
        await onStatusChanged();
      }

      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('상품 등록 실패:', err);
      toast.error('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        id="admin-product-registration-modal"
        aria-modal="true"
        aria-labelledby="admin-product-registration-modal-title"
        aria-describedby="admin-product-registration-modal-desc"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.content}>
          <h1 id="admin-product-registration-modal-title" className={styles.title}>
            상품 등록
          </h1>

          <div id="admin-product-registration-modal-desc" className={styles.description}>
            새로운 상품을 등록합니다. 모든 필수 정보를 입력해주세요.
          </div>

          <div className={styles.formContainer}>
            <div className={styles.fieldGroup}>
              <h2 className={styles.subTitle}>상품명</h2>
              <input
                type="text"
                className={styles.input}
                placeholder="상품명을 입력하세요"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <h2 className={styles.subTitle}>상품설명</h2>
              <input
                type="text"
                className={styles.input}
                placeholder="상품 설명을 입력하세요"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <h2 className={styles.subTitle}>상품 가격</h2>
              <input
                type="number"
                className={styles.input}
                placeholder="상품 가격을 입력하세요"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value, 10) || 0)}
                min="0"
              />
            </div>

            <div className={styles.fieldGroup}>
              <h2 className={styles.subTitle}>상품 카테고리</h2>
              <select
                className={styles.select}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="의자">의자</option>
                <option value="책상">책상</option>
                <option value="침대">침대</option>
                <option value="수납장">수납장</option>
                <option value="소품">소품</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <h2 className={styles.subTitle}>색상별 이미지 등록</h2>
              <p className={styles.imageDescription}>
                파랑, 빨강, 검정 3가지 색상의 이미지를 업로드하세요.
              </p>

              <ImageUpload
                color="파랑"
                onImageChange={handleImageChange}
                preview={imagePreviews.파랑}
              />
              <ImageUpload
                color="빨강"
                onImageChange={handleImageChange}
                preview={imagePreviews.빨강}
              />
              <ImageUpload
                color="검정"
                onImageChange={handleImageChange}
                preview={imagePreviews.검정}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="button" className={styles.confirmButton} onClick={handleConfirm}>
                상품 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminProductRegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStatusChanged: PropTypes.func,
};

AdminProductRegistrationModal.defaultProps = {
  onStatusChanged: null,
};

export default AdminProductRegistrationModal;
