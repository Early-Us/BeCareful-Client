import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import { useQuery } from '@tanstack/react-query';
import { MatchingMyRecruitmentDetailResponse } from '@/types/Caregiver/apply';
import { getApplicationDetail } from '@/api/caregiver';

const CaregiverApplyDetailPage = () => {
  const { recruitmentId } = useParams();

  const { data, error } = useQuery<MatchingMyRecruitmentDetailResponse, Error>({
    queryKey: ['caregiverApplicationDetail', recruitmentId],
    queryFn: () => getApplicationDetail(Number(recruitmentId)),
  });
  if (error) {
    console.log('getApplicationDetail 에러: ', error);
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail
        work={data.recruitmentDetailInfo}
        date={data.applyDate}
      />
    </Container>
  );
};

export default CaregiverApplyDetailPage;

const Container = styled.div``;
