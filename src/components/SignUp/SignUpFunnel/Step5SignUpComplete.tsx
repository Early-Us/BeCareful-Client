import { useSignUpContext } from '@/contexts/SignUpContext';

export const Step5SignUpComplete = () => {
  const { goToPrev } = useSignUpContext();
  return (
    <div>
      <h1>회원가입 완료</h1>
      <button onClick={goToPrev}>이전</button>
    </div>
  );
};
