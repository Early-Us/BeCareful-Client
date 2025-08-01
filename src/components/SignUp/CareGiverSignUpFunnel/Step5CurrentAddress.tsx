import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { SearchInput } from '@/components/SignUp/CareGiverSignUpFunnel/common/SearchInput';
import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { usePostcodeLoader } from '@/hooks/SignUp/usePostcodeLoader';
import { PostcodeData } from '@/types/daum-postcode';
import { styled } from 'styled-components';

export const Step5CurrentAddress = () => {
  const { goToNext, formData, setFormData } = useCaregiverSignUpContext();
  const isPostcodeReady = usePostcodeLoader();

  const openPostcode = () => {
    if (!isPostcodeReady || !window.daum?.Postcode) {
      console.error('다음 API 로드 실패');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: PostcodeData) => {
        setFormData((prev) => ({
          ...prev,
          streetAddress: data.roadAddress,
        }));
      },
    }).open();
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      detailAddress: e.target.value,
    }));
  };

  const isNextEnabled =
    formData.streetAddress.trim() !== '' &&
    formData.detailAddress.trim() !== '';

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          현재 거주하시는
          <br />
          주소를 입력하세요
        </Title>
      </HeaderSection>

      <CardContainer>
        <SearchInput
          placeholder="도로명, 지번, 건물명 검색"
          onClick={openPostcode}
          value={formData.streetAddress}
          readOnly
        />
      </CardContainer>

      {formData.streetAddress && (
        <CardContainer>
          <PlainInputBox
            width=""
            state="default"
            placeholder="상세 주소 입력"
            guide=""
            value={formData.detailAddress}
            onChange={handleDetailChange}
          />
        </CardContainer>
      )}

      <ButtonContainer>
        <Button
          onClick={goToNext}
          disabled={!isNextEnabled}
          variant={isNextEnabled ? 'blue' : 'gray'}
          height="52px"
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  width: 100%;
`;
