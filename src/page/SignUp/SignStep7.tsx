import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ReactComponent as ProfileImage } from '@/assets/icons/signup/PofileImage.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

export const Step7 = ({
  formData,
  setFormData,
  onSubmit,
  onPrevious,
}: StepProps) => {
  return (
    <StepWrapper>
      <TopText>
        <IconContainer onClick={onPrevious}>
          <IconArrowLeft />
        </IconContainer>
        건너뛰기
      </TopText>

      <Header>
        프로필 사진을 등록하세요
        <span className="highlight">
          프로필 사진을 등록하시면 지원 합격률이 올라가요.
        </span>
      </Header>
      <ProfileContainer>
        <ProfileImage />
      </ProfileContainer>
      <ButtonContainer>
        <Button
          variant="blue"
          width="320px"
          height="52px"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (onSubmit) onSubmit();
          }}
        >
          시작하기
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
  width: 360px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const TopText = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.mainBlue};
  padding: 16px 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 334px 0 20px 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
`;
