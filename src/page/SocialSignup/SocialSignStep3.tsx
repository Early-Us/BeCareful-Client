import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SocialStepProps } from '@/type/SocialSignUp';
import { SocialSearchInput } from '@/components/SocialSignUp/SearchInputRight';
import { Button } from '@/components/common/Button/Button';
import { institutionData } from '@/components/SocialSignUp/institutionData';

export const SocialStep3 = ({
  formSocialData,
  setFormSocialData,
  onPrevious,
  onNext,
}: SocialStepProps) => {
  const [, setSelectedInstitution] = useState('');
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleInstitutionSelect = (institutionName: string) => {
    const institution = institutionData.find(
      (inst) => inst.institutionName === institutionName,
    );
    if (institution) {
      setSelectedInstitution(institutionName);
      setFormSocialData((prev) => ({
        ...prev,
        institutionId: institution.institutionId,
      }));
    }
  };

  const handleNextStep = async () => {
    if (!formSocialData.institutionId) {
      alert('기관을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/nursingInstitution/${formSocialData.institutionId}/exists`,
      );
      console.log('API 응답:', response.data);

      if (response.data === true) {
        setFormSocialData((prev) => ({ ...prev, isAgreedToTerms: true }));
        onNext(7);
      } else {
        onNext();
      }
    } catch (error) {
      console.error('(socialsignstep3)', error);
      alert('기관 정보를 확인하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>
        소속된 기관명을 입력하세요
        <span className="highlight">
          소속된 기관의 정확한 명칭을 입력해 주세요.
        </span>
      </Header>
      <SearchContainer>
        <SocialSearchInput onInstitutionSelect={handleInstitutionSelect} />
      </SearchContainer>
      <ButtonContainer>
        <Button variant={'blue'} height="52px" onClick={handleNextStep}>
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
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-sizing: border-box;
  width: 100%;
`;
