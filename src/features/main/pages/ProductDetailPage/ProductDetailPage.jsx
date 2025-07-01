import { useParams } from 'react-router-dom';

import products from '@/data/products';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="product-detail">
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
          { name: product.category, link: `/category/${product.category}` },
          { name: product.name },
        ]}
      />
      <div className="product-content">
        <img src={product.image} alt={product.name} className="product-image" />
        <h2>{product.name}</h2>
        <p>{product.price.toLocaleString()}원</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
