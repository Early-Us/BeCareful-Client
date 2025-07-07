import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
import { ReactComponent as Participation } from '@/assets/icons/community/Participation.svg';
import { BoardTypeMapping } from '@/constants/board';

/* 커뮤니티 홈 화면 */
// 커뮤니티 탭 협회 정보 조회 응답
export interface AssociationInfoResponse {
  associationId: number;
  associationName: string;
  associationMemberCount: number;
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
