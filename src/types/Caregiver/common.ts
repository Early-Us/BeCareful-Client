/* 공통 타입 정의 - 백엔드 enum 기준 */
// 근무 요일
export type WorkDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

/* 공통 인터페이스 정의 */
// 근무 지역
export interface WorkLocation {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

// 근무 시간대
export type WorkTime = 'MORNING' | 'AFTERNOON' | 'EVENING';

// 지원 정보
export interface WorkApplication {
  workLocations: WorkLocation[];
  workDays: WorkDay[];
  workTimes: WorkTime[];
  careTypes: string[];
  workSalaryType: 'HOUR' | 'MONTH' | 'YEAR';
  workSalaryAmount: number;
}

// 매칭 공고
export interface RecruitmentInfo {
  recruitmentId: number;
  title: string;
  // careTypes: CareType[];
  careTypes: string[];
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryType: 'HOUR' | 'MONTH' | 'YEAR';
  workSalaryAmount: number;
  isRecruiting: boolean;
  institutionName: string;
}

// 매칭 공고 리스트
export interface Recruitment {
  recruitmentInfo: RecruitmentInfo;
  matchingResultStatus: '높음' | '보통' | '낮음';
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
}
