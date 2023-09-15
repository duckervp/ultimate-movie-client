import { useRemoveRefreshTokenMutation } from '../features/auth/slice/authApiNoCredSlice';
import { logout } from "../features/auth/slice/authSlice";
import { useDispatch } from 'react-redux';
import { handleError } from '../utils';

function useLogout() {
  const [removeRefreshToken] = useRemoveRefreshTokenMutation();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await removeRefreshToken().unwrap();
      dispatch(logout());
    } catch (error) {
      handleError(error);
    }
  }

  return signOut;
}

export default useLogout;