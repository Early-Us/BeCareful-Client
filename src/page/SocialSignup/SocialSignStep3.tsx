import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SocialStepProps } from '@/type/SocialSignUp';
import { SocialSearchInput } from '@/components/SocialSignUp/SearchInputRight';
import { Button } from '@/components/common/Button/Button';

export const SocialStep3 = ({
  formSocialData,
  setFormSocialData,
  onPrevious,
  onNext,
}: SocialStepProps) => {
  console.log(formSocialData, setFormSocialData);

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
        <SocialSearchInput />
      </SearchContainer>
      <ButtonContainer>
        <Button
          variant={'blue'}
          height="52px"
          onClick={() => {
            if (onNext) {
              onNext();
            }
          }}
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
