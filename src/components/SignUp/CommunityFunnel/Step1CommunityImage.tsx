import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

import { ProfileImageUploader } from '@/components/SignUp/InstitutionFunnel/Step5UploadPhoto/ProfileImageUploader';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';
import { uploadAssociationProfileImage } from '@/api/communityFunnel';

interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
  communityFormData: CommunityFormData;
  setCommunityFormData: React.Dispatch<React.SetStateAction<CommunityFormData>>;
}

export const Step1CommunityImage = ({
  goToNext,
  goToPrev,
  communityFormData,
  setCommunityFormData,
}: StepProps) => {
  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadAssociationProfileImage(file);
      setCommunityFormData((prev) => ({
        ...prev,
        profileImageUrl: imageUrl,
      }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          협회 대문 사진을 등록해 주세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>소속된 협회의 대표 사진을 업로드해 주세요. (선택)</SubText>
      </HeaderSection>

      <ProfileContainer>
        <ProfileImageUploader
          imageUrl={communityFormData.profileImageUrl}
          onChange={handleImageUpload}
        />
      </ProfileContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          나가기
        </Button>
        <Button onClick={goToNext} height="52px" variant="blue">
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
`;
