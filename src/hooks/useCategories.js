import { useEffect } from 'react';

import useCategoryStore from '@/states/categoryStore';

const useCategories = () => {
  const categories = useCategoryStore((state) => state.categories);
  const isLoaded = useCategoryStore((state) => state.isLoaded);
  const loadCategories = useCategoryStore((state) => state.loadCategories);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories, loading: !isLoaded };
};

export default useCategories;
