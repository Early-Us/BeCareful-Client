import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ChatButton } from '@/page/Chat/ChatButton';

interface CareGiverInfo {
  matchingId: number;
  name: string;
  profileImageUrl: string;
  workDays: string[];
  workTimes: string[];
  workSalaryAmount: number;
  careTypes: string[];
  certificates: string[];
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
}

export const CareGiverInfoPage = () => {
  const navigate = useNavigate();
  const { recruitmentId, caregiverId } = useParams();
  const [careGiverInfo, setCareGiverInfo] = useState<CareGiverInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareGiverInfo = async () => {
      try {
        console.log('API 요청 시작');
        const apiBaseURL = import.meta.env.VITE_APP_API_URL;
        let accessToken;
        if (localStorage.getItem('isAutoLogin')) {
          accessToken = localStorage.getItem('accessToken');
        } else {
          accessToken = sessionStorage.getItem('accessToken');
        }

        console.log(
          'API 요청 URL:',
          `${apiBaseURL}/recruitment/${recruitmentId}/caregiver/${caregiverId}`,
        );
        console.log('Access Token:', accessToken);

        const response = await axios.get(
          `${apiBaseURL}/recruitment/${recruitmentId}/caregiver/${caregiverId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('API 응답:', response.data); // 응답 데이터 확인
        setCareGiverInfo(response.data);
      } catch (error) {
        console.error('요양보호사 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (recruitmentId && caregiverId) {
      fetchCareGiverInfo();
    }
  }, [recruitmentId, caregiverId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!careGiverInfo) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }
  console.log('recruitmentId:', recruitmentId);
  console.log('caregiverId:', caregiverId);

  const dayMap: Record<string, string> = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };

  const timeMap: Record<string, string> = {
    MORNING: '오전',
    AFTERNOON: '오후',
    EVENING: '저녁',
    NIGHT: '야간',
  };

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate('/matching')}>
          <IconArrowLeft />
        </IconContainer>
        매칭 정보
        <HideIconContainer />
      </TopContainer>
      <ProfileInfoContainer>
        <ProfileImage
          src={careGiverInfo.profileImageUrl || '/default-profile.png'}
        />
        <RightContainer>
          <ProfileInfo>
            <span className="highlight">{careGiverInfo.name}</span>
            <span>믿고 맡길 수 있는 편안함을 제공합니다.</span>
          </ProfileInfo>
          <TagContainer>매칭적합도 {careGiverInfo.matchingId}%</TagContainer>
        </RightContainer>
      </ProfileInfoContainer>
      <GapContainer />
      <ContentContainer>
        <Title>근무정보</Title>
        <DetailContentContainer>
          <DetailContent>
            <span className="highlight">근무요일</span>
            <span>
              {careGiverInfo.workDays.map((day) => dayMap[day]).join(', ')}
            </span>
          </DetailContent>

          <DetailContent>
            <span className="highlight">근무시간</span>
            <span>
              {careGiverInfo.workTimes.map((time) => timeMap[time]).join(', ')}
            </span>
          </DetailContent>

          <DetailContent>
            <span className="highlight">희망급여</span>
            <span>{careGiverInfo.workSalaryAmount.toLocaleString()}원</span>
          </DetailContent>
          <DetailContent>
            <span className="highlight">케어항목</span>
            <span>{careGiverInfo.careTypes.join(', ')}</span>
          </DetailContent>
          <DetailContent>
            <span className="highlight">자격증</span>
            <span>{careGiverInfo.certificates.join(', ')}</span>
          </DetailContent>
          <DetailContent>
            <span className="highlight">자차보유</span>
            <span>{careGiverInfo.isHavingCar ? '예' : '아니요'}</span>
          </DetailContent>
          <DetailContent>
            <span className="highlight">치매교육 이수</span>
            <span>
              {careGiverInfo.isCompleteDementiaEducation
                ? '이수 완료'
                : '미이수'}
            </span>
          </DetailContent>
        </DetailContentContainer>
      </ContentContainer>
      <ButtonContainer>
        <ButtonContainer>
          <ChatButton
            matchingId={careGiverInfo.matchingId.toString()}
            date="2025-02-21"
          />
        </ButtonContainer>
      </ButtonContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //margin: 24px 16px auto 16px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HideIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  gap: 12px;
  width: 100%;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .highlight {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const ProfileImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RightContainer = styled.div`
  display: flex;
  padding-top: 2px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const TagContainer = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray500};

  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const DetailContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: nowrap;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    min-width: 72px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-sizing: border-box;
  width: 100%;
`;
