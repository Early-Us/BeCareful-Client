import {
  PAY_CODE_TO_LABEL,
  PAY_LABEL_TO_CODE,
} from '@/constants/payType.socialWorker';

export interface MatchingRecruitmentPayload {
  elderlyId: number;
  title: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  workSalaryType: PayCode;
  workSalaryAmount: number;
  description: string;
}

export interface Caregiver {
  profileImageUrl: string;
  caregiverId: number;
  name: string;
  resumeTitle: string;
}

export interface MatchingElderData {
  elderlyName: string;
  careType: string[];
  elderlyAge: number;
  gender: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  unAppliedCaregivers: Caregiver[];
  appliedCaregivers: Caregiver[];
}

export type PayLabel = keyof typeof PAY_LABEL_TO_CODE;
export type PayCode = keyof typeof PAY_CODE_TO_LABEL;
