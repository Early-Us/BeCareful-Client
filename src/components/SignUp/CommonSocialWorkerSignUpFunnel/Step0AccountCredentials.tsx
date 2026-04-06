import { authenticateSmsAuthNumber, sendSmsAuthNumber } from '@/api/signup/sms';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useCommonSignUpContext } from '@/contexts/CommonSocialWorkerSignUpContext';
import { PasswordConfirmInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PasswordConfirmInput';
import { PasswordInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PasswordInput';
import { PhoneAuthInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PhoneAuthInput';
import { PASSWORD_RULE_TEXT } from '@/constants/auth';
import { isValidPassword } from '@/hooks/SignUp/usePasswordValidation';

export const Step0AccountCredentials = () => {
  const { goToNext, goToPrev, formData, setFormData } =
    useCommonSignUpContext();

  const [authCode, setAuthCode] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState('');

  const phoneNumber = formData.phoneNumber;
  const password = formData.password;

  const formatRemainTime = (seconds: number) => {
    const minute = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const second = (seconds % 60).toString().padStart(2, '0');
    return `남은시간 ${minute}:${second}`;
  };

  const normalizePhoneNumber = (value: string) => value.replace(/[^0-9]/g, '');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
    setVerifiedPhoneNumber('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleSendCode = async () => {
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
    if (!normalizedPhoneNumber) {
      alert('휴대전화 번호를 입력해주세요.');
      return;
    }

    try {
      setIsSendingCode(true);
      await sendSmsAuthNumber(normalizedPhoneNumber);
      setAuthCode('');
      setVerifiedPhoneNumber('');
      setRemainingTime(180);
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      alert('인증번호 전송에 실패했습니다.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
    if (!normalizedPhoneNumber || authCode.length !== 6) return false;

    try {
      setIsVerifyingCode(true);
      await authenticateSmsAuthNumber(normalizedPhoneNumber, authCode);
      setVerifiedPhoneNumber(phoneNumber);
      alert('휴대전화 인증이 완료되었습니다.');
      return true;
    } catch (error) {
      console.error('인증번호 검증 실패:', error);
      alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.');
      return false;
    } finally {
      setIsVerifyingCode(false);
    }
  };

  useEffect(() => {
    if (remainingTime <= 0) return;
    const timer = window.setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remainingTime]);

  const passwordRuleOk = isValidPassword(password);
  const hasPwInput = password.length > 0;

  const hasConfirmInput = passwordConfirm.length > 0;
  const isMatch = password.length > 0 && password === passwordConfirm;

  const isFormValid =
    phoneNumber.length > 0 &&
    authCode.length === 6 &&
    passwordRuleOk &&
    hasConfirmInput &&
    isMatch;

  const handleNext = async () => {
    if (!isFormValid || isVerifyingCode) return;

    if (verifiedPhoneNumber === phoneNumber) {
      goToNext();
      return;
    }

    const verified = await handleVerifyCode();
    if (verified) {
      goToNext();
    }
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          로그인에 사용하실
          <br />
          전화번호/비밀번호를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
      </HeaderSection>

      <PhoneAuthInput
        phoneNumber={phoneNumber}
        onPhoneNumberChange={handlePhoneNumberChange}
        authCode={authCode}
        onAuthCodeChange={(e) => setAuthCode(e.target.value)}
        onSendCode={handleSendCode}
        sendButtonLabel={isSendingCode ? '전송 중...' : '인증번호 전송'}
        remainTimeText={
          remainingTime > 0 ? formatRemainTime(remainingTime) : ''
        }
      />

      <PasswordInput value={password} onChange={handlePasswordChange} />

      {hasPwInput && (
        <ValidationMessage state={passwordRuleOk ? 'success' : 'error'}>
          {PASSWORD_RULE_TEXT}
        </ValidationMessage>
      )}

      <PasswordConfirmInput
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      {hasConfirmInput && (
        <ValidationMessage state={isMatch ? 'success' : 'error'}>
          {isMatch
            ? '* 비밀번호가 일치합니다.'
            : '* 비밀번호가 일치하지 않습니다.'}
        </ValidationMessage>
      )}

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={handleNext}
          height="52px"
          variant={isFormValid ? 'blue' : 'gray'}
          disabled={!isFormValid || isVerifyingCode}
        >
          {isVerifyingCode ? '인증 중...' : '다음'}
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 112px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-top: 8px;
  color: ${({ theme, state }) =>
    state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
`;
