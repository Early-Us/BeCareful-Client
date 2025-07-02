import { DAY_LABELS } from '@/constants/day.socialWorker';
import {
  PAY_CODE_TO_LABEL,
  PAY_LABEL_TO_CODE,
} from '@/constants/payType.socialWorker';
import { Gender } from '@/types/Elderly';

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
  recruitmentInfo: {
    careType: string[];
    workDays: string[];
    workStartTime: string;
    workEndTime: string;
    elderlyInfo: {
      name: string;
      address: string;
      gender: Gender;
      age: number;
      hasInmate: boolean;
      hasPet: boolean;
      profileImageUrl: string;
      careLevel: string;
      healthCondition: string;
    };
  };
  matchedCaregivers: MatchingCaregiver[];
  appliedCaregivers: MatchingCaregiver[];
}

export interface MatchingCaregiver {
  caregiverInfo: {
    caregiverId: number;
    profileImageUrl: string;
    name: string;
    applicationTitle: string;
  };
  matchingResultStatus: string;
}

export type PayLabel = keyof typeof PAY_LABEL_TO_CODE;
export type PayCode = keyof typeof PAY_CODE_TO_LABEL;

export interface MatchingCareTypeOption {
  key: string;
  title: string;
  description: string;
}

export type DayLabel = (typeof DAY_LABELS)[number];
