import { useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';

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
const sampleData = [
  {
    product_id: 1,
    product_name: '머찐의자',
    category: {
      id: 1,
      name: '의자',
    },
    option_id: 1001,
    color: '빨간색',
    sku: 'CHAIR-101-RED',
    price: 29000,
    stock: 12,
    status: 'ACTIVE',
  },
  {
    product_id: 1,
    product_name: '머찐의자',
    category: {
      id: 1,
      name: '의자',
    },
    option_id: 1002,
    color: '노란색',
    sku: 'CHAIR-101-YEL',
    price: 29000,
    stock: 3,
    status: 'ACTIVE',
  },
  {
    product_id: 1,
    product_name: '머찐의자',
    category: {
      id: 1,
      name: '의자',
    },
    option_id: 1003,
    color: '파란색',
    sku: 'CHAIR-101-BLU',
    price: 29000,
    stock: 0,
    status: 'SOLD_OUT',
  },
  {
    product_id: 2,
    product_name: '센스있는 쇼파',
    category: {
      id: 1,
      name: '의자',
    },
    option_id: 2001,
    color: '빨간색',
    sku: 'CHAIR-102-RED',
    price: 84000,
    stock: 5,
    status: 'ACTIVE',
  },
  {
    product_id: 2,
    product_name: '센스있는 쇼파',
    category: {
      id: 1,
      name: '의자',
    },
    option_id: 2002,
    color: '노란색',
    sku: 'CHAIR-102-YEL',
    price: 84000,
    stock: 9,
    status: 'ACTIVE',
  },
];

function renderProductRow(row) {
  return (
    <tr key={row.option_id}>
      <td>{row.product_name}</td>
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
  );
}

function AdminProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 임시 설정
  return (
    <>
      <h1> 상품 관리 </h1>
      <Table columns={columns} data={sampleData} renderRow={renderProductRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default AdminProduct;
