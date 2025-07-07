import { useCallback, useEffect, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import AdminProductQuantityModal from '@/modals/AdminProductQuantityModal/AdminProductQuantityModal';
import AdminProductRegistrationModal from '@/modals/AdminProductRegistrationModal/AdminProductRegistrationModal';
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
  const [modalType, setModalType] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleOpenSoldOutModal = useCallback((productId, status) => {
    setSelectedProductId(productId);
    setSelectedStatus(status);
    setModalType('soldOut');
    setIsModalOpen(true);
  }, []);

  const handleOpenQuantityModal = useCallback((productId, stock) => {
    setSelectedProductId(productId);
    setSelectedQuantity(stock);
    setModalType('quantity');
    setIsModalOpen(true);
  }, []);

  const handleOpenRegistrationModal = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('상품 등록 모달 열기');
    setModalType('registration');
    setIsModalOpen(true);
    setSelectedProductId(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setModalType(null);
  }, []);

  const handleStatusChanged = useCallback(async () => {
    try {
      // 목록 새로고침
      const pageToFetch = modalType === 'registration' ? 0 : currentPage - 1;

      const updated = await fetchAdminProducts(pageToFetch, 10);
      setProducts(updated.products);
      setTotalPages(updated.totalPages);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('상품 목록 새로고침 실패:', err);
    }
  }, [currentPage, modalType]);

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
        <td>
          <span
            className={`${styles.status} ${row.status === 'SOLD_OUT' ? styles.soldOut : styles.sell}`}
          >
            {row.status === 'SOLD_OUT' ? 'sold out' : 'sell'}
          </span>
        </td>
        <td>
          <button type="button" onClick={() => handleOpenQuantityModal(row.optionId, row.stock)}>
            ↑↓
          </button>
        </td>
        <td>
          <button type="button" onClick={() => handleOpenSoldOutModal(row.optionId, row.status)}>
            {row.status === 'SOLD_OUT' ? '⊕' : '⊖'}
          </button>
        </td>
      </tr>
    ),
    [handleOpenSoldOutModal, handleOpenQuantityModal],
  );

  return (
    <>
      <div className={styles.header}>
        <h1> 상품 관리 </h1>
        <button
          type="button"
          className={styles.button}
          onClick={() => handleOpenRegistrationModal()}
        >
          상품 등록
        </button>
      </div>
      <Table columns={columns} data={products} renderRow={renderProductRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {isModalOpen && selectedProductId && modalType === 'soldOut' && (
        <AdminProductSoldOutModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productId={selectedProductId}
          currentStatus={selectedStatus}
          onStatusChanged={handleStatusChanged}
        />
      )}

      {isModalOpen && selectedProductId && modalType === 'quantity' && (
        <AdminProductQuantityModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productId={selectedProductId}
          currQuantity={selectedQuantity}
          onStatusChanged={handleStatusChanged}
        />
      )}

      {isModalOpen && modalType === 'registration' && (
        <AdminProductRegistrationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onStatusChanged={handleStatusChanged}
        />
      )}
    </>
  );
}

export default AdminProduct;
