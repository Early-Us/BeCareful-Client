import { useSignUpContext } from '@/contexts/SignUpContext';
import { useNicknameValidation } from '@/hooks/SignUp/useNicknameValidation';

const getGenderCode = (char: string): number => {
  if (char === '1' || char === '3') return 1;
  if (char === '2' || char === '4') return 2;
  return 0;
};

export const useBasicInfoForm = () => {
  const { formData, setFormData } = useSignUpContext();
  const { message, state, checkNickname, resetMessage } =
    useNicknameValidation();

  const isNicknameValid = state === 'success';

  const handleChange =
    (field: 'realName' | 'nickName' | 'birthYymmdd' | 'phoneNumber') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      if (field === 'nickName') resetMessage();
    };

  const handleCheckDuplicate = () => {
    checkNickname(formData.nickName);
  };

  const handleBirthAndGenderChange = (
    birthDate: string,
    genderChar: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      birthYymmdd: birthDate,
      genderCode: getGenderCode(genderChar),
    }));
  };

  const isFormValid =
    formData.realName.trim().length > 0 &&
    formData.nickName.trim().length > 0 &&
    formData.birthYymmdd.trim().length === 6 &&
    (formData.genderCode === 1 || formData.genderCode === 2) &&
    formData.phoneNumber.trim().length > 0 &&
    isNicknameValid;

  return {
    formData,
    isFormValid,
    handleChange,
    handleCheckDuplicate,
    handleBirthAndGenderChange,
    message,
    state,
  };
};
