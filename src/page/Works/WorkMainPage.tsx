import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { WorkFilterContent } from '@/components/Works/WorkMain/WorkFilterContet';
import { WorkMainHeader } from '@/components/Works/WorkMain/WorkMainHeader';
import WorkApplys from '@/components/Works/WorkMain/WorkApplys';
import { styled } from 'styled-components';
import { RecruitmentList } from '@/components/Works/RecruitCard/RecruitmentList';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
export const WorkMainPage = () => {
  const [data, setData] = useState<Caregiver>();

  const formattedCareTypes = data?.workApplicationInfo?.careTypes
    ? data.workApplicationInfo.careTypes.length > 2
      ? `${data.workApplicationInfo.careTypes[0]}, ${data.workApplicationInfo.careTypes[1]} 외 ${data.workApplicationInfo.careTypes.length - 2}`
      : data.workApplicationInfo.careTypes.join(', ')
    : '';

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
  }, []);
  return (
    <PageWrapper>
      <WorkMainHeader />
      <WorkApplys
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
      <GapContainer />
      <WorkFilterContent />
      <CardContainer>
        <RecruitmentList />
      </CardContainer>

      <SocialWorkerTabBar />
    </PageWrapper>
  );
};

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const PageWrapper = styled.div`
  overflow-x: hidden;
`;

{
  /*TODO: 필터링에 따른 카들 구분 나중에 구현해야 함*/
}
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 100px;
`;
