import { useState, useEffect } from 'react';
import { useSearchInstitution } from '@/api/signupFunnel';
import { useSignUpContext } from '@/contexts/SignUpContext';

export const useInstitutionSearch = () => {
  const { setFormData, goToNext, goToPrev } = useSignUpContext();

  const [institutionName, setInstitutionName] = useState('');
  const [isRegisteringInstitution, setIsRegisteringInstitution] =
    useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);

  const { isLoading, refetch } = useSearchInstitution(institutionName.trim());

  useEffect(() => {
    if (!searchTrigger) return;

    refetch().then(({ data }) => {
      if (!data) return;

      if (data.length > 0) {
        const selected = data[0];
        setFormData((prev) => ({
          ...prev,
          nursingInstitutionId: selected.institutionId,
        }));
        goToNext();
      } else {
        setIsRegisteringInstitution(true);
      }

      setSearchTrigger(false);
    });
  }, [searchTrigger]);

  const handleCheckInstitution = () => {
    if (!institutionName.trim()) return;
    setSearchTrigger(true);
  };

  const handleRegisterComplete = (newInstitutionId: number) => {
    setFormData((prev) => ({
      ...prev,
      nursingInstitutionId: newInstitutionId,
    }));
    setIsRegisteringInstitution(false);
    goToNext();
  };

  const handleRegisterCancel = () => {
    setIsRegisteringInstitution(false);
    goToPrev();
  };

  return {
    institutionName,
    setInstitutionName,
    isRegisteringInstitution,
    handleCheckInstitution,
    handleClickRegisterInstitution: () => setIsRegisteringInstitution(true),
    handleRegisterComplete,
    handleRegisterCancel,
    isLoading,
  };
};
