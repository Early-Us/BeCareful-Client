import { useSignUpContext } from '@/contexts/SignUpContext';

export const Step3BasicInfo = () => {
  const { goToNext, goToPrev } = useSignUpContext();
  return (
    <div>
      <h1>기본정보 입력</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
