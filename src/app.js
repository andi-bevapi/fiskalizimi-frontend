import { getCurrentUser } from './services/user';

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return getCurrentUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = await fetchUserInfo();

  return {
    fetchUserInfo,
    currentUser
  };
}
