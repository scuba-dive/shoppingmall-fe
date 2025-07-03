import { useCallback, useEffect, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import { fetchAdminProducts } from '@/services/adminProductApi';

import Table from '../../components/Table/Table';

const columns = [
  { key: 'name', label: '상품명' },
  { key: 'color', label: '색상' },
  { key: 'category', label: '카테고리' },
  { key: 'price', label: '금액' },
  { key: 'stock', label: '재고' },
  { key: 'soldOut', label: '품절여부' },
  { key: 'quantity', label: '수량 변경' },
  { key: 'status', label: '상태 변경' },
];

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAdminProducts(currentPage - 1, 10);
        setProducts(data.products);
        // totalPages가 존재하지 않아 일단 셀프로 계산 함.
        const selfTotalPages = Math.ceil(data.total / data.size);
        setTotalPages(selfTotalPages);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('상품 목록 불러오기 실패:', err);
      }
    };
    getProducts();
  }, [currentPage]);

  const renderProductRow = useCallback(
    (row) => (
      <tr key={row.optionId}>
        <td>{row.productName}</td>
        <td>{row.color}</td>
        <td>{row.category.name}</td>
        <td>{row.price.toLocaleString()}</td>
        <td>{row.stock}</td>
        <td>{row.status === 'SOLD_OUT' ? '○' : 'X'}</td>
        <td>
          <button type="button">↑↓</button>
        </td>
        <td>
          <button type="button">{row.stock === 0 ? '⊕' : '⊖'}</button>
        </td>
      </tr>
    ),
    [],
  );

  return (
    <>
      <h1> 상품 관리 </h1>
      <Table columns={columns} data={products} renderRow={renderProductRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default AdminProduct;
