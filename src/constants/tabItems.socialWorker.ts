import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Matching } from '@/assets/icons/matching/MatchingIcon.svg';
import { ReactComponent as Community } from '@/assets/icons/tabbar/Community.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
export const SOCIAL_WORKER_TAB = [
  {
    key: 'home',
    path: '/home/social',
    label: '홈',
    Icon: Home,
  },
  {
    key: 'matching',
    path: '/match/social',
    label: '매칭하기',
    Icon: Matching,
  },
  {
    key: 'community',
    path: '/community',
    label: '커뮤니티',
    Icon: Community,
  },
  {
    key: 'elderly',
    path: '/elderly',
    label: '마이페이지',
    Icon: Mypage,
  },
] as const;
