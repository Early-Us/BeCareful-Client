import { useState } from 'react';
import axios from 'axios';
import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ReactComponent as ProfileImage } from '@/assets/icons/signup/PofileImage.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';

export const Step7 = ({ formData, onSubmit, onPrevious }: StepProps) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleStart = () => {
    console.log('현재 입력된 formData:', formData);
    if (onSubmit) onSubmit();
    navigate('/');
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    const formDataObj = new FormData();
    formDataObj.append('file', profileImage);
    formDataObj.append('phoneNumber', formData.phoneNumber);

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/caregiver/upload-profile-img`,
        formDataObj,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (response.status === 200) {
        console.log(
          '프로필 이미지 업로드 성공:',
          response.data.profileImageUrl,
        );
        navigate('/');
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepWrapper>
      <TopText>
        <IconContainer onClick={onPrevious}>
          <IconArrowLeft />
        </IconContainer>
        <div onClick={handleStart}>건너뛰기</div>
      </TopText>

      <Header>
        프로필 사진을 등록하세요
        <span className="highlight">
          프로필 사진을 등록하시면 지원 합격률이 올라가요.
        </span>
      </Header>

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
        <Button
          variant="blue"
          height="52px"
          onClick={handleImageUpload}
          disabled={loading}
        >
          {loading ? '업로드 중...' : '시작하기'}
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
  margin: 24px 16px auto 16px;
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
  position: fixed;
  bottom: 0;
  padding: 20px;
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
