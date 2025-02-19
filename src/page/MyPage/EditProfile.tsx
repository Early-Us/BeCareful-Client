import { NavBar } from '@/components/common/NavBar';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { useEffect, useState } from 'react';
import { InputBox } from '@/components/common/InputBox/InputBox';
import { ReactComponent as Plus } from '@/assets/icons/signup/Plus.svg';
import { CareGiverQualificationCard } from '@/components/common/QualificationCard/CaregiverQualificationCard';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { SocialQualificationCard } from '@/components/common/QualificationCard/SocialQualificationCard';
import { Modal } from '@/components/SignUp/SignUpModal';
import { Toggle } from '@/components/common/Toggle/Toggle';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();

  const [showVerificationInput, setShowVerificationInput] = useState(false);

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

  const [isEduChecked, setIsEduChecked] = useState(false);
  const handleEduToggleChange = () => {
    setIsEduChecked((prevChecked) => !prevChecked);
  };
  const [isCarChecked, setIsCarChecked] = useState(false);
  const handleCarToggleChange = () => {
    setIsCarChecked((prevChecked) => !prevChecked);
  };

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

  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [newCheck, setNewCheck] = useState('');
  // const [isMatch, setIsMatch] = useState(true);
  // const [, setIsMatch] = useState(true);
  // const isValidPassword = (password: string) => {
  //   const regex =
  //     /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  //   return regex.test(password);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setNewPassword(value);
  //   setIsMatch(value === newCheck);
  // };

  // const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setNewCheck(value);
  //   setIsMatch(newPassword === value);
  // };

  const [profileImgURL, setProfileImgURL] = useState('');
  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;

    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(`${apiBaseURL}/caregiver/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfileImgURL(response.data.profileImageUrl);
      setIsCarChecked(response.data.isHavingCar);
      setIsEduChecked(response.data.isCompleteDementiaEducation);
      console.log(response.data);
    } catch (e) {
      console.log('마이페이지 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    if (localStorage.getItem('isAutoLogin')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAutoLogin');
    } else {
      localStorage.removeItem('isAutoLogin');
    }
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>프로필 수정하기</NavCenter>}
        color="white"
      />

      <ProfileImgWrapper>
        <ProfileImg src={profileImgURL} />
      </ProfileImgWrapper>

      <ResidentWrapper>
        <InputBox
          label="휴대전화 번호"
          labelStar={true}
          state=""
          width="60%"
          guide=""
          placeholder="휴대전화 번호"
        />
        <Button
          variant="blue2"
          width="40%"
          height="54px"
          onClick={() => setShowVerificationInput(true)}
        >
          인증요청
        </Button>
      </ResidentWrapper>
      {showVerificationInput && (
        <ResidentWrapper>
          <PlainInputBox
            width=""
            state="default"
            placeholder="인증번호 입력"
            guide=""
          />
        </ResidentWrapper>
      )}

      {certificateList.map((cert, index) => (
        <CardWrapper key={index}>
          <cert.component initialType={cert.type} onChange={cert.onChange} />
        </CardWrapper>
      ))}

      {certificateList.length < 3 && (
        <CardWrapper>
          <Button
            variant="blue2"
            width=""
            height="52px"
            onClick={handleOpenModal}
          >
            <ButtonContent>
              <Plus />
              자격증 추가하기
            </ButtonContent>
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
        <ToggleLabel>치매교육 이수</ToggleLabel>
        <Toggle checked={isEduChecked} onChange={handleEduToggleChange} />
      </ToggleWrapper>
      <ToggleWrapper>
        <ToggleLabel>자차보유</ToggleLabel>
        <Toggle checked={isCarChecked} onChange={handleCarToggleChange} />
      </ToggleWrapper>

      <Border />

      {/* <Password>
        <PasswordTitle>비밀번호 변경</PasswordTitle>
        <InputBox
          label="현재 비밀번호"
          type="password"
          labelStar={true}
          //   state={password === currentPassword?"":"error"}
          state=""
          width=""
          guide=""
          placeholder="현재 비밀번호 입력"
          // onChange={(e) => {
          //   setCurrentPassword(e.target.value);
          // }}
        />
        <InputBox
          type="password"
          label="새 비밀번호"
          labelStar={true}
          state={!isValidPassword(newPassword) ? 'error' : ''}
          width=""
          guide={
            !isValidPassword(newPassword)
              ? '영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.'
              : ''
          }
          placeholder="새 비밀번호 입력"
          onChange={handlePasswordChange}
        />
        <InputBox
          type="password"
          label="새 비밀번호 재입력"
          labelStar={true}
          state={newCheck !== newPassword && newCheck !== '' ? 'error' : ''}
          width=""
          guide={
            newCheck !== newPassword && newCheck !== ''
              ? '비밀번호가 일치하지 않습니다.'
              : ''
          }
          placeholder="새 비밀번호 재입력"
          onChange={handleCheckChange}
        />
      </Password> */}

      <Border />
      <Label onClick={() => logout()}>로그아웃</Label>
      <Button
        // variant={
        //   isValidPassword(newPassword) && newPassword === newCheck
        //     ? 'blue'
        //     : 'disabled'
        // }
        variant="blue"
        width=""
        height="52px"
        style={{ margin: '20px 0px' }}
        onClick={() => navigate('/mypage')}
      >
        프로필 수정하기
      </Button>
    </Container>
  );
};

export default EditProfile;

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

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const ProfileImgWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const ResidentWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardWrapper = styled.div`
  display: flex;
  margin: 16px 0px;
  flex-direction: column;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ToggleWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

// const Password = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   margin-top: 24px;
//   margin-bottom: 64px;
// `;

// const PasswordTitle = styled.label`
//   color: ${({ theme }) => theme.colors.gray900};
//   font-size: ${({ theme }) => theme.typography.fontSize.title4};
//   font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
// `;

const Label = styled.label`
  margin-top: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
