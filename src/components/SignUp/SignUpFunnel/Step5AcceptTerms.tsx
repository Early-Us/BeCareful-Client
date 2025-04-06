import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { AgreeCard } from '@/components/SignUp/deprecated/AgreeCard';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';
import { ReactComponent as ChevronRight } from '@/assets/icons/signup/ChevronRight.svg';

type AgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo';

export const Step5AcceptTerms = () => {
  const { goToNext, goToPrev, formData, setFormData } = useSignUpContext();

  const handleCheckboxChange = (field: AgreeField) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleAgreeAll = () => {
    const allChecked =
      formData.isAgreedToTerms &&
      formData.isAgreedToCollectPersonalInfo &&
      formData.isAgreedToReceiveMarketingInfo;
    setFormData((prev) => ({
      ...prev,
      isAgreedToTerms: !allChecked,
      isAgreedToCollectPersonalInfo: !allChecked,
      isAgreedToReceiveMarketingInfo: !allChecked,
    }));
  };

  const isAllAgreed =
    formData.isAgreedToTerms &&
    formData.isAgreedToCollectPersonalInfo &&
    formData.isAgreedToReceiveMarketingInfo;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          이용약관에 동의하시겠습니까?
          <span className="highlight"> *</span>
        </Title>
      </HeaderSection>
      <AgreeWrapper>
        <AgreeCard
          pressed={isAllAgreed}
          text="전체 동의"
          onClick={handleAgreeAll}
        />
        <AgreeCheckContainer>
          <AgreeCheck>
            <CheckBox
              id="1"
              checked={formData.isAgreedToTerms}
              onChange={handleCheckboxChange('isAgreedToTerms')}
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
              checked={formData.isAgreedToCollectPersonalInfo}
              onChange={handleCheckboxChange('isAgreedToCollectPersonalInfo')}
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
              checked={formData.isAgreedToReceiveMarketingInfo}
              onChange={handleCheckboxChange('isAgreedToReceiveMarketingInfo')}
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
        <Button onClick={goToPrev} height="52px">
          이전
        </Button>
        <Button
          onClick={() => {
            goToNext();
          }}
          height="52px"
          variant={
            formData.isAgreedToTerms && formData.isAgreedToCollectPersonalInfo
              ? 'blue'
              : 'gray'
          }
          disabled={
            !(
              formData.isAgreedToTerms && formData.isAgreedToCollectPersonalInfo
            )
          }
        >
          다음
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
