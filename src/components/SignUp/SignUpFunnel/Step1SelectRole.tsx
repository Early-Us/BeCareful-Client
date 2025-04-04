import { useSignUpContext } from '@/contexts/SignUpContext';

export const Step1SelectRole = () => {
  const { goToNext } = useSignUpContext();
  return (
    <div>
      <h1>센터장, 대표, 사회복지사 정하기</h1>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
