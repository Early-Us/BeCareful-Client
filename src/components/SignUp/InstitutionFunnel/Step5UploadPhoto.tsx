import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as ProfileImage } from '@/assets/icons/signup/SocialProfileImage.svg';
import { useState } from 'react';

interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

export const Step5UploadPhoto = ({ goToNext, goToPrev }: StepProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <StepWrapper>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      <HeaderSection>
        <Title>
          소속된 기관의 사진을 등록하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 기관의 대표 사진을 업로드해 주세요.(선택)</SubText>
      </HeaderSection>
      <ProfileContainer>
        <ProfileImageWrapper>
          <ProfileImageInput
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />

          {previewImage ? (
            <ProfileImageDisplay src={previewImage} alt="Profile" />
          ) : (
            <ProfileImage />
          )}
        </ProfileImageWrapper>
      </ProfileContainer>
      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'}>
          이전
        </Button>
        <Button onClick={goToNext} height={'52px'}>
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
  margin: 24px 0 auto 0;
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

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileImageDisplay = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.gray300};
`;
