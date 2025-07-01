import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { CareGiverQualificationCard } from '@/components/common/QualificationCard/CaregiverQualificationCard';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { SocialQualificationCard } from '@/components/common/QualificationCard/SocialQualificationCard';
import { Modal } from '@/components/SignUp/deprecated/SignUpModal';

const CaregiverEditProfilePage = () => {
  const navigate = useNavigate();

  const [certificateList, setCertificateList] = useState<
    {
      type: string;
      number: string;
      component: React.FC<{
        initialType: string;
        onChange: (data: {
          level?: string;
          type?: string;
          number: string;
        }) => void;
      }>;
      onChange: (data: {
        level?: string;
        type?: string;
        number: string;
      }) => void;
    }[]
  >([
    {
      type: '요양보호사',
      number: '',
      component: CareGiverQualificationCard,
      onChange: (data) => handleCertificateChange('caregiverCertificate', data),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCertificateChange = (
    key: string,
    data: { level?: string; number: string },
  ) => {
    console.log(`자격증 업데이트: ${key}`, data);
  };

  const handleAddCertificate = (type: string) => {
    let key = 'caregiverCertificate';
    let component;

    if (type === '간호지원사') {
      key = 'nursingCareCertificate';
      component = NursingQualificationCard;
    } else {
      key = 'socialWorkerCertificate';
      component = SocialQualificationCard;
    }

    setCertificateList((prev) => [
      ...prev,
      {
        type,
        number: '',
        component,
        onChange: (data) => handleCertificateChange(key, data),
      },
    ]);

    handleCloseModal();
  };

  const [isEduChecked, setIsEduChecked] = useState(false);
  const handleEduToggleChange = () => {
    setIsEduChecked((prevChecked) => !prevChecked);
  };
  const [isCarChecked, setIsCarChecked] = useState(false);
  const handleCarToggleChange = () => {
    setIsCarChecked((prevChecked) => !prevChecked);
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        }
        center={<NavCenter>프로필 수정하기</NavCenter>}
        color="white"
      />

      <ProfileImgWrapper>
        <img src="" />
      </ProfileImgWrapper>

      <NumberWrapper>
        <label>
          휴대전화 번호 <span>*</span>
        </label>
        <Number placeholder="휴대전화 번호" type="tel" />
      </NumberWrapper>

      {certificateList.map((cert, index) => (
        <CardWrapper key={index}>
          <cert.component initialType={cert.type} onChange={cert.onChange} />
        </CardWrapper>
      ))}

      {certificateList.length < 3 && (
        <CardWrapper>
          <Button isBlue={false} onClick={handleOpenModal}>
            <Plus />
            자격증 추가하기
          </Button>
          <Modal
            width=""
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddCertificate={handleAddCertificate}
          />
        </CardWrapper>
      )}

      <Border />

      <ToggleWrapper>
        <label>치매교육 이수</label>
        <Toggle checked={isEduChecked} onChange={handleEduToggleChange} />
      </ToggleWrapper>

      <Border />

      <ToggleWrapper>
        <label>자차보유</label>
        <Toggle checked={isCarChecked} onChange={handleCarToggleChange} />
      </ToggleWrapper>

      <Bottom>
        <Button isBlue={true}>프로필 수정하기</Button>
      </Bottom>
    </Container>
  );
};

export default CaregiverEditProfilePage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 100px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const ProfileImgWrapper = styled.div`
  padding: 24px 0px 16px 0px;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

const NumberWrapper = styled.div`
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Number = styled.input`
  width: 100%;
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  margin: 16px 0px;
  flex-direction: column;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  padding: 20px 0px;
  justify-content: space-between;
  align-items: center;

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Bottom = styled.div`
  padding: 20px 20px 20px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Button = styled.button<{ isBlue: boolean }>`
  width: 100%;
  height: 52px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.subBlue};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.white : theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
