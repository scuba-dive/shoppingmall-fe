import CategorySection from '@/features/main/components/CategorySection/CategorySection';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';
import useMainProducts from '@/hooks/useMainProducts';

function HomePage() {
  const { products, lastElementRef, loading } = useMainProducts(0, 8);

  return (
    <div>
      <CategorySection />
      <ProductGrid title="전체 상품" products={products} lastElementRef={lastElementRef} />
      {loading && <p style={{ textAlign: 'center' }}>로딩 중...</p>}
    </div>
  );
}

export default HomePage;
