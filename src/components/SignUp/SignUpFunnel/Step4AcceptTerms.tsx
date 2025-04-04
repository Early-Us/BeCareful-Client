import { useSignUpContext } from '@/contexts/SignUpContext';

export const Step4AcceptTerms = () => {
  const { goToNext, goToPrev } = useSignUpContext();
  return (
    <div>
      <h1>약관 동의</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
