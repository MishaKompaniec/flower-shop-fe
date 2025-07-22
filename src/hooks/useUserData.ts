import { useGetAvatarQuery, useGetMeQuery } from '@/store/services/userApi';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useUserData = () => {
  const token = useSelector((state: RootState) => state.auth.token);

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
