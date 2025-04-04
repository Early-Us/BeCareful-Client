interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

export const Step3ContactInfo = ({ goToNext, goToPrev }: StepProps) => {
  return (
    <div>
      <h1>연락처 입력</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
