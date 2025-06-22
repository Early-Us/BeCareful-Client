export interface CareInfo {
  careType: string;
  detailCareTypes: string[];
}

export interface RecruitmentInfo {
  recruitmentId: number;
  title: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  workSalaryType: string;
  workSalaryAmount: number;
  description: string;
  careInfoList: CareInfo[];
}

export interface ElderlyInfo {
  name: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  hasInmate: boolean;
  hasPet: boolean;
  profileImageUrl: string;
  careLevel: string;
  healthCondition: string;
}

export interface InstitutionInfo {
  name: string;
  address: string;
}

export interface RecruitmentDetailResponse {
  recruitmentInfo: RecruitmentInfo;
  elderlyInfo: ElderlyInfo;
  institutionInfo: InstitutionInfo;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
  matchRate: number;
}
