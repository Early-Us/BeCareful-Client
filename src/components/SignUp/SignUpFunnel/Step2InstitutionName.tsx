import { InstitutionFunnel } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { useSignUpContext } from '@/contexts/SignUpContext';
import { useState } from 'react';

export const Step2InstitutionName = () => {
  const { goToNext, goToPrev } = useSignUpContext();

  const [institutionName, setInstitutionName] = useState('');
  const [, setInstitutionExists] = useState<null | boolean>(null);
  const [isRegisteringInstitution, setIsRegisteringInstitution] =
    useState(false);

  const handleCheckInstitution = () => {
    if (institutionName === '기관있음') {
      setInstitutionExists(true);
      goToNext();
    } else {
      setInstitutionExists(false);
      setIsRegisteringInstitution(true);
    }
  };

  const handleRegisterComplete = () => {
    setIsRegisteringInstitution(false);
    goToNext();
  };

  if (isRegisteringInstitution) {
    return <InstitutionFunnel onDone={handleRegisterComplete} />;
  }
  return (
    <div>
      <h1>소속기관 입력</h1>
      <input
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
        placeholder="기관명 입력"
      />
      <button onClick={goToPrev}>이전</button>
      <button onClick={handleCheckInstitution}>다음</button>
    </div>
  );
};
