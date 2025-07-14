import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetAvatarQuery } from '../services/userApi';

type UserContextType = {
  avatarUrl: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useGetAvatarQuery();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setAvatarUrl(data.avatarUrl);
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
