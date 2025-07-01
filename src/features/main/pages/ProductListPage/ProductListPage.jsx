import { useParams } from 'react-router-dom';

import products from '@/data/products';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';

function ProductListPage() {
  const { category } = useParams();

  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <div>
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
          { name: category },
        ]}
      />
      <ProductGrid
        title={`${category}의 모든 것`}
        showSort
        onSortChange={(_) => {
          // console.log('정렬 기준:', _.target.value);
          // 추후 상태로 정렬 기준 관리 가능
        }}
        products={filteredProducts}
      />
    </div>
  );
}

export default ProductListPage;
