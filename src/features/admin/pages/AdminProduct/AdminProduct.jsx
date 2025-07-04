import { useCallback, useEffect, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import AdminProductSoldOutModal from '@/modals/AdminProductSoldOutModal/AdminProductSoldOutModal';
import { fetchAdminProducts } from '@/services/adminProductApi';

import Table from '../../components/Table/Table';
import styles from './AdminProduct.module.css';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleOpenModal = useCallback((productId, status) => {
    setSelectedProductId(productId);
    setSelectedStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  }, []);

  const handleStatusChanged = useCallback(async () => {
    try {
      // 목록 새로고침
      const updated = await fetchAdminProducts(currentPage - 1, 10);
      setProducts(updated.products);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('상품 상태 변경 실패:', err);
    }
  }, [currentPage]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAdminProducts(currentPage - 1, 10);
        setProducts(data.products);
        setTotalPages(data.totalPages);
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
        <td className={styles.status}>{row.status === 'SOLD_OUT' ? 'sold out' : 'sell'}</td>
        <td>
          <button type="button">↑↓</button>
        </td>
        <td>
          <button type="button" onClick={() => handleOpenModal(row.optionId, row.status)}>
            {row.status === 'SOLD_OUT' ? '⊕' : '⊖'}
          </button>
        </td>
      </tr>
    ),
    [handleOpenModal],
  );

  return (
    <>
      <h1> 상품 관리 </h1>
      <Table columns={columns} data={products} renderRow={renderProductRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {isModalOpen && selectedProductId && (
        <AdminProductSoldOutModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productId={selectedProductId}
          currentStatus={selectedStatus}
          onStatusChanged={handleStatusChanged}
        />
      )}
    </>
  );
}

export default AdminProduct;
