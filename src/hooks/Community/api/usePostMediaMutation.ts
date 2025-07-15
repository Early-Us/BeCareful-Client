import { postMedia } from '@/api/community';
import { useMutation } from '@tanstack/react-query';

// 미디어 파일 업로드 mutation
export const usePostMediaMutation = () => {
  return useMutation({
    mutationFn: ({
      file,
      fileTypeParam,
    }: {
      file: File;
      fileTypeParam: 'FILE' | 'IMAGE' | 'VIDEO';
    }) => postMedia(file, fileTypeParam),
    onSuccess: (data) => {
      console.log('usePostMediaMutation - 미디어 업로드 성공:', data);
    },
    onError: (error) => {
      console.error('usePostMediaMutation - 미디어 업로드 실패:', error);
    },
  });
};
