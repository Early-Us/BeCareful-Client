import { useState } from 'react';
import { CommentRequest } from '@/types/Community/comment';
import { usePostCommentMutation } from '@/api/community';

/* CommunityPostPage */
// 댓글 입력 폼과 관련된 로직 관리
export const useCommentSend = (boardType: string, postId: number) => {
  const [reply, setReply] = useState('');
  const { mutate: postCommentMutate, error: commentError } =
    usePostCommentMutation(boardType, postId);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleReplySend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) {
      // 댓글 내용이 비어있으면 전송 x
      return;
    }
    const commentRequest: CommentRequest = { content: reply };
    postCommentMutate(commentRequest, {
      onSuccess: () => {
        setReply('');
      },
      onError: () => {
        console.error('댓글 작성 에러:', commentError);
      },
    });
  };

  return { reply, handleReplyChange, handleReplySend };
};
