import { postComment, postMedia, postPosting } from '@/api/community';
import { CommentRequest } from '@/types/Community/comment';
import { PostRequest } from '@/types/Community/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/* mutation */
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

// 게시글 작성 mutation
export const usePostPostingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardType,
      postData,
    }: {
      boardType: string;
      postData: PostRequest;
    }) => postPosting(boardType, postData),
    onSuccess: (response, variables) => {
      console.log('usePostPostingMutation - 게시글 작성 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['posts', variables.boardType],
      });
    },
    onError: (error) => {
      console.error('usePostPostingMutation - 게시글 작성 실패:', error);
    },
  });
};

// 댓글 작성 mutation
export const usePostCommentMutation = (boardType: string, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: CommentRequest) =>
      postComment(boardType, postId, comment),
    onSuccess: (response) => {
      console.log('usePostCommentMutation - 댓글 작성 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
    },
    onError: (error) => {
      console.error('usePostCommentMutation - 댓글 작성 실패:', error);
    },
  });
};
