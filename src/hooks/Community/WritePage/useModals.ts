import { useState } from 'react';

interface ModalContent {
  title: string;
  detail: string;
}

export const useModals = () => {
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: '',
    detail: '',
  });

  // limit modal
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const handleOpenLimitModal = (title: string, detail: string) => {
    setModalContent({ title, detail });
    setIsLimitModalOpen(true);
  };
  const handleCloseLimitModal = () => {
    setIsLimitModalOpen(false);
    setModalContent({ title: '', detail: '' });
  };

  // 임시저장 모달
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 나가기 모달
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  // 등록 모달
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return {
    modalContent,
    isLimitModalOpen,
    isSaveModalOpen,
    isCloseModalOpen,
    isPostModalOpen,
    setIsSaveModalOpen,
    setIsCloseModalOpen,
    setIsPostModalOpen,
    handleOpenLimitModal,
    handleCloseLimitModal,
  };
};
