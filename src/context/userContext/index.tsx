import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../authContext';
import { useGetAvatarQuery, useGetMeQuery } from '@/services/userApi';
import { UserProfile } from '@/types';

type UserContextType = {
  user: UserProfile | undefined;
  avatarUrl: string | null;
  isUserLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();

  const { data: avatarData } = useGetAvatarQuery(undefined, { skip: !token });
  const { data: user, isLoading: isUserLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatarData?.avatarUrl) {
      setAvatarUrl(avatarData.avatarUrl);
    } else {
      setAvatarUrl(null);
    }
  }, [avatarData]);

  return (
    <UserContext.Provider value={{ user, avatarUrl, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
