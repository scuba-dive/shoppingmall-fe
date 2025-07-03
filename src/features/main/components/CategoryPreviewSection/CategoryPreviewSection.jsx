import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/Card/ProductCard';
import useCategories from '@/hooks/useCategories';
import { fetchProductsByCategory } from '@/services/mainService';

import styles from './CategoryPreviewSection.module.css';

function CategoryPreviewSection() {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const results = {};

      await Promise.all(
        categories.map(async (category) => {
          try {
            const products = await fetchProductsByCategory(category.id, 8);
            results[category.id] = products;
          } catch (e) {
            results[category.id] = [];
          }
        }),
      );

      setCategoryProducts(results);
    };

    fetchAll();
  }, [categories]);

  return (
    <div className={styles.wrapper}>
      {categories.map((category) => {
        const filtered = categoryProducts[category.id] || [];

        return (
          <section key={category.id} className={styles.section}>
            <button
              type="button"
              className={styles.titleButton}
              onClick={() => navigate(`/category/${category.name}`)}
            >
              {category.name}
            </button>

            <Swiper spaceBetween={16} slidesPerView={4} className={styles.swiper}>
              {filtered.map((p) => (
                <SwiperSlide key={p.id} className={styles.slide}>
                  <ProductCard id={p.id} name={p.name} price={p.price} image={p.image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        );
      })}
    </div>
  );
}

export default CategoryPreviewSection;
