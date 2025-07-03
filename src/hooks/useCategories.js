// src/hooks/useCategories.js
import { useEffect } from 'react';

import useCategoryState from '@/states/categoryState';

const useCategories = () => {
  const categories = useCategoryState((state) => state.categories);
  const isLoaded = useCategoryState((state) => state.isLoaded);
  const loadCategories = useCategoryState((state) => state.loadCategories);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories, loading: !isLoaded };
};

export default useCategories;
