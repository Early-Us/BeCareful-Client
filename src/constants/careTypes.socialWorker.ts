import { CareType } from '@/types/Elderly';
import { MatchingCareTypeOption } from '@/types/Matching.socialWorker';

export const CARE_TYPES = [
  '식사보조',
  '이동보조',
  '배변보조',
  '일상생활',
  '질병보조',
] as const;

export const CARE_TYPE_DETAILS: Record<CareType, string[]> = {
  식사보조: ['식사 준비', '식사 수발', '식사 후 정리'],
  이동보조: ['침대 ↔ 휠체어 이동', '외출 보조', '보행 보조'],
  배변보조: ['배변 유도', '기저귀 교체', '변기 이동 보조', '식사 차려드리기'],
  일상생활: ['세면 도움', '옷 갈아입기 보조', '집안 정리'],
  질병보조: ['약 복용 관리', '병원 동행', '혈당 체크'],
};
// TODO 여기바뀐듯

export const MATCHING_CARE_TYPE_OPTIONS: MatchingCareTypeOption[] = [
  {
    key: '식사보조',
    title: '식사보조',
    description: '스스로 식사가능, 경관식 보조',
  },
  {
    key: '배변보조',
    title: '배변보조',
    description: '가끔 대소변 실수 시 도움, 기저귀 케어 필요',
  },
  {
    key: '일상생활',
    title: '일상생활',
    description: '청소, 빨래보조',
  },
];
