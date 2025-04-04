interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

export const Step4UploadPhoto = ({ goToNext, goToPrev }: StepProps) => {
  return (
    <div>
      <h1>사진 업로드</h1>
      <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button>
    </div>
  );
};
