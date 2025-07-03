import { create } from 'zustand';

import { fetchCategories } from '@/services/mainService';

const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoaded: false,

  loadCategories: async () => {
    if (get().isLoaded) return;

    try {
      const data = await fetchCategories();
      set({ categories: data, isLoaded: true });
    } catch (err) {
      // console.error('카테고리 불러오기 실패:', err);
      // Optionally handle the error in another way, e.g., set an error state
    }
  },
}));

export default useCategoryStore;
