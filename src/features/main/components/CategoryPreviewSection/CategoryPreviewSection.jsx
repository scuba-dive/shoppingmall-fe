import { useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/Card/ProductCard';
import categories from '@/data/categories';
import products from '@/data/products';

import styles from './CategoryPreviewSection.module.css';

function CategoryPreviewSection() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {categories.map((category) => {
        const filtered = products.filter((p) => p.category === category.name).slice(0, 8);

        return (
          <section key={category.name} className={styles.section}>
            <button
              type="button"
              className={styles.titleButton}
              onClick={() => navigate(`/category/${category.name}`)}
            >
              {category.name}
            </button>

            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={4}
              navigation
              className={styles.swiper}
            >
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
