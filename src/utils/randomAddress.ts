//공공api 연결 전 임시 로직
const getRandomString = (length: number) => {
  const chars = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const getRandomAddress = () => {
  const street = `${getRandomString(5)}`;
  const detail = `${getRandomString(5)}`;
  return { street, detail };
};
