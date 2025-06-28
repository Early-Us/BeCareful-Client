import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Elederly } from '@/assets/icons/elderly/Elderly.svg';
import styled from 'styled-components';
import { useState } from 'react';
import { AreaSocial } from '@/data/AreaSocial';
import { CareLevel } from '@/constants/careLevels.socialWorker';
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
import { CareType } from '@/constants/careTypes.socialWorker';

interface AreaSocial {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

const EdlerlyCreatePage = () => {
  const navigate = useNavigate();

  //TODO: 구조 변경 필요
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | ''>('');
  const [inmate, setInmate] = useState<'있음' | '없음' | ''>('');
  const [pet, setPet] = useState<'있음' | '없음' | ''>('');

  const [selectedGrade, setSelectedGrade] = useState<CareLevel | ''>('');

  const [selectedArea, setSelectedArea] = useState<AreaSocial | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  const [healthCondition, setHealthCondition] = useState('');

  const [selectedCare, setSelectedCare] = useState<CareType | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const areaData: AreaSelectData[] = AreaSocial.city;

  const handleSubmit = async () => {
    //TODO
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
          <ProfileImgWrapper>
            <Elederly />
          </ProfileImgWrapper>

          <SectionWrapper>
            <TitleWrapper>
              <Title color="">이름</Title>
              <Title color="blue">*</Title>
            </TitleWrapper>
            <Input
              placeholder="이름 입력"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </SectionWrapper>
        </ProfileWrapper>

        <NameInputSection name={name} onChange={setName} />
        <BirthInputSection birth={birth} onChange={setBirth} />
        <GenderSelectSection gender={gender} onChange={setGender} />
        <GradeSelectSection
          selectedGrade={selectedGrade}
          onChange={setSelectedGrade}
        />
        <AddressSelectSection
          areaData={areaData}
          selectedArea={selectedArea}
          detailAddress={detailAddress}
          onSelect={setSelectedArea}
          onDetailChange={setDetailAddress}
        />
        <HealthConditionSection
          healthCondition={healthCondition}
          onChange={setHealthCondition}
        />
        <CareTypeSection
          selectedCare={selectedCare}
          onSelectCare={setSelectedCare}
          selectedDetails={selectedDetails}
          onSelectDetail={setSelectedDetails}
        />
        <InmateSection inmate={inmate} onChange={setInmate} />
        <PetSection pet={pet} onChange={setPet} />
        <SubmitSection onSubmit={handleSubmit} />
      </MainContent>
    </Container>
  );
};

export default EdlerlyCreatePage;

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

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const Title = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

//TODO 기존 Input이랑 비교 필요
const Input = styled.input`
  height: 36px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
