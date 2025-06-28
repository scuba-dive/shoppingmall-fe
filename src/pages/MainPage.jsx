import CategorySection from '@/features/main/CategorySection';
import ProductGrid from '@/features/main/ProductGrid';
import UserLayout from '@/layouts/UserLayouts/UserLayout';

export default function MainPage() {
  return (
    <UserLayout>
      <CategorySection />
      <ProductGrid />
    </UserLayout>
  );
}
