import { CareType, WorkDay } from './common';

/* 요양보호사 홈 화면 */
export interface WorkSchedule {
  workStartTime: string;
  workEndTime: string;
  seniorName: string;
  seniorGender: 'MALE' | 'FEMALE';
  seniorAge: number;
  seniorCareType: CareType[];
  workLocation: string;
}

// 요양 보호사 홈 화면 데이터 조회 응답
export interface CaregiverHomeResponse {
  name: string;
  applicationCount: number;
  recruitmentCount: number;
  workScheduleList: WorkSchedule[];
  isWorking: boolean;
}

/* 요양보호사 나의 일자리 */
export interface CaregiverCompletedMatching {
  id: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'MALE' | 'FEMALE';
  elderlyProfileImageUrl: string;
  workDays: WorkDay[];
  workAddress: string;
  careTypes: CareType[];
  healthCondition: string;
  institutionName: string;
  note: string;
}

// 요양보호사 확정된 일자리 리스트 조회 응답
export type CaregiverCompletedMatchingResponse = CaregiverCompletedMatching[];

// 메모 수정 요청
export interface MemoEditRequest {
  note: string;
}
