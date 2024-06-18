import { createContext, useEffect, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../../data-models/user/UserModel';
import { getUser, getUsers } from '../../api/user';
import { ACCESS_TOKEN } from '../../utils/constants';

type FetchStatus = 'pending' | 'success' | 'rejected';

export const UserContext = createContext<{
  user: UserModel | null;
  users: UserModel[];
  status: FetchStatus;
  isAuth: boolean;
  fetchUser?: (id: string) => void;
  fetchUsers: () => void;
  handleLogout?: () => void;
}>({
  user: null,
  isAuth: true,
  users: [],
  status: 'rejected',
  fetchUsers: () => { },
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [status, setStatus] = useState<FetchStatus>('pending');
  const router = useIonRouter();

  const checkAuth = async () => {
    const token = await Preferences.get({ key: ACCESS_TOKEN });

    return setIsAuth(!!token.value);
  };

  const fetchUser = async (id: string) => {
    setStatus('pending');
    const { data: user } = await getUser(id);

    if (user) {
      setUser(user);
      setStatus('success');
      checkAuth();
    } else {
      setUser(null);
      setStatus('rejected');
    }
  };

  const fetchUsers = async () => {
    setStatus('pending');
    const { data: users, status } = await getUsers();

    if (status === 200) {
      setUsers(users);
      setStatus('success');
    } else {
      setUsers([]);
      setStatus('rejected');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    await Preferences.remove({ key: ACCESS_TOKEN });

    checkAuth();
    router.push('/login');
  };

  const reFetchUser = async () => {
    const token = await Preferences.get({ key: ACCESS_TOKEN });

    if (!token.value) return;

    const decoded = jwtDecode<{ userId: string }>(token.value);

    await fetchUser(decoded.userId);
  };

  useEffect(() => {
    if (!isAuth) checkAuth();
    if (!user) reFetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuth,
        user,
        users,
        status,
        fetchUser,
        fetchUsers,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
