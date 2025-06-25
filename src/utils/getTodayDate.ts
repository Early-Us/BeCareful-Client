export const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const day = week[today.getDay()];

  return `${year}.${month}.${date} ${day}요일`;
};
