import { Route, Routes } from 'react-router-dom';

import AdminOrder from '@/features/admin/pages/AdminOrder/AdminOrder';
import AdminProduct from '@/features/admin/pages/AdminProduct/AdminProduct';
import AdminStats from '@/features/admin/pages/AdminStats/AdminStats';
import AdminUser from '@/features/admin/pages/AdminUser/AdminUser';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminProduct />} />
      <Route path="/orders" element={<AdminOrder />} />
      <Route path="/users" element={<AdminUser />} />
      <Route path="/stats" element={<AdminStats />} />
    </Routes>
  );
}

export default AdminRouter;
