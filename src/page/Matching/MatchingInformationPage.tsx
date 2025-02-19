import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { MatchingElderInfo } from '@/components/Matching/MatchingElderInfo';
import { styled } from 'styled-components';
import axios from 'axios';
import { MatchingTab } from '@/components/Matching/Modal/MatchingTab';

interface Caregiver {
  profileImageUrl: string;
  name: string;
  resumeTitle: string;
}

interface ElderData {
  elderlyName: string;
  careType: string[];
  elderlyAge: number;
  gender: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  unAppliedCaregivers: Caregiver[];
  appliedCaregivers: Caregiver[];
}

export const MatchingInformationPage = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const [elderData, setElderData] = useState<ElderData | null>(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchElderData = async () => {
      try {
        const response = await axios.get<ElderData>(
          `${apiUrl}/recruitment/${recruitmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        setElderData(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    };

    if (recruitmentId) fetchElderData();
  }, [recruitmentId, apiUrl, token]);

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate('/matching')}>
          <IconArrowLeft />
        </IconContainer>
        매칭 정보
        <HideIconContainer />
      </TopContainer>

      {elderData ? (
        <>
          <MatchingElderInfo
            elderlyName={elderData.elderlyName}
            careTypes={elderData.careType}
            elderlyAge={elderData.elderlyAge}
            gender={elderData.gender}
            workDays={elderData.workDays}
            workStartTime={elderData.workStartTime}
            workEndTime={elderData.workEndTime}
            profileImageUrl={
              elderData.unAppliedCaregivers[0]?.profileImageUrl || ''
            }
          />
          <GapContainer />
          <TabContainer>
            <MatchingTab
              appliedCaregivers={elderData.appliedCaregivers}
              unAppliedCaregivers={elderData.unAppliedCaregivers}
            />
          </TabContainer>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 24px 16px auto 16px;
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

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const TabContainer = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  width: 100%;
`;
