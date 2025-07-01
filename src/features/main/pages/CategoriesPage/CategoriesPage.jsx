import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import CategoryPreviewSection from '@/features/main/components/CategoryPreviewSection/CategoryPreviewSection';

function CategoriesPage() {
  return (
    <div>
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
        ]}
      />
      <CategoryPreviewSection />
    </div>
  );
}

export default CategoriesPage;
