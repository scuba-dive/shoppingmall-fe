function validateProductForm(formData) {
  const errors = [];

  if (!formData.name.trim()) {
    errors.push('상품명을 입력해주세요.');
  }

  if (!formData.description.trim()) {
    errors.push('상품 설명을 입력해주세요.');
  }

  if (!formData.price || formData.price <= 0) {
    errors.push('상품 가격을 입력해주세요.');
  }

  if (!formData.category) {
    errors.push('카테고리를 선택해주세요.');
  }

  const colors = ['파랑', '빨강', '검정'];
  const missingImages = colors.filter((color) => !formData.images[color]);
  if (missingImages.length > 0) {
    errors.push(`다음 색상의 이미지를 업로드해주세요: ${missingImages.join(', ')}`);
  }

  return errors;
}

export default validateProductForm;
