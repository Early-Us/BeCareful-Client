import {
  getAssociationInfo,
  getComment,
  getImportantPosting,
  getPostDetail,
  getPostingList,
} from '@/api/community';
import { Board_List } from '@/constants/communityBoard';
import { CommentListResponse } from '@/types/Community/comment';
import { PageableRequest } from '@/types/Community/common';
import { AssociationInfoResponse } from '@/types/Community/community';
import {
  BoardPostListResponse,
  ImportantPostListResponse,
  PostDetailResponse,
} from '@/types/Community/post';
import { useQueries, useQuery } from '@tanstack/react-query';

// 특정 게시판의 모든 게시글 리스트 조회
export const useBoardPostList = (
  boardType: string,
  pageable: PageableRequest,
) => {
  return useQuery<BoardPostListResponse, Error>({
    queryKey: ['postingList', boardType, pageable],
    queryFn: () => getPostingList(pageable, boardType),
  });
};

/* CommunityHome */
// 모든 게시판의 필독 게시글 모아보기
export const useImportantPostings = (pageable: PageableRequest) => {
  return useQuery<ImportantPostListResponse, Error>({
    queryKey: ['importantPostingList', pageable],
    queryFn: () => getImportantPosting(pageable),
  });
};

// 여러 게시판의 게시글 목록 동시에 조회
// 특정 게시판의 모든 게시글 리스트 조회 api 이용
export const useBoardPostings = (pageable: PageableRequest) => {
  return useQueries({
    queries: Board_List.map((board) => ({
      queryKey: ['boardPostingList', board.api, pageable],
      queryFn: () => getPostingList(pageable, board.api),
      staleTime: 1000 * 60 * 5, // 5분 동안 stale 상태로 간주
      gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    })),
  });
};

/* CommunityPost */
// 특정 게시글 상세 조회
export const usePostDetail = (boardType: string, postId: number) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: ['postDetail', boardType, postId],
    queryFn: () => getPostDetail(boardType, postId),
    enabled: !!boardType && postId > 0, // boardType과 postId가 유효할 때만 쿼리 실행
  });
};

// 댓글 조회
export const useComments = (boardType: string, postId: number) => {
  return useQuery<CommentListResponse, Error>({
    queryKey: ['comments', boardType, postId],
    queryFn: () => getComment(boardType, postId),
    enabled: !!boardType && postId > 0, // boardType과 postId가 유효할 때만 쿼리 실행
  });
};

/* CommunityPage */
// 커뮤니티 탭 협회 정보 조회
export const useAssociationInfo = (enabled: boolean) => {
  return useQuery<AssociationInfoResponse, Error>({
    queryKey: ['associationInfo'],
    queryFn: getAssociationInfo,
    enabled: enabled,
  });
};
