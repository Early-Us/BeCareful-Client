import { NavBar } from '@/components/common/NavBar/NavBar';
import { CaregiverMyResponse } from '@/types/Caregiver/mypage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Point } from '@/assets/icons/Point.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { ReactComponent as Application } from '@/assets/icons/caregiver/MyWork.svg';
import { ReactComponent as Career } from '@/assets/icons/caregiver/my/Career.svg';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { GenderMapping } from '@/constants/caregiver';

const CaregiverMyPage = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    console.log(path);
    // navigate(path);
    // window.scrollTo(0, 0);
  };

  const logout = () => {
    console.log('로그아웃');
  };

  const data: CaregiverMyResponse = {
    name: '김영희',
    gender: 'FEMALE',
    phoneNumber: '010-1234-5678',
    profileImageUrl: 'https://example.com/profile/kim_younghee.jpg',
    certificateNames: ['요양보호사', '사회복지사 2급', '간호조무사 2급'],
    isHavingCar: false,
    isCompleteDementiaEducation: false,
    careerTitle: '10년 경력의 베테랑 요양보호사',
    careerLastModifyDate: '2024-06-25',
    workApplicationInfo: {
      workLocations: [
        { siDo: '서울특별시', siGuGun: '강남구', dongEupMyeon: '전체' },
        { siDo: '경기도', siGuGun: '성남시 분당구', dongEupMyeon: '정자동' },
        {
          siDo: '경기도',
          siGuGun: '용인시 수지구',
          dongEupMyeon: '풍덕천동',
        },
      ],
      workDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY', 'SUNDAY'],
      workTimes: ['MORNING', 'AFTERNOON'],
      careTypes: ['신체활동 지원', '일상생활 지원', '인지활동 지원'],
      workSalaryType: 'HOUR',
      workSalaryAmount: 15000,
    },
    isWorkApplicationActive: true,
    workApplicationLastModifyDate: '2024-07-01',
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileWrapper>
        <Top>
          <img src={data?.profileImageUrl} />
          <div className="right">
            <label className="name">{data.name}</label>
            <div
              className="pointWrapper"
              onClick={() => {
                handleNavigate('/point');
              }}
            >
              <Point />
              {/* <label className="point">{data.point}</label> */}
              <label className="point">1,500P</label>
              <Chevron />
            </div>
            <div className="infoWrapper">
              <label className="info">{data.phoneNumber}</label>
              <label className="info">·</label>
              {/* <label className="info">{data.age}</label> */}
              <label className="info">만 52세</label>
              <label className="info">·</label>
              <label className="info">{GenderMapping[data.gender]}</label>
            </div>
          </div>
        </Top>

        <Bottom>
          <div className="certificateWrapper">
            <label className="title-label">기본 자격</label>
            <div className="certificates">
              <CertificateCard isBlue={data.isHavingCar}>
                {data.isHavingCar ? '자차 보유' : '자차 미보유'}
              </CertificateCard>
              <CertificateCard isBlue={data.isCompleteDementiaEducation}>
                {data.isCompleteDementiaEducation
                  ? '치매교육 이수 완료'
                  : '치매교육 이수전'}
              </CertificateCard>
            </div>
          </div>
          <div className="certificateWrapper">
            <label className="title-label">보유 자격증</label>
            <div className="certificates">
              {data.certificateNames.map((certificate) => (
                <label className="certificate">{certificate}</label>
              ))}
            </div>
          </div>
        </Bottom>

        <Button onClick={() => handleNavigate('/my/edit')}>
          프로필 수정하기
        </Button>
      </ProfileWrapper>

      <Border />

      {data?.careerTitle ? (
        <SectionWrapper>
          <TitleLabel>경력서</TitleLabel>
          <NoApplication>
            <FixWrapper>
              <Fix color="">최근 수정일</Fix>
              <Fix color="blue">{data?.careerLastModifyDate}</Fix>
            </FixWrapper>
            <NoApplicationLabel>{data?.careerTitle}</NoApplicationLabel>
          </NoApplication>
          <Button>경력서 수정하기</Button>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <TitleLabel>경력서</TitleLabel>
          <InsideWrapper>
            <Icon>
              <Career />
            </Icon>
            <InsideTitle>아직 등록된 경력서가 없어요!</InsideTitle>
            <InsideDetail>
              나의 경력을 입력하여 합격률을 높여보세요!
            </InsideDetail>
          </InsideWrapper>
          <Button>경력서 등록하기</Button>
        </SectionWrapper>
      )}

      {data?.workApplicationInfo ? (
        <SectionWrapper>
          <TitleLabel>일자리 신청서</TitleLabel>
          {/*
            <WorkApply
              fix={data ? data.workApplicationLastModifyDate : ''}
              apply={data ? data.isWorkApplicationActive : false}
              caretype={formattedCareTypes}
              day={formattedDay}
              time={formattedTime}
              pay={
                data && data.workApplicationInfo
                  ? data.workApplicationInfo.workSalaryAmount
                  : 0
              }
              location={formattedLocation}
                      />
                      */}
          <Button>신청서 수정하기</Button>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <TitleLabel>일자리 신청서</TitleLabel>
          <InsideWrapper>
            <Icon>
              <Application />
            </Icon>
            <InsideTitle>아직 등록된 신청서가 없어요!</InsideTitle>
            <InsideDetail>
              일자리 신청서를 등록하고
              <br />
              나에게 딱 맞는 일자리 확인하세요!
            </InsideDetail>
          </InsideWrapper>
          <Button>신청서 등록하기</Button>
        </SectionWrapper>
      )}

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <Logout isRed={true}>
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

export default CaregiverMyPage;

const Container = styled.div`
  margin: auto 20px;
  padding-bottom: 40px;

  div {
    display: flex;
  }

  .title-label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding: 12px 0px;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const Top = styled.div`
  padding: 16px 0px;
  gap: 12px;

  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }

  .right {
    flex-direction: column;
    gap: 8px;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .pointWrapper {
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .point {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
  }

  .infoWrapper {
    margin-top: 4px;
    gap: 4px;
  }

  .info {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;

const Chevron = styled(ChevronRight)`
  path {
    fill: ${({ theme }) => theme.colors.black};
    stroke: ${({ theme }) => theme.colors.black};
  }
`;

const Bottom = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 20px;

  .certificateWrapper {
    flex-direction: column;
    gap: 16px;
  }

  .certificates {
    gap: 6px;
  }

  .certificate {
    padding: 4px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const CertificateCard = styled.label<{ isBlue: boolean }>`
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.subBlue : theme.colors.gray50};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;
`;

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
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
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;

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

const InsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
`;

const InsideTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-align: center;
`;

const InsideDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-align: center;
`;

const NoApplication = styled.div`
  padding: 20px;
  height: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const FixWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const Fix = styled.div<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const NoApplicationLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Label = styled.label`
  margin-top: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
