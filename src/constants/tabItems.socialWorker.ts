import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Task } from '@/assets/icons/tabbar/Task.svg';
import { ReactComponent as Recruite } from '@/assets/icons/tabbar/Recuite.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';

export const SOCIAL_WORKER_TAB = [
  {
    key: 'home',
    path: '/home/caregiver',
    label: '홈',
    Icon: Home,
  },
  {
    key: 'work',
    path: '/work',
    label: '일자리',
    Icon: Task,
  },
  {
    key: 'apply',
    path: '/apply',
    label: '지원현황',
    Icon: Recruite,
  },
  {
    key: 'mypage',
    path: '/mypage',
    label: '마이페이지',
    Icon: Mypage,
  },
] as const;
