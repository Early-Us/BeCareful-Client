import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as SignUpComplete } from '@/assets/icons/signup/SignUpComplete.svg';
import { useEffect, useState } from 'react';
import { signUpMember } from '@/api/signupFunnel';

export const Step6SignUpComplete = () => {
  const { formData } = useSignUpContext();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (formData.nursingInstitutionId == null) {
      return;
    }

    try {
      await signUpMember({
        nursingInstitutionId: formData.nursingInstitutionId,
        realName: formData.realName,
        nickName: formData.nickName,
        birthYymmdd: formData.birthYymmdd,
        genderCode: formData.genderCode,
        phoneNumber: formData.phoneNumber,
        institutionRank: formData.institutionRank,
        isAgreedToTerms: formData.isAgreedToTerms,
        isAgreedToCollectPersonalInfo: formData.isAgreedToCollectPersonalInfo,
        isAgreedToReceiveMarketingInfo: formData.isAgreedToReceiveMarketingInfo,
      });

      setIsSubmitted(true);
    } catch (e) {
      console.error('회원가입 요청 실패', e);
    }
  };

  useEffect(() => {
    if (!isSubmitted) {
      handleSubmit();
    }
  }, [isSubmitted]);

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          기관 회원 가입이 완료되었습니다.
          <br />
          <span className="highlight">지금 바로 서비스를 시작해보세요!</span>
        </Title>
      </HeaderSection>

      <SignUpCompleteContainer>
        <SignUpComplete />
      </SignUpCompleteContainer>

      <ButtonContainer>
        <Button
          onClick={() => (window.location.href = '/community/create')}
          height="52px"
          variant="blue"
        >
          돌봄다리 시작하기
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
`;

const SignUpCompleteContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  z-index: 3;

  svg {
    width: 240px;
    height: auto;
    display: block;
  }
`;
