import { NavBar } from '@/components/common/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
// import { ReactComponent as ChatNew } from '@/assets/icons/home/ChatNew.svg';
import { ReactComponent as Institution } from '@/assets/icons/socailHome/Institution.svg';
import { ReactComponent as ArrowDetail } from '@/assets/icons/socailHome/ArrowDetail.svg';
import { ReactComponent as CaregiverDefault } from '@/assets/icons/socailHome/CaregiverDefault.svg';
import { ReactComponent as ElderlyDefault } from '@/assets/icons/socailHome/ElderlyDefault.svg';
import { ReactComponent as CareGiver } from '@/assets/icons/socailHome/CareGiver.svg';
import { ReactComponent as Applyer } from '@/assets/icons/socailHome/Applyer.svg';
import { ReactComponent as Applying } from '@/assets/icons/socailHome/Applying.svg';
import { JobLevelBox } from '@/components/HomeSocial/JobLevelBox';
import { Button } from '@/components/common/Button/Button';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar ';

interface ElderlyInfo {
  name: string;
  age: number;
  gender: string;
  profileImageUrl: string;
}

interface SocialWorkerInfo {
  socialWorkerName: string;
  socialWorkerRank: string;
  institutionName: string;
  elderlyCount: number;
  socialWorkerCount: number;
  matchingProcessingCount: number;
  recentlyMatchedCount: number;
  matchingCompletedCount: number;
  appliedCaregiverCount: number;
  averageAppliedCaregiver: number;
  averageApplyingRate: number;
  matchingElderlyList: ElderlyInfo[];
}

const SocialHomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SocialWorkerInfo>();

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(`${apiBaseURL}/socialworker/home`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log('사회복지사 홈 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('/home/social');
            }}
          >
            <Logo />
          </NavLeft>
        }
        // right={<NavRight>{chatNew ? <ChatNew /> : <Chat />}</NavRight>}
        right={
          <NavRight onClick={() => navigate('/chatlist/social')}>
            <Chat />
          </NavRight>
        }
        color="blue"
      />

      <InfoWrapper>
        <Info>
          <ProfileImg>
            <Institution />
          </ProfileImg>
          <InfoPerson>
            <TitleLabel>{data?.socialWorkerName}</TitleLabel>
            {data?.socialWorkerRank && (
              <JobLevelBox rank={data.socialWorkerRank} />
            )}
          </InfoPerson>
        </Info>
      </InfoWrapper>

      <HomeContainer>
        <SectionWrapper>
          <TitleLabel>{data?.institutionName}</TitleLabel>
          <InstitutionWrapper>
            <InstitutionDetailWrapper>
              <InstitutionDetail>
                <InstitutionLabel>
                  <ProfileImg>
                    <ElderlyDefault />
                  </ProfileImg>
                  <Label16500>어르신</Label16500>
                </InstitutionLabel>
                <InstitutionCount>
                  <Label16700 color="blue">{data?.elderlyCount}</Label16700>
                  <Label16700 color="">명</Label16700>
                </InstitutionCount>
              </InstitutionDetail>
              <Border />
              <InstitutionDetail>
                <InstitutionLabel>
                  <ProfileImg>
                    <CaregiverDefault />
                  </ProfileImg>
                  <Label16500>요양보호사</Label16500>
                </InstitutionLabel>
                <InstitutionCount>
                  <Label16700 color="blue">
                    {data?.socialWorkerCount}
                  </Label16700>
                  <Label16700 color="">명</Label16700>
                </InstitutionCount>
              </InstitutionDetail>
            </InstitutionDetailWrapper>
            <Button variant="blue2" width="" height="52px">
              직원 정보 보기
            </Button>
          </InstitutionWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <TitleLabel>매칭 통계</TitleLabel>
            <TitleDetailWrapper>
              <TitleDetail
                onClick={() => (window.location.href = '/matching/dashboard')}
              >
                자세히 보기
              </TitleDetail>
              <TitleDetailImg>
                <ArrowDetail />
              </TitleDetailImg>
            </TitleDetailWrapper>
          </TitleWrapper>
          <StatusRowWrapper>
            <MatchingStatus>
              <Dot color="green" />
              <MatchingStatusLabel>
                <BoxTitle>진행중</BoxTitle>
                <BoxNumberWrapper>
                  <BoxNumber>{data?.matchingProcessingCount}</BoxNumber>
                  <BoxUnit>건</BoxUnit>
                </BoxNumberWrapper>
              </MatchingStatusLabel>
            </MatchingStatus>
            <MatchingStatus>
              <Dot color="orange" />
              <MatchingStatusLabel>
                <BoxTitle>최근 완료</BoxTitle>
                <BoxNumberWrapper>
                  <BoxNumber>{data?.recentlyMatchedCount}</BoxNumber>
                  <BoxUnit>건</BoxUnit>
                </BoxNumberWrapper>
              </MatchingStatusLabel>
            </MatchingStatus>
            <MatchingStatus>
              <Dot color="blue" />
              <MatchingStatusLabel>
                <BoxTitle>전체 매칭</BoxTitle>
                <BoxNumberWrapper>
                  <BoxNumber>{data?.matchingCompletedCount}</BoxNumber>
                  <BoxUnit>건</BoxUnit>
                </BoxNumberWrapper>
              </MatchingStatusLabel>
            </MatchingStatus>
          </StatusRowWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <TitleLabel>지원통계</TitleLabel>
          <ApplyStatusTop>
            <MatchingStatusLabel>
              <BoxTitle>현재 지원한 요양보호사</BoxTitle>
              <BoxNumberWrapper>
                <BoxNumber>{data?.appliedCaregiverCount}</BoxNumber>
                <BoxUnit>명</BoxUnit>
              </BoxNumberWrapper>
            </MatchingStatusLabel>
            <IconWrapper>
              <CareGiver />
            </IconWrapper>
          </ApplyStatusTop>
          <StatusRowWrapper>
            <ApplyStatusBottom>
              <MatchingStatusLabel>
                <BoxTitle>
                  평균
                  <br />
                  지원자
                </BoxTitle>
                <BoxNumberWrapper>
                  <BoxNumber>{data?.averageAppliedCaregiver}</BoxNumber>
                  <BoxUnit>명</BoxUnit>
                </BoxNumberWrapper>
              </MatchingStatusLabel>
              <IconWrapper>
                <Applyer />
              </IconWrapper>
            </ApplyStatusBottom>
            <ApplyStatusBottom>
              <MatchingStatusLabel>
                <BoxTitle>
                  평균
                  <br />
                  지원률
                </BoxTitle>
                <BoxNumberWrapper>
                  <BoxNumber>{data?.averageApplyingRate}</BoxNumber>
                  <BoxUnit>%</BoxUnit>
                </BoxNumberWrapper>
              </MatchingStatusLabel>
              <IconWrapper>
                <Applying />
              </IconWrapper>
            </ApplyStatusBottom>
          </StatusRowWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <TitleLabel>매칭 대기중인 어르신</TitleLabel>
            <TitleDetailWrapper>
              <TitleDetail onClick={() => (window.location.href = '/elderly')}>
                자세히 보기
              </TitleDetail>
              <TitleDetailImg>
                <ArrowDetail />
              </TitleDetailImg>
            </TitleDetailWrapper>
          </TitleWrapper>
          <StatusRowWrapper>
            {data?.matchingElderlyList.slice(0, 3).map((elderly) => (
              <ElderlyList>
                <ElderlImg src={elderly.profileImageUrl} />
                <NameWrapper>
                  <Name>{elderly.name}</Name>
                  <AgeGenderWrapper>
                    <Detail>{elderly.age}세</Detail>
                    <Border2 />
                    <Detail>{elderly.gender === 'FEMALE' ? '여' : '남'}</Detail>
                  </AgeGenderWrapper>
                </NameWrapper>
              </ElderlyList>
            ))}
          </StatusRowWrapper>
        </SectionWrapper>
      </HomeContainer>

      <SocialWorkerTabBar />
    </Container>
  );
};

export default SocialHomePage;

const Container = styled.div`
  padding-bottom: 97px;
  background: #f2f4f6;
`;

const NavLeft = styled.div`
  width: 84px;
  height: 32px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  background: ${({ theme }) => theme.colors.mainBlue};
  height: 56px;
  padding: 12px 0px;
`;

const Info = styled.div`
  height: 32px;
  margin: auto 20px;
  padding: 12px 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
`;

const InfoPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HomeContainer = styled.div`
  margin: auto 20px;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TitleDetailWrapper = styled.div`
  display: flex;
  gap: 2px;
  justify-content: space-between;
  align-items: center;
`;

const TitleDetail = styled.label`
  color: #666666;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TitleDetailImg = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InstitutionWrapper = styled.div`
  display: flex;
  padding: 24px 20px;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const InstitutionDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InstitutionDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InstitutionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const InstitutionCount = styled.div`
  display: flex;
`;

const Label16500 = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Label16700 = styled.div<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;

const StatusRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const MatchingStatus = styled.div`
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.colors.white};
  padding: 24px 16px 16px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, color }) => {
    switch (color) {
      case 'green':
        return theme.colors.mainGreen;
      case 'orange':
        return theme.colors.mainOrange;
      case 'blue':
        return theme.colors.mainBlue;
      default:
        return theme.colors.gray600;
    }
  }};
`;

const MatchingStatusLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;

const BoxTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const BoxNumberWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1px;
`;

const BoxNumber = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 100%;
`;

const BoxUnit = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ApplyStatusTop = styled.div`
  height: 54px;
  background: ${({ theme }) => theme.colors.white};
  padding: 20px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const ApplyStatusBottom = styled.div`
  width: 100%;
  height: 74px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

const ElderlyList = styled.div`
  width: 100%;
  height: 112px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ElderlImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border2 = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;
