import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import { styled } from 'styled-components';

interface RecruitmentInfo {
  recruitmentId: number;
  title: string;
  careTypes: string[];
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  workSalaryType: string;
  workSalaryAmount: number;
  isRecruiting: boolean;
  institutionName: string;
  matchRate: number;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
}

interface ApplyData {
  recruitmentInfo: RecruitmentInfo;
  matchingStatus: '미지원' | '합격' | '불합격';
}

export const ApplyPendingContainer = () => {
  const [applyData, setApplyData] = useState<ApplyData[]>([]);
  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const fetchApplyData = async () => {
    try {
      let accessToken;
      if (localStorage.getItem('isAutoLogin')) {
        accessToken = localStorage.getItem('accessToken');
      } else {
        accessToken = sessionStorage.getItem('accessToken');
      }

      const response = await axios.get(
        `${apiBaseURL}/recruitment/my/recruitment`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            recruitmentStatus: '불합격',
          },
        },
      );

      setApplyData(response.data);
    } catch (error) {
      console.error('일자리 지원 내역 조회 에러: ', error);
    }
  };

  useEffect(() => {
    fetchApplyData();
  }, []);

  const handleCardClick = (recruitmentId: number) => {
    navigate(`/apply/${recruitmentId}`);
  };

  return (
    <TabContainer>
      {applyData.map((apply, index) => {
        const { recruitmentInfo, matchingStatus } = apply;
        const chipState =
          matchingStatus === '합격'
            ? 'pending'
            : matchingStatus === '미지원'
              ? 'pass'
              : 'fail';

        return (
          <ApplyCard
            key={index}
            chipState={chipState}
            centerName={recruitmentInfo.institutionName}
            description={recruitmentInfo.title}
            tags={recruitmentInfo.isHotRecruitment ? ['인기공고'] : []}
            careItems={recruitmentInfo.careTypes}
            workingDays={recruitmentInfo.workDays.map((day) => day.slice(0, 3))}
            workingHours={`${recruitmentInfo.workStartTime}~${recruitmentInfo.workEndTime}`}
            hourlyRate={`${recruitmentInfo.workSalaryAmount}원`}
            onClick={() => handleCardClick(recruitmentInfo.recruitmentId)}
          />
        );
      })}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 100px;
`;
