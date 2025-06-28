import { useNavigate } from 'react-router-dom';

import categories from '@/data/categories';

function CategorySection() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '2rem' }}>
      <h2>카테고리</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => navigate(`/category/${cat.name}`)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 100,
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <p>{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
