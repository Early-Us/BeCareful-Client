/* 요양보호사 관련 mapping 함수들 */
import { WorkLocation } from '@/types/Caregiver/common';

// 성별
export const GenderMapping: { [key: string]: string } = {
  FEMALE: '여성',
  MALE: '남성',
};

export const DayMapping: { [key: string]: string } = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const APIDayMapping: { [key: string]: string } = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

export const TimeMapping: { [key: string]: string } = {
  MORNING: '오전',
  AFTERNOON: '오후',
  EVENING: '저녁',
};

const APITimeMapping: { [key: string]: string } = {
  오전: 'MORNING',
  오후: 'AFTERNOON',
  저녁: 'EVENING',
};

export const SalaryTypeMapping: { [key: string]: string } = {
  HOUR: '시급',
  MONTH: '월급',
  YEAR: '연봉',
};

export const APISalaryTypeMapping: {
  [key: string]: 'HOUR' | 'MONTH' | 'YEAR';
} = {
  시급: 'HOUR',
  일급: 'MONTH',
  연봉: 'YEAR',
};

/* 요양보호사 관련 format 함수들 */
// caretype
export const CareTypeFormat = (caretypes: string[], length: number) => {
  if (caretypes.length <= length) {
    return caretypes.join(', ');
  } else {
    const count = caretypes.length - length;
    return `${caretypes.slice(0, length).join(', ')} 외 ${count}개`;
  }
};

// workday
export const DayFormat = (days: string[]) => {
  return days.map((day) => DayMapping[day]).join(', ');
};

export const APIDayFormat = (days: string[]) => {
  return days.map((day) => APIDayMapping[day]);
};

// worktime
export const TimeFormat = (times: string[]) => {
  return times.map((time) => TimeMapping[time]).join(', ');
};

export const APITimeFormat = (times: string[]) => {
  return times.map((time) => APITimeMapping[time]);
};

// location
export const LocationFormat = (
  workLocations: WorkLocation[],
  length: number,
) => {
  const locations = workLocations.map((location) =>
    location.dongEupMyeon === '전체'
      ? `${location.siGuGun} ${location.dongEupMyeon}`
      : `${location.dongEupMyeon}`,
  );

  if (workLocations.length <= length) {
    return locations.join(',');
  } else {
    const count = locations.length - length;
    return `${locations.slice(0, length).join(', ')} 외 ${count}개`;
  }
};
