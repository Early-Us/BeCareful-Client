import { NavBar } from '@/components/common/NavBar/NavBar';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import ProfileCard from '@/components/shared/ProfileCard';
import styled from 'styled-components';
import BelongCard from '@/components/SocialWorker/MyPage/BelongCard';
import AssociationCard from '@/components/SocialWorker/MyPage/AssociationCard';
import InstitutionCard from '@/components/SocialWorker/MyPage/InstitutionCard';

const SocialworkerMyPage = () => {
  const isDirector = true;

  const handleLogout = () => {
    console.log('로그아웃');
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

        <Button>프로필 수정하기</Button>
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
        <Button>기관 정보 수정하기</Button>
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
            <Button>협회 정보 변경하기</Button>
          </SectionWrapper>
        </>
      )}

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="section-title">계정</label>
        <Logout isRed={true} onClick={handleLogout}>
          <LogoutIcon />
          로그아웃
        </Logout>
        <Logout isRed={false}>
          <LogoutIcon />
          탈퇴하기
        </Logout>
      </SectionWrapper>
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

  path {
    stroke: ${({ theme, isRed }) =>
      isRed ? theme.colors.mainOrange : theme.colors.gray500};
  }
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
