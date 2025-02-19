import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
            recruitmentStatus: '지원',
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

  return (
    <TabContainer>
      {applyData.map((apply, index) => {
        const { recruitmentInfo, matchingStatus } = apply;
        const chipState =
          matchingStatus === '미지원'
            ? 'pending'
            : matchingStatus === '합격'
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
