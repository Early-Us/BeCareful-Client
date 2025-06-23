import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
import { ReactComponent as Participation } from '@/assets/icons/community/Participation.svg';

/* 커뮤니티 관련 함수 */
// parameter로 사용할 boardType
export const BoardTypeMapping: { [key: string]: string } = {
  '협회 공지': 'association-notice',
  '공단 공지': 'service-notice',
  '정보 공유': 'information-sharing',
  '참여 신청': 'participation-application',
};

export const AuthorRankMapping: { [key: string]: string } = {
  CENTER_DIRECTOR: '회장',
  REPRESENTATIVE: '임원진',
  SOCIAL_WORKER: '회원',
  none: '회원',
};

/* 커뮤니티 공통 인터페이스 */
// pageable 파라미터
export interface PageableRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 공통 사용 인터페이스: 저자 정보
export interface AuthorInfo {
  authorId: number;
  authorName: string;
  authorInstitutionRank:
    | 'CENTER_DIRECTOR'
    | 'REPRESENTATIVE'
    | 'SOCIAL_WORKER'
    | 'none';
  institutionImageUrl: string;
}

// 공통 사용 인터페이스: 미디어, 파일 항목 구조
export interface MediaItem {
  fileName: string;
  mediaUrl: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  fileSize: number;
  videoDuration: number;
}

// 게시판 정보를 담기 위한 인터페이스
interface Boards {
  label: string;
  api: string;
  icon: React.ElementType;
}

// 게시판 리스트 : CommunityHome에서 사용
export const BoardList: Boards[] = [
  { label: '협회 공지', api: BoardTypeMapping['협회 공지'], icon: NoticeIcon },
  {
    label: '공단 공지',
    api: BoardTypeMapping['공단 공지'],
    icon: NoticeIcon,
  },
  {
    label: '정보 공유',
    api: BoardTypeMapping['정보 공유'],
    icon: Information,
  },
  {
    label: '참여 신청',
    api: BoardTypeMapping['참여 신청'],
    icon: Participation,
  },
];

/* 커뮤니티 홈 화면 */
// 커뮤니티 탭 협회 정보 조회 응답
export interface AssociationInfoResponse {
  associationId: number;
  associationName: string;
  associationMemberCount: number;
}

/* 게시글 */
// 특정 게시글 상세 조회
export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  isImportant: boolean;
  isEdited: boolean;
  postedDate: string;
  author: AuthorInfo;
  imageUrls: string[];
  videoUrls: string[];
  fileUrls: string[];
  isMyPost: boolean;
  originalUrl: string;
}

// 게시글 작성 및 수정(요청 구조 동일)
export interface PostRequest {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
  imageList: MediaItem[];
  videoList: MediaItem[];
  fileList: MediaItem[];
}

// 게시글 목록 항목 (특정 게시판 목록 및 필독 게시글 목록에서 사용)
export interface PostListItem {
  postId: number;
  title: string;
  isImportant: boolean;
  thumbnailUrl: string;
  createdAt: string;
  author: AuthorInfo;
}

// 특정 게시판의 모든 게시글 리스트 조회
export type BoardPostListResponse = PostListItem[];

// 모든 게시판의 필독 게시글 모아보기
export type ImportantPostListResponse = PostListItem[];

/* 댓글 */
// 댓글 항목
export interface Comment {
  content: string;
  createdAt: string;
  author: AuthorInfo;
}

// 댓글 내용 조회 (댓글 목록)
export type CommentListResponse = Comment[];

// 댓글 등록 요청 본문
export interface CommentRequest {
  content: string;
}
