import { create } from 'zustand';

import { fetchProductsByCategory } from '@/services/mainService';

const useCategoryPreviewState = create((set, _get) => ({
  categoryProducts: {},
  loading: false,

  fetchPreviews: async (categories, size = 8) => {
    set({ loading: true });
    const results = {};

    await Promise.all(
      categories.map(async (category) => {
        try {
          const products = await fetchProductsByCategory(category.id, size);
          results[category.id] = products;
        } catch (err) {
          results[category.id] = [];
        }
      }),
    );

    set({ categoryProducts: results, loading: false });
  },
}));

export default useCategoryPreviewState;
