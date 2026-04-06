import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useQueryClient } from '@tanstack/react-query';

export const useDeleteUserInfo = () => {
  const setUserInfo = useSetRecoilState(currentUserInfo);

  const queryClient = useQueryClient();
  const { handleNavigateState } = useHandleNavigate();

  const deleteUserInfo = () => {
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('autoLoginCredentials');

    setUserInfo({
      realName: '',
      nickName: '',
    });

    queryClient.clear();

    handleNavigateState('/', { replace: true });
  };

  return deleteUserInfo;
};
