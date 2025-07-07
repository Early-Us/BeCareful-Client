/* 커뮤니티 공통 인터페이스 */
// pageable 파라미터
export interface PageableRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 저자 정보
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

// 미디어, 파일 항목 구조
export interface MediaItem {
  fileName: string;
  mediaUrl: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  fileSize: number;
  videoDuration: number;
}
