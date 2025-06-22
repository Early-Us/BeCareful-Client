import {
  AssociationInfoResponse,
  BoardPostListResponse,
  CommentListResponse,
  CommentRequest,
  ImportantPostListResponse,
  MediaItem,
  PageableRequest,
  PostDetailResponse,
  PostRequest,
} from '@/types/Community';
import { axiosInstance } from './axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      console.log('mutation - 미디어 업로드 성공:', data);
    },
    onError: (error) => {
      console.error('mutation - 미디어 업로드 실패:', error);
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
      console.log('mutation - 게시글 작성 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['posts', variables.boardType],
      });
    },
    onError: (error) => {
      console.error('mutation - 게시글 작성 실패:', error);
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
      console.log('mutation - 댓글 작성 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['comments', boardType, postId],
      });
    },
    onError: (error) => {
      console.error('mutation - 댓글 작성 실패:', error);
    },
  });
};

/* 이외의 함수 */
// 영상 길이 얻는 함수
const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata'; // 메타데이터만 로드

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src); // 임시 URL 해제
      resolve(video.duration); // 길이 (초) 반환
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src); // 임시 URL 해제
      reject(new Error('Failed to load video metadata.')); // 에러 발생 시 reject
    };

    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;
  });
};
