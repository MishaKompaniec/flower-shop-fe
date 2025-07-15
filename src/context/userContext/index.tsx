import React, { createContext, useContext } from 'react';
import { useAuth } from '../authContext';
import { useGetAvatarQuery } from '../../services/userApi';

type UserContextType = {
  avatarUrl: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const { data } = useGetAvatarQuery(undefined, { skip: !token });
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (data) {
      setAvatarUrl(data.avatarUrl);
    } else {
      setAvatarUrl(null);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ avatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
