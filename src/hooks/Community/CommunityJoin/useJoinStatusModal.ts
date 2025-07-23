import { useEffect, useState } from 'react';
import { mockCommunityJoinStatus } from '@/utils/mockCommunityJoinStatus';

export const useJoinStatusModal = () => {
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);

  useEffect(() => {
    const fetchJoinStatus = async () => {
      try {
        const status = await mockCommunityJoinStatus();
        if (
          status === 'REJECTED' &&
          sessionStorage.getItem('rejectedModalShown') !== 'true'
        ) {
          setIsRejectedModalOpen(true);
          sessionStorage.setItem('rejectedModalShown', 'true');
        }
      } catch (error) {
        console.error('가입 상태 확인 실패:', error);
      }
    };

    fetchJoinStatus();
  }, []);

  return {
    isLimitModalOpen,
    isRejectedModalOpen,
    openLimitModal: () => setIsLimitModalOpen(true),
    closeLimitModal: () => setIsLimitModalOpen(false),
    closeRejectedModal: () => setIsRejectedModalOpen(false),
  };
};
