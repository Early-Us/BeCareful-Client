import { useSignUpContext } from '@/contexts/SocialWorkerSignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as SignUpComplete } from '@/assets/icons/signup/SignUpComplete.svg';
import { useEffect } from 'react';
import { useSignUpMember } from '@/api/signupFunnel';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';

export const Step6SignUpComplete = () => {
  const { formData } = useSignUpContext();
  const { mutate } = useSignUpMember();
  const navigate = useNavigate();
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);

  useEffect(() => {
    if (formData.nursingInstitutionId != null) {
      mutate(
        {
          nursingInstitutionId: formData.nursingInstitutionId,
          realName: formData.realName,
          nickName: formData.nickName,
          birthYymmdd: formData.birthYymmdd,
          genderCode: formData.genderCode,
          phoneNumber: formData.phoneNumber,
          institutionRank: formData.institutionRank,
          isAgreedToTerms: formData.isAgreedToTerms,
          isAgreedToCollectPersonalInfo: formData.isAgreedToCollectPersonalInfo,
          isAgreedToReceiveMarketingInfo:
            formData.isAgreedToReceiveMarketingInfo,
        },
        {
          onSuccess: () => {
            setCurrentUserInfo({
              realName: formData.realName,
              nickName: formData.nickName,
              institutionRank: formData.institutionRank,
              associationRank: 'none',
            });
            navigate('/community/create');
          },
          onError: (error) => {
            console.error('회원가입 실패:', error); // TODO
          },
        },
      );
    }
  }, [formData, mutate, navigate]);

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
        <Button height="52px" variant="blue" disabled>
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
