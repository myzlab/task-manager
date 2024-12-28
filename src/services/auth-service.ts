import { RootState } from '@/app/store';
import { login, logout } from '@/app/store/auth-slice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export const useGetToken = () => {
  return useSelector((state: RootState) => state.auth.token);
};

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

  const token = useGetToken();

  return { logoutUser, loginUser, token };
};
