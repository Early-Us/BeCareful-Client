import { useState } from 'react';

export const usePostings = () => {
  // 필독 여부
  const [isImportant, setIsImportant] = useState(true);
  const handleToggleChange = () => {
    setIsImportant((prev) => !prev);
  };

  // 게시글 제목
  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 게시글 내용
  const [content, setContent] = useState('');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // 링크 첨부
  const [originalUrl, setOriginalUrl] = useState('');
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };

  return {
    isImportant,
    title,
    content,
    originalUrl,
    setIsImportant,
    setTitle,
    setContent,
    setOriginalUrl,
    handleToggleChange,
    handleTitleChange,
    handleContentChange,
    handleLinkChange,
  };
};
