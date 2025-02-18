import axios from 'axios';
import { StepProps } from '@/type/SignUp';

export const handleSendAuthNumber = async (
  phoneNumber: string,
  setShowVerificationInput: React.Dispatch<React.SetStateAction<boolean>>,
  setAuthSent: React.Dispatch<React.SetStateAction<boolean>>,
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>,
  setAuthButtonText: React.Dispatch<React.SetStateAction<string>>,
  apiUrl: string,
) => {
  try {
    await axios.post(`${apiUrl}/sms/send-auth-number`, { phoneNumber });

    setShowVerificationInput(true);
    setAuthSent(true);
    setAuthButtonText('인증번호 전송');
    setRemainingTime(180);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  } catch (error) {
    console.error('인증번호 전송 실패:', error);
    alert('인증번호 전송에 실패했습니다.');
  }
};

export const handleVerifyAuthNumber = async (
  phoneNumber: string,
  authNumber: string,
  apiUrl: string,
  onNext?: () => void,
) => {
  try {
    const response = await axios.post(`${apiUrl}/sms/authenticate-number`, {
      phoneNumber,
      authNumber,
    });

    if (response.data.success) {
      alert('인증이 완료되었습니다.');
      if (onNext) onNext();
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('인증번호 검증 실패:', error);
    alert('인증번호 검증에 실패했습니다.');
  }
};

export const handleGenderChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  _genderInput: string,
  setGenderInput: React.Dispatch<React.SetStateAction<string>>,
  setFormData: React.Dispatch<React.SetStateAction<StepProps['formData']>>,
) => {
  const value = e.target.value;
  if (/^[0-9]{0,1}$/.test(value)) {
    setGenderInput(value);
    setFormData((prevFormData) => {
      if (value === '1' || value === '3') {
        return { ...prevFormData, gender: 'MALE' };
      } else if (value === '2' || value === '4') {
        return { ...prevFormData, gender: 'FEMALE' };
      }
      return prevFormData;
    });
  }
};
