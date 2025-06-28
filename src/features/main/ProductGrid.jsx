import { useNavigate } from 'react-router-dom';

import products from '@/data/products';

function ProductGrid() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '2rem' }}>
      <h2>전체 상품</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
        }}
      >
        {products.slice(0, 12).map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 150, objectFit: 'cover' }}
            />
            <p>{product.name}</p>
            <p>{`${product.price.toLocaleString()}원`}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
