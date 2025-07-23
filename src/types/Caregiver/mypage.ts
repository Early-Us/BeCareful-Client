import { WorkApplication } from './common';

/* 요양보호사 마이페이지 */
// 요양보호사 마이페이지 데이터 조회 응답
export interface CaregiverMyResponse {
  name: string;
  gender: 'MALE' | 'FEMALE';
  phoneNumber: string;
  profileImageUrl: string;
  certificateNames: string[];
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
  careerTitle: string;
  careerLastModifyDate: string;
  workApplicationInfo: WorkApplication;
  isWorkApplicationActive: boolean;
  workApplicationLastModifyDate: string;
}

/* 요양보호사 경력서 */
export interface CareerDetail {
  workInstitution: string;
  workYear: string;
}

// 경력서 조회 응답
export interface CareerResponse {
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  careerDetails: CareerDetail[];
}

// 경력서 등록 및 수정 요청
export interface CareerRequest {
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  careerDetails: CareerDetail[];
}
