import products from '@/data/products';
import CategorySection from '@/features/main/components/CategorySection/CategorySection';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';

function HomePage() {
  return (
    <div>
      <CategorySection />
      <ProductGrid title="전체 상품" products={products.slice(0, 12)} />
    </div>
  );
}

export default HomePage;
