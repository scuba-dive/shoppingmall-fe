import authStore from '@/states/authStore';

function useAuth() {
  const user = authStore((state) => state.user);

  return {
    user,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
    isLoggedIn: !!user,
  };
}

export default useAuth;
