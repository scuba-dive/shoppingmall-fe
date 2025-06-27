import AdminLayout from '@/layouts/AdminLayouts/AdminLayout';

import Table from '../../components/Table/Table';

const columns = [
  { key: 'name', label: '상품명' },
  { key: 'color', label: '색상' },
  { key: 'category', label: '카테고리' },
  { key: 'price', label: '금액' },
  { key: 'stock', label: '재고' },
  { key: 'soldout', label: '품절여부' },
  { key: 'quantity', label: '수량 변경' },
  { key: 'status', label: '상태 변경' },
];
const sampleData = [
  {
    id: 1,
    name: '머찐의자',
    color: '빨간색',
    category: '의자',
    price: '29,000',
    stock: 12,
  },
  {
    id: 2,
    name: '머찐의자',
    color: '노란색',
    category: '의자',
    price: '29,000',
    stock: 3,
  },
  {
    id: 3,
    name: '머찐의자',
    color: '파란색',
    category: '의자',
    price: '29,000',
    stock: 0,
  },
];

function renderProductRow(row) {
  return (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.color}</td>
      <td>{row.category}</td>
      <td>{row.price.toLocaleString()}</td>
      <td>{row.stock}</td>
      <td>{row.stock === 0 ? '○' : 'X'}</td>
      <td>
        <button type="button">↑</button>
        <button type="button">↓</button>
      </td>
      <td>
        <button type="button">{row.stock === 0 ? '⊕' : '⊖'}</button>
      </td>
    </tr>
  );
}

function AdminProduct() {
  return (
    <AdminLayout>
      <h1> 상품 관리 </h1>
      <Table columns={columns} data={sampleData} renderRow={renderProductRow} />
    </AdminLayout>
  );
}

export default AdminProduct;
