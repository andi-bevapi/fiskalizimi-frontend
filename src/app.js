import { history } from 'umi';
import { getCurrentUser } from './services/user';
import User from './models/User';

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return getCurrentUser();
      }
    } catch (error) {
      history.push('/login');
    }
    return new User();
  };

  const currentUserInfo = await fetchUserInfo();
  const currentUser = new User(currentUserInfo.data);

  return {
    fetchUserInfo,
    currentUser
  };
}
