import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Application } from '@/assets/icons/mypage/Application.svg';
import { ReactComponent as Career } from '@/assets/icons/mypage/Career.svg';
import WorkApply from '@/components/MyPage/WorkApply';
import { TabBar } from '@/components/common/TabBar';

interface WorkLocation {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

interface WorkApplicationInfo {
  workLocations: WorkLocation[];
  workDays: string[];
  workTimes: string[];
  careTypes: string[];
  workSalaryType: string;
  workSalaryAmount: number;
}

interface Caregiver {
  name: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
  certificateNames: string[];
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
  careerTitle: string | null;
  careerLastModifyDate: string | null;
  workApplicationInfo: WorkApplicationInfo | null;
  isWorkApplicationActive: boolean;
  workApplicationLastModifyDate: string;
}

const MyPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Caregiver>();

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
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('마이페이지 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  const formattedCareTypes = data?.workApplicationInfo?.careTypes
    ? data.workApplicationInfo.careTypes.length > 2
      ? `${data.workApplicationInfo.careTypes[0]}, ${data.workApplicationInfo.careTypes[1]} 외 ${data.workApplicationInfo.careTypes.length - 2}`
      : data.workApplicationInfo.careTypes.join(', ')
    : '';

  const logout = () => {
    if (localStorage.getItem('isAutoLogin')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAutoLogin');
      localStorage.removeItem('role');
    } else {
      localStorage.removeItem('isAutoLogin');
      localStorage.removeItem('role');
    }
  };

  const formattedDay = data?.workApplicationInfo?.workDays
    .map((day) => {
      switch (day) {
        case 'MONDAY':
          return '월';
        case 'TUESDAY':
          return '화';
        case 'WEDNESDAY':
          return '수';
        case 'THURSDAY':
          return '목';
        case 'FRIDAY':
          return '금';
        case 'SATURDAY':
          return '토';
        case 'SUNDAY':
          return '일';
        default:
          return day;
      }
    })
    .join(', ');

  const formattedTime = data?.workApplicationInfo?.workTimes
    .map((time) => {
      switch (time) {
        case 'MORNING':
          return '오전';
        case 'AFTERNOON':
          return '오후';
        case 'EVENING':
          return '저녁';
        default:
          return time;
      }
    })
    .join(', ');

  const formattedLocation = data?.workApplicationInfo?.workLocations
    ? data.workApplicationInfo.workLocations.length > 2
      ? `${data.workApplicationInfo.workLocations[0].siGuGun} ${data.workApplicationInfo.workLocations[0].dongEupMyeon}, ${data.workApplicationInfo.workLocations[1].siGuGun} ${data.workApplicationInfo.workLocations[1].dongEupMyeon} 외 ${data.workApplicationInfo.workLocations.length - 2}개`
      : data.workApplicationInfo.workLocations
          .map((location) => `${location.siGuGun} ${location.dongEupMyeon}`)
          .join(', ')
    : '';

  return (
    <>
      <Container>
        <NavBar
          left={
            <NavLeft
              onClick={() => {
                navigate('/mypage');
              }}
            >
              마이페이지
            </NavLeft>
          }
          color=""
        />
        <ProfileWrapper>
          <ProfileImg src={data?.profileImageUrl} />
          <Profile>
            <ProfileTop>
              <ProfileLeft>
                <Name>{data?.name}</Name>
                <PhoneGenderWrapper>
                  <Detail>{data?.phoneNumber}</Detail>
                  <Detail>·</Detail>
                  <Detail>{data?.gender === 'FEMALE' ? '여자' : '남자'}</Detail>
                </PhoneGenderWrapper>
              </ProfileLeft>
              <EditButton
                onClick={() => {
                  navigate('/mypage/profile');
                }}
              >
                수정
              </EditButton>
            </ProfileTop>
            <ProfileInfoWrapper>
              <ProfileInfo color={data ? data.isHavingCar : false}>
                {data?.isHavingCar ? '자차 보유' : '자차 미보유'}
              </ProfileInfo>
              <ProfileInfo
                color={data ? data.isCompleteDementiaEducation : false}
              >
                {data?.isCompleteDementiaEducation
                  ? '치매교육 이수 완료'
                  : '치매교육 이수 전'}
              </ProfileInfo>
            </ProfileInfoWrapper>
          </Profile>
        </ProfileWrapper>
        <LicenseWrapper>
          <TitleLabel>보유 자격증</TitleLabel>
          <LicenseList>
            {data?.certificateNames.map((certificate) => (
              <License>{certificate}</License>
            ))}
          </LicenseList>
        </LicenseWrapper>
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
            <Button
              variant="blue2"
              width=""
              height="52px"
              onClick={() => {
                window.location.href = '/career/edit';
              }}
            >
              경력서 수정하기
            </Button>
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
            <Button
              variant="blue2"
              width=""
              height="52px"
              onClick={() => {
                window.location.href = '/career/create';
              }}
            >
              경력서 등록하기
            </Button>
          </SectionWrapper>
        )}

        {data?.workApplicationInfo ? (
          <SectionWrapper>
            <TitleLabel>일자리 신청서</TitleLabel>
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
            <Button
              variant="blue2"
              width=""
              height="52px"
              onClick={() => {
                window.location.href = '/application/edit';
              }}
            >
              신청서 수정하기
            </Button>
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
            <Button
              variant="blue2"
              width=""
              height="52px"
              onClick={() => {
                window.location.href = '/application/create';
              }}
            >
              신청서 등록하기
            </Button>
          </SectionWrapper>
        )}

        <Label onClick={() => logout()}>로그아웃</Label>
      </Container>
      <TabBar />
    </>
  );
};

export default MyPage;

const Container = styled.div`
  margin: auto 20px;
  padding-bottom: 100px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  display: flex;
  padding: 16px 0px;
  gap: 12px;
  margin-top: 12px;
`;

const ProfileImg = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const PhoneGenderWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const EditButton = styled.button`
  padding: 7px 16px;
  height: 34px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const ProfileInfo = styled.div<{ color: boolean }>`
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
  border: 1px solid ${({ theme, color }) => (color ? '' : theme.colors.gray100)};
  background: ${({ theme, color }) =>
    color ? theme.colors.subBlue : theme.colors.gray50};

  color: ${({ theme, color }) =>
    color ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: 13px;
  font-weight: 600;
`;

const TitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const LicenseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 12px;
  padding: 20px 0px;
`;

const LicenseList = styled.div`
  display: flex;
  gap: 8px;
`;

const License = styled.div`
  display: flex;
  padding: 4px 10px;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
