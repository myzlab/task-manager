import { RootState } from '@/app/store';
import { login, logout } from '@/app/store/auth-slice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export const useAuthService = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());

    router.push('/login');
  };

  const loginUser = (token: string) => {
    dispatch(login(token));

    router.push('/tasks');
  };

  const getToken = (): string | null => {
    return useSelector((state: RootState) => state.auth.token);
  };

  return { logoutUser, loginUser, getToken };
};
