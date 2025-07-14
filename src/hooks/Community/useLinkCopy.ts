import { useState } from 'react';

/* CommunityPost */
// 현재 페이지 URL을 클립보드에 복사
export const useLinkCopy = () => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsLinkModalOpen(true);
      //   setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  return { isLinkModalOpen, setIsLinkModalOpen, handleCopy };
};
