import { Route, Routes } from 'react-router-dom';

import SignIn from '@/features/auth/pages/SignIn/SignIn';
import SignUp from '@/features/auth/pages/SignUp/SignUp';
import AuthLayout from '@/layouts/AuthLayouts/AuthLayout';

function AuthRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default AuthRouter;
