interface StepProps {
  onComplete: () => void;
  goToPrev: () => void;
}

export const Step5InstitutionRegister = ({
  onComplete,
  goToPrev,
}: StepProps) => {
  return (
    <div>
      <h1>기관 등록 완료</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={onComplete}>기관 등록 완료</button>
    </div>
  );
};
