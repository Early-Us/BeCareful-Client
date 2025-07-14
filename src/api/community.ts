import { AssociationInfoResponse } from '@/types/Community/community';
import { axiosInstance } from './axiosInstance';
import { MediaItem, PageableRequest } from '@/types/Community/common';
import {
  BoardPostListResponse,
  ImportantPostListResponse,
  PostDetailResponse,
  PostRequest,
} from '@/types/Community/post';
import { CommentListResponse, CommentRequest } from '@/types/Community/comment';
import { getVideoDuration } from '@/utils/communityMedia';

/* api 요청 */
// 커뮤니티 탭 협회 정보 조회
export const getAssociationInfo =
  async (): Promise<AssociationInfoResponse> => {
    const response = await axiosInstance.get('/community/my/association');
    return response.data;
  };

// 미디어 파일 업로드
export const postMedia = async (
  file: File,
  fileTypeParam: 'FILE' | 'IMAGE' | 'VIDEO',
): Promise<MediaItem | null> => {
  const formData = new FormData();
  formData.append('file', file);

  let duration = 0;
  if (fileTypeParam === 'VIDEO') {
    try {
      duration = await getVideoDuration(file);
    } catch (e) {
      console.error(`영상 길이 얻기 실패: ${file.name}`, e);
      duration = 0;
    }
  }

  const response = await axiosInstance.post(
    '/community/media/upload',
    formData,
    {
      params: {
        fileType: fileTypeParam,
        ...(fileTypeParam === 'VIDEO' && { videoDuration: duration }), // videoDuration 파라미터 조건부 추가
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

// 게시글 작성
export const postPosting = async (boardType: string, postData: PostRequest) => {
  const response = await axiosInstance.post(
    `/community/board/${boardType}/post`,
    postData,
  );
  return response;
};

// 모든 게시판의 필독 게시글 모아보기
export const getImportantPosting = async (
  pageable: PageableRequest,
): Promise<ImportantPostListResponse> => {
  const response = await axiosInstance.get('/community/board/important', {
    params: {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort && pageable.sort.length > 0 && { sort: pageable.sort }),
    },
  });
  return response.data;
};

// 특정 게시판의 모든 게시글 리스트 조회
export const getPostingList = async (
  pageable: PageableRequest,
  boardType: string,
): Promise<BoardPostListResponse> => {
  const response = await axiosInstance.get(
    `/community/board/${boardType}/post`,
    {
      params: {
        page: pageable.page,
        size: pageable.size,
        ...(pageable.sort &&
          pageable.sort.length > 0 && { sort: pageable.sort }),
      },
    },
  );
  return response.data;
};

// 특정 게시글 상세 조회
export const getPostDetail = async (
  boardType: string,
  postId: number,
): Promise<PostDetailResponse> => {
  const response = await axiosInstance.get(
    `/community/board/${boardType}/post/${postId}`,
  );
  return response.data;
};

// 댓글 조회
export const getComment = async (
  boardType: string,
  postId: number,
): Promise<CommentListResponse> => {
  const response = await axiosInstance.get(
    `/community/board/${boardType}/post/${postId}/comment`,
  );
  return response.data;
};

// 댓글 작성
export const postComment = async (
  boardType: string,
  postId: number,
  comment: CommentRequest,
) => {
  const response = await axiosInstance.post(
    `/community/board/${boardType}/post/${postId}/comment`,
    comment,
  );
  return response;
};
