import { ElderInfo } from '@/components/Works/WorkDetail/ElderInfo';
import { OrganizationInfo } from '@/components/Works/WorkDetail/OrganizationInfo';
import { WorkDetailMain } from '@/components/Works/WorkDetail/WorkDetailMain';
import { WorkHeader } from '@/components/Works/WorkDetail/WorkHeader';
import { WorkInfo } from '@/components/Works/WorkDetail/WorkInfo';
import { RecruitmentDetailResponse } from '@/type/Work';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

export const ApplyDetailPage = () => {
  const { recruitmentId } = useParams();

  const [recruitmentDetail, setRecruitmentDetail] =
    useState<RecruitmentDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchRecruitmentDetail = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/recruitment/list/${recruitmentId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          },
        );
        setRecruitmentDetail(response.data);
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('WorkDetailPage.tsx:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitmentDetail();
  }, [apiUrl, recruitmentId, sessionStorage.getItem('accessToken')]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { recruitmentInfo, elderlyInfo, institutionInfo } = recruitmentDetail!;
  const {
    title,
    workDays,
    workStartTime,
    workEndTime,
    workSalaryAmount,
    careInfoList,
  } = recruitmentInfo;
  const {
    name,
    address,
    gender,
    age,
    hasInmate,
    hasPet,
    profileImageUrl,

    healthCondition,
  } = elderlyInfo;
  const { name: institutionName, address: institutionAddress } =
    institutionInfo;

  return (
    <div>
      <WorkHeader />
      <WorkDetailMain
        centerName={institutionName}
        details={title}
        tags={workDays}
        workDays={workDays}
        workStartTime={workStartTime}
        workEndTime={workEndTime}
        workSalaryAmount={workSalaryAmount}
      />
      <GapContainer />
      <ElderInfo
        profileImageUrl={profileImageUrl}
        name={name}
        ageAndGender={`${age}세 ${gender === 'MALE' ? '남성' : '여성'}`}
        address={address}
        healthStatus={healthCondition}
        livingArrangement={hasInmate ? '동거중' : '독거'}
        petStatus={hasPet ? '있음' : '없음'}
      />
      <GapContainer />
      <WorkInfo
        careItems={careInfoList.map((care) => care.careType)}
        others={[
          `급여: ${workSalaryAmount}원`,
          `근무시간: ${workStartTime} ~ ${workEndTime}`,
        ]}
      />
      <GapContainer />
      <OrganizationInfo name={institutionName} address={institutionAddress} />
    </div>
  );
};
const GapContainer = styled.div`
  display: flex;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;
