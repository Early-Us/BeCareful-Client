import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Elederly } from '@/assets/icons/elderly/Elderly.svg';
import styled from 'styled-components';

import { AreaSelectData } from '@/types/ElderyCreate';
import { NameInputSection } from '@/components/SocialWorker/ElderyCreate/NameInputSection';
import { BirthInputSection } from '@/components/SocialWorker/ElderyCreate/BirthInputSection';
import { GenderSelectSection } from '@/components/SocialWorker/ElderyCreate/GenderSelectSection';
import { GradeSelectSection } from '@/components/SocialWorker/ElderyCreate/GradeSelectSection';
import { AddressSelectSection } from '@/components/SocialWorker/ElderyCreate/AddressSelectSection';
import { HealthConditionSection } from '@/components/SocialWorker/ElderyCreate/HealthConditionSection';
import { CareTypeSection } from '@/components/SocialWorker/ElderyCreate/CareTypeSection';
import { InmateSection } from '@/components/SocialWorker/ElderyCreate/InmateSection';
import { PetSection } from '@/components/SocialWorker/ElderyCreate/PestSection';
import { SubmitSection } from '@/components/SocialWorker/ElderyCreate/SubmitSection';
import { AreaSocials } from '@/data/AreaSocial';
import { useElderlyCreateForm } from '@/hooks/SignUp/useElderlyCreateForm';

const ElderlyCreatePage = () => {
  const navigate = useNavigate();

  const form = useElderlyCreateForm();
  const areaData: AreaSelectData[] = AreaSocials.city;

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
          <ProfileImgWrapper>
            <Elederly />
          </ProfileImgWrapper>
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

export default ElderlyCreatePage;

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

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;
