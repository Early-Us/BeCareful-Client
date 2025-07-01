export const PAY_LABEL_TO_CODE = {
  시급: 'HOUR',
  일급: 'DAY',
  월급: 'MONTH',
  연봉: 'YEAR',
} as const;

export const PAY_CODE_TO_LABEL = {
  HOUR: '시급',
  DAY: '일급',
  MONTH: '월급',
  YEAR: '연봉',
} as const;

export const DAY_KO_TO_EN = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
} as const;
