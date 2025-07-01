import { useParams } from 'react-router-dom';

import ProductCard from '@/components/Card/ProductCard';
import products from '@/data/products';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';

import styles from './ProductListPage.module.css';

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
      <h2 className={styles.categoryTitle}>{category}의 모든 것</h2>
      <div className={styles.sortWrapper}>
        <select className={styles.sortSelect} defaultValue="latest">
          <option value="latest">최신 순</option>
          <option value="price-low">낮은 가격 순</option>
          <option value="price-high">높은 가격 순</option>
        </select>
      </div>
      <div className={styles.grid}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
