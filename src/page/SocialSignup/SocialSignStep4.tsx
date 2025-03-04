import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SocialStepProps } from '@/type/SocialSignUp';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { Button } from '@/components/common/Button/Button';

export const SocialStep4 = ({
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
        소속된 기관의 <br />
        연락처를 입력하세요
        <span className="highlight">
          대표 전화번호나 담당자 연락처를 입력해 주세요.
        </span>
      </Header>
      <SearchContainer>
        <PlainInputBox
          state="default"
          placeholder="기관 연락처 입력"
          guide=""
          width={''}
        ></PlainInputBox>
      </SearchContainer>
      <Border />
      <Button
        variant={'blue'}
        height="52px"
        onClick={() => {
          if (onNext) {
            onNext();
          }
        }}
        style={{ margin: '20px 0px' }}
      >
        다음 단계로 이동
      </Button>
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
  gap: 8px;
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

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  margin-top: 359px;
`;
