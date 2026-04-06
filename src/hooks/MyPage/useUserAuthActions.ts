import { useCallback, useState } from 'react';
import { UserRole } from '@/types/common';
import { useDeleteUserInfo } from '@/hooks/useDeleteUserInfo';
import { useCaregiverLogout, useLeaveCaregiver } from '@/api/user/caregiver';
import {
  useLeaveSocialworker,
  useSocialworkerLogout,
} from '@/api/user/socialworker';
import { CaregiverLeaveRequest } from '@/types/caregiver';
import { SocialworkerLeaveRequest } from '@/types/socialworker';

export const useUserAuthActions = (role: UserRole) => {
  const { mutate: caregiverLogout } = useCaregiverLogout();
  const { mutate: caregiverLeave } = useLeaveCaregiver();
  const { mutate: socialworkerLogout } = useSocialworkerLogout();
  const { mutate: socialworkerLeave } = useLeaveSocialworker();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const deleteUserInfo = useDeleteUserInfo();

  const handleLogout = useCallback(() => {
    const logout = role === 'CAREGIVER' ? caregiverLogout : socialworkerLogout;
    logout(undefined, { onSuccess: deleteUserInfo });
  }, [role, caregiverLogout, socialworkerLogout, deleteUserInfo]);

  const handleCaregiverLeave = (request: CaregiverLeaveRequest) => {
    caregiverLeave(request, {
      onSuccess: () => {
        localStorage.clear();
        deleteUserInfo();
        setIsLeaveModalOpen(true);
      },
    });
  };

  const handleSocialworkerLeave = (request: SocialworkerLeaveRequest) => {
    socialworkerLeave(request, {
      onSuccess: () => {
        localStorage.clear();
        deleteUserInfo();
        setIsLeaveModalOpen(true);
      },
    });
  };

  return {
    handleLogout,
    handleCaregiverLeave,
    handleSocialworkerLeave,
    isLeaveModalOpen,
    setIsLeaveModalOpen,
  };
};
