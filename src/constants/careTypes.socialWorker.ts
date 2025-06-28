export const CARE_TYPES = [
  '식사보조',
  '이동보조',
  '배변보조',
  '일상생활',
  '질병보조',
] as const;

export type CareType = (typeof CARE_TYPES)[number];

export const CareTypeList: Record<CareType, string[]> = {
  식사보조: ['식사 준비', '식사 수발', '식사 후 정리'],
  이동보조: ['침대 ↔ 휠체어 이동', '외출 보조', '보행 보조'],
  배변보조: ['배변 유도', '기저귀 교체', '변기 이동 보조'],
  일상생활: ['세면 도움', '옷 갈아입기 보조', '집안 정리'],
  질병보조: ['약 복용 관리', '병원 동행', '혈당 체크'],
};
