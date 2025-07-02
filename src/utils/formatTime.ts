// "00:00:00" → "00:00" 함수임
export const formatHHMM = (time: string): string => {
  return time.slice(0, 5);
};
