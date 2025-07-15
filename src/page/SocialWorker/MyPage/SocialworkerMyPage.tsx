import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import ProfileCard from '@/components/shared/ProfileCard';
import BelongCard from '@/components/SocialWorker/MyPage/BelongCard';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';

const SocialworkerMyPage = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(`/socialworker/${path}`);
    scrollTo(0, 0);
  };

  const isDirector = true;

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('로그아웃');

    // 로그아웃 api

    handleModal(setIsLogoutModalOpen);
  };

  const handleWithdraw = () => {
    console.log('회원탈퇴');

    // 회원탈퇴 api

    handleModal(setIsWithdrawModalOpen);
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileWrapper>
        <ProfileCard
          profileImgURL=""
          name="김사회"
          nickname="dolbomi2"
          point={1500}
          phoneNumber="010-2547-2534"
          age={52}
          gender="여자"
        />

        <BelongCard title="은파요양원" rank="센터장" />

        {isDirector && (
          <BelongCard title="전주완주장기요양기관협회" rank="회원" />
        )}

        <Button onClick={() => handleNavigate('my/profile')}>
          프로필 수정하기
        </Button>
      </ProfileWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>
        <InstitutionCard
          date="2025.02.14"
          institution="은파요양원"
          year={2007}
          types="방문 요양, 방문 간호"
          phoneNumber="02-1234-5678"
        />
        <Button onClick={() => handleNavigate('my/institution')}>
          기관 정보 수정하기
        </Button>
      </SectionWrapper>

      {isDirector && (
        <>
          <Border />

          <SectionWrapper>
            <label className="section-title">협회 정보</label>
            <AssociationCard
              association="전주완주장기요양기관협회"
              type="회원"
              rank="센터장"
            />
            <Button onClick={() => handleNavigate('my/association')}>
              협회 정보 변경하기
            </Button>
          </SectionWrapper>
        </>
      )}

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="section-title">계정</label>
        <Logout isRed={true} onClick={() => handleModal(setIsLogoutModalOpen)}>
          <LogoutIcon />
          로그아웃
        </Logout>
        <Logout
          isRed={false}
          onClick={() => handleModal(setIsWithdrawModalOpen)}
        >
          <LogoutIcon />
          탈퇴하기
        </Logout>
      </SectionWrapper>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => handleModal(setIsLogoutModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsLogoutModalOpen)}
          title="로그아웃 하시겠습니까?"
          detail="현재 계정에서 로그아웃됩니다. 계속하시겠습니까?"
          left="취소"
          right="로그아웃"
          handleLeftBtnClick={() => handleModal(setIsLogoutModalOpen)}
          handleRightBtnClick={handleLogout}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => handleModal(setIsWithdrawModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsWithdrawModalOpen)}
          title="정말 탈퇴 하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => handleModal(setIsWithdrawModalOpen)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>
    </Container>
  );
};

export default SocialworkerMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .section-title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme, isRed }) =>
    isRed ? theme.colors.mainOrange : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
