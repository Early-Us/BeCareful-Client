import { SignUpFormData, StepProps } from '@/types/SignUp';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SecretInputBox } from '@/components/common/InputBox/SecretInputBox';
import { AgreeCard } from '@/components/SignUp/deprecated/AgreeCard';
import { ReactComponent as ChevronRight } from '@/assets/icons/signup/ChevronRight.svg';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';

export const Step2 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const {
    isAgreedToTerms,
    isAgreedToCollectPersonalInfo,
    isAgreedToReceiveMarketingInfo,
  } = formData;

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isRequiredChecked, setIsRequiredChecked] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    setIsRequiredChecked(isAgreedToTerms && isAgreedToCollectPersonalInfo);
    setIsAllChecked(
      isAgreedToTerms &&
        isAgreedToCollectPersonalInfo &&
        isAgreedToReceiveMarketingInfo,
    );
  }, [
    isAgreedToTerms,
    isAgreedToCollectPersonalInfo,
    isAgreedToReceiveMarketingInfo,
  ]);

  const handleCheckboxChange = (
    key: keyof SignUpFormData,
    checked: boolean,
  ) => {
    setFormData({ ...formData, [key]: checked });
  };

  const handleAllAgree = (checked: boolean) => {
    setFormData({
      ...formData,
      isAgreedToTerms: checked,
      isAgreedToCollectPersonalInfo: checked,
      isAgreedToReceiveMarketingInfo: checked,
    });
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });

    if (!validatePassword(newPassword)) {
      setPasswordError('영문, 숫자, 특수문자를 포함한 8자리 이상 입력하세요.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newConfirmPassword = e.target.value;
    setPasswordConfirm(newConfirmPassword);

    if (newConfirmPassword !== formData.password) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError('');
    }
  };

  const isFormValid =
    isRequiredChecked && validatePassword(formData.password) && !confirmError;

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>비밀번호를 입력하세요</Header>

      <InputWrapper>
        <div>
          <span>비밀번호</span>
          <span className="highlight"> *</span>
        </div>
        <SecretInputBox
          width=""
          state="default"
          placeholder="영문, 숫자, 특수문자를 포함한 8자리 이상"
          guide={passwordError}
          value={formData.password}
          onChange={handlePasswordChange}
        />
      </InputWrapper>

      <InputWrapper>
        <div>
          <span>비밀번호 재입력</span>
          <span className="highlight"> *</span>
        </div>
        <SecretInputBox
          width=""
          state="default"
          placeholder="비밀번호를 다시 입력하세요"
          guide={confirmError}
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
      </InputWrapper>

      <AgreeWrapper>
        <AgreeCard
          pressed={isAllChecked}
          text="전체 동의"
          onClick={() => handleAllAgree(!isAllChecked)}
        />
        <AgreeCheckContainer>
          <AgreeCheck>
            <CheckBox
              id="2"
              checked={isAgreedToTerms}
              onChange={(checked) =>
                handleCheckboxChange('isAgreedToTerms', checked)
              }
              borderRadius=""
              label=""
              select="필수"
              guide="이용약관"
            />
            <ChevronRight />
          </AgreeCheck>
          <AgreeCheck>
            <CheckBox
              id="2"
              checked={isAgreedToCollectPersonalInfo}
              onChange={(checked) =>
                handleCheckboxChange('isAgreedToCollectPersonalInfo', checked)
              }
              borderRadius=""
              label=""
              select="필수"
              guide="개인정보 수집 및 이용 동의"
            />
            <ChevronRight />
          </AgreeCheck>
          <AgreeCheck>
            <CheckBox
              id="3"
              checked={isAgreedToReceiveMarketingInfo}
              onChange={(checked) =>
                handleCheckboxChange('isAgreedToReceiveMarketingInfo', checked)
              }
              borderRadius=""
              label=""
              select="선택"
              guide="마케팅 정보 수신 동의"
            />
            <ChevronRight />
          </AgreeCheck>
        </AgreeCheckContainer>
      </AgreeWrapper>

      <ButtonContainer>
        <Button
          variant={isFormValid ? 'blue' : 'disabled'}
          height="52px"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (isFormValid && onNext) onNext();
          }}
          disabled={!isFormValid}
        >
          다음 단계로 이동
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 24px 16px auto 16px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 20px 0px 20px;

  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const AgreeWrapper = styled.div`
  display: flex;
  height: 218px;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

const AgreeCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const AgreeCheck = styled.div`
  display: flex;
  height: 40px;
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  margin-top: 80px;
  width: 100%;
`;
