interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

export const Step2InstitutionType = ({ goToNext, goToPrev }: StepProps) => {
  return (
    <div>
      <h1>시설 유형 선택</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
