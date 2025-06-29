import { CARE_LEVELS } from '@/constants/careLevels.socialWorker';
import { CARE_TYPES } from '@/constants/careTypes.socialWorker';

export interface AreaSocial {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}

export type CareLevel = (typeof CARE_LEVELS)[number];

export type CareType = (typeof CARE_TYPES)[number];

export type Gender = 'MALE' | 'FEMALE';
