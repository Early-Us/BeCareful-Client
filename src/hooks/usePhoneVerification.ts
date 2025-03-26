import { useState } from 'react';
import axios from 'axios';

export const usePhoneVerification = (apiUrl: string) => {
  const [authNumber, setAuthNumber] = useState('');
  const [remainingTime, setRemainingTime] = useState(180);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const sendAuthNumber = async (phoneNumber: string) => {
    try {
      await axios.post(`${apiUrl}/sms/send-auth-number`, { phoneNumber });

      setShowVerificationInput(true);
      setAuthNumber('');
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

  const verifyAuthNumber = async (phoneNumber: string, onNext?: () => void) => {
    try {
      const response = await axios.post(`${apiUrl}/sms/authenticate-number`, {
        phoneNumber,
        authNumber,
      });

      if (response.data.success) {
        alert('인증이 완료되었습니다.');
        onNext?.();
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('인증번호 검증 실패:', error);
      alert('인증번호 검증에 실패했습니다.');
    }
  };

  return {
    authNumber,
    setAuthNumber,
    remainingTime,
    showVerificationInput,
    sendAuthNumber,
    verifyAuthNumber,
  };
};
