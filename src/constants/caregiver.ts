/* 요양보호사 관련 mapping 함수들 */
// 성별
export const GenderMapping: { [key: string]: string } = {
  FEMALE: '여성',
  MALE: '남성',
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
