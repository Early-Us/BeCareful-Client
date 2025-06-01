export const getTodayDate = () => {
  const today = new Date();
  const week = ['', '월', '화', '수', '목', '금', '토', '일'];
  if (today.getMonth() < 9) {
    if (today.getDate() < 10)
      return `${today.getFullYear()}.0${today.getMonth() + 1}.0${today.getDate()} ${week[today.getDay()]}요일`;
    else
      return `${today.getFullYear()}.0${today.getMonth() + 1}.${today.getDate()} ${week[today.getDay()]}요일`;
  } else {
    if (today.getDate() < 10)
      return `${today.getFullYear()}.0${today.getMonth() + 1}.0${today.getDate()} ${week[today.getDay()]}요일`;
    else
      return `${today.getFullYear()}.0${today.getMonth() + 1}.${today.getDate()} ${week[today.getDay()]}요일`;
  }
};
