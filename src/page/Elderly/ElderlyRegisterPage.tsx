import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import styled from 'styled-components';

import { AreaSelectData } from '@/types/ElderyRegister';
import { NameInputSection } from '@/components/SocialWorker/ElderyRegister/NameInputSection';
import { BirthInputSection } from '@/components/SocialWorker/ElderyRegister/BirthInputSection';
import { GenderSelectSection } from '@/components/SocialWorker/ElderyRegister/GenderSelectSection';
import { GradeSelectSection } from '@/components/SocialWorker/ElderyRegister/GradeSelectSection';
import { AddressSelectSection } from '@/components/SocialWorker/ElderyRegister/AddressSelectSection';
import { HealthConditionSection } from '@/components/SocialWorker/ElderyRegister/HealthConditionSection';
import { CareTypeSection } from '@/components/SocialWorker/ElderyRegister/CareTypeSection';
import { InmateSection } from '@/components/SocialWorker/ElderyRegister/InmateSection';

import { SubmitSection } from '@/components/SocialWorker/ElderyRegister/SubmitSection';
import { AreaSocials } from '@/data/AreaSocial';
import { useElderlyRegisterForm } from '@/hooks/SignUp/useElderlyRegisterForm';
import { useUploadElderlyProfileImage } from '@/api/elderly';
import { ProfileImageUploader } from '@/components/SocialWorker/common/ProfileImageUploader';
import { PetSection } from '@/components/SocialWorker/ElderyRegister/PetSection';

const ElderlyRegisterPage = () => {
  const navigate = useNavigate();
  const institutionId = '123'; // TODO ㅠㅠ

  const form = useElderlyRegisterForm();
  const areaData: AreaSelectData[] = AreaSocials.city;

  const { mutate: uploadImage } = useUploadElderlyProfileImage();

  const handleImageUpload = (file: File, institutionId: string) => {
    uploadImage(
      { file, institutionId },
      {
        onSuccess: (url) => {
          form.setProfileImageUrl(url);
        },
        onError: () => {
          alert('이미지 업로드에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft onClick={() => navigate(-1)}>
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>어르신 등록</NavCenter>}
        color="white"
      />

      <MainContent>
        <ProfileWrapper>
          <ProfileImageUploader
            imageUrl={form.profileImageUrl}
            onChange={(file) => handleImageUpload(file, institutionId)}
          />
        </ProfileWrapper>

        <NameInputSection name={form.name} onChange={form.setName} />
        <BirthInputSection birth={form.birth} onChange={form.setBirth} />
        <GenderSelectSection gender={form.gender} onChange={form.setGender} />
        <GradeSelectSection
          selectedGrade={form.selectedGrade}
          onChange={form.setSelectedGrade}
        />
        <AddressSelectSection
          areaData={areaData}
          selectedArea={form.selectedArea}
          detailAddress={form.detailAddress}
          onSelect={form.setSelectedArea}
          onDetailChange={form.setDetailAddress}
        />
        <HealthConditionSection
          healthCondition={form.healthCondition}
          onChange={form.setHealthCondition}
        />
        <CareTypeSection
          selectedCare={form.selectedCare}
          onSelectCare={form.setSelectedCare}
          selectedDetails={form.selectedDetails}
          onSelectDetail={form.setSelectedDetails}
        />
        <InmateSection inmate={form.inmate} onChange={form.setInmate} />
        <PetSection pet={form.pet} onChange={form.setPet} />
        <SubmitSection onSubmit={form.handleSubmit} />
      </MainContent>
    </Container>
  );
};

export default ElderlyRegisterPage;

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const MainContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
