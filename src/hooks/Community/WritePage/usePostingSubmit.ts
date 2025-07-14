import { PostRequest } from '@/types/Community/post';
import { usePostPostingMutation } from '../useCommunityMutations';
import { Board_Type_Mapping } from '@/constants/communityBoard';
import { getDraftStorageKey } from './getDraftStorageKey';

export const usePostingSubmit = (board: string, onClose: () => void) => {
  // 게시글 작성 api mutation
  const { mutateAsync: postPostingMutate } = usePostPostingMutation();

  const handleSubmit = async ({
    title,
    content,
    isImportant,
    originalUrl,
    imageList,
    videoList,
    fileList,
  }: PostRequest) => {
    try {
      const requestBoard = Board_Type_Mapping[board];
      const postData: PostRequest = {
        title,
        content,
        isImportant,
        originalUrl,
        imageList,
        videoList,
        fileList,
      };

      await postPostingMutate({ boardType: requestBoard, postData });

      const storageKey = getDraftStorageKey(board);
      localStorage.removeItem(storageKey);

      console.log('게시글 작성 완료', postData);

      onClose();
    } catch (error) {
      console.log('게시글 작성 post 실패: ', error);
    }
  };

  return { handleSubmit };
};
