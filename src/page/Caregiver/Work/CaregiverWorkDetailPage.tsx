import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import { useQuery } from '@tanstack/react-query';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';
import { getRecruitmentDetail } from '@/api/caregiver';

const CaregiverWorkDetailPage = () => {
  const { recruitmentId } = useParams();

  const { data, error } = useQuery<MatchingRecruitmentResponse, Error>({
    queryKey: ['caregiveApplicationDetail', recruitmentId],
    queryFn: () => getRecruitmentDetail(Number(recruitmentId)),
  });
  if (error) {
    console.log('getRecruitmentDetail 에러: ', error);
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail work={data} />
      <Bottom>
        <Button isBlue={false}>거절하기</Button>
        <Button isBlue={true}>지원하기</Button>
      </Bottom>
    </Container>
  );
};

export default CaregiverWorkDetailPage;

const Container = styled.div``;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Button = styled.button<{ isBlue: boolean }>`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.white};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.white : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
