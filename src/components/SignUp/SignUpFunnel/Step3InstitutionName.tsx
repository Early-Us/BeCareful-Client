import { InstitutionFunnel } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';

import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { InstitutionSearchInput } from '@/components/SignUp/SignUpFunnel/Step3InstitutionName/InstitutionSearchInput';
import { useInstitutionSearch } from '@/hooks/SignUp/useInstitutionSearch';

export const Step3InstitutionName = () => {
  const {
    institutionName,
    setInstitutionName,
    isRegisteringInstitution,
    handleCheckInstitution,
    handleClickRegisterInstitution,
    handleRegisterComplete,
    handleRegisterCancel,
    isLoading,
  } = useInstitutionSearch();

  const isInstitutionNameValid = institutionName.trim().length > 0;

  if (isRegisteringInstitution) {
    return (
      <InstitutionFunnel
        onDone={handleRegisterComplete}
        onCancel={handleRegisterCancel}
      />
    );
  }

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관명을 입력하세요<span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관의 정확한 명칭을 검색해 주세요.</SubText>
      </HeaderSection>

      <SearchContainer>
        <InstitutionSearchInput onInstitutionSelect={setInstitutionName} />
      </SearchContainer>
      <SearchContainer>
        <AskText>
          <span className="highlight">* 소속된 기관이 검색되지 않나요?</span>
          <br />
          <span className="bold" onClick={handleClickRegisterInstitution}>
            이곳
          </span>
          을 클릭해 기관을 등록해 보세요.
        </AskText>
      </SearchContainer>

      <ButtonContainer>
        <Button onClick={handleRegisterCancel} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={handleCheckInstitution}
          height="52px"
          variant={isInstitutionNameValid ? 'blue' : 'gray'}
          disabled={!isInstitutionNameValid || isLoading}
        >
          {isLoading ? '검색 중...' : '다음'}
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

const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
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

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
`;

const AskText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  .bold {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray600};
    text-decoration: underline;
    cursor: pointer;
  }
`;
