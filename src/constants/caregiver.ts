/* 요양보호사 관련 mapping 함수들 */
import { WorkLocation } from '@/types/Caregiver/common';

// 성별
export const GenderMapping: { [key: string]: string } = {
  FEMALE: '여성',
  MALE: '남성',
};

const DayMapping: { [key: string]: string } = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const TimeMapping: { [key: string]: string } = {
  MORNING: '오전',
  AFTERNOON: '오후',
  EVENING: '저녁',
};

/* 요양보호사 관련 format 함수들 */
// caretype
export const CareTypeFormat = (caretypes: string[], length: number) => {
  if (caretypes.length <= length) {
    return caretypes.join(', ');
  } else {
    const count = caretypes.length - length;
    return `${caretypes.slice(0, length).join(',')} 외 ${count}개`;
  }
};

// workday
export const DayFormat = (days: string[]) => {
  return days.map((day) => DayMapping[day]).join(', ');
};

// worktime
export const TimeFormat = (times: string[]) => {
  return times.map((time) => TimeMapping[time]).join(', ');
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
    return `${locations.slice(0, length).join(',')} 외 ${count}개`;
  }
};
