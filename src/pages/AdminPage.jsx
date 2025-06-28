import AdminLayout from '@/layouts/AdminLayouts/AdminLayout';
import AdminRouter from '@/routes/AdminRouter';

function AdminPage() {
  return (
    <AdminLayout>
      <AdminRouter />
    </AdminLayout>
  );
}

export default AdminPage;
