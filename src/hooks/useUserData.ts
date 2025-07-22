import { useAuth } from '@/context/authContext';
import { useGetAvatarQuery, useGetMeQuery } from '@/store/services/userApi';
import { useEffect } from 'react';

export const useUserData = () => {
  const { token } = useAuth();

  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetMeQuery(undefined, { skip: !token });

  const { data: avatarData, refetch: refetchAvatar } = useGetAvatarQuery(
    undefined,
    { skip: !token }
  );

  const avatarUrl = avatarData?.avatarUrl ?? null;

  useEffect(() => {
    if (token) {
      refetchUser();
      refetchAvatar();
    }
  }, [token, refetchUser, refetchAvatar]);

  return {
    user,
    avatarUrl,
    isUserLoading,
    refetchUser,
    refetchAvatar,
  };
};
