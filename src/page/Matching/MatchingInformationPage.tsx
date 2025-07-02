import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { MatchingElderInfo } from '@/components/Matching/MatchingElderInfo';
import { styled } from 'styled-components';
import { MatchingTab } from '@/components/Matching/Modal/MatchingTab';
import { useMatchingRecruitment } from '@/api/matching.socialWorker';
export const MatchingInformationPage = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const {
    data: elderData,
    isLoading,
    isError,
  } = useMatchingRecruitment(recruitmentId ?? '');

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate(-2)}>
          <IconArrowLeft />
        </IconContainer>
        매칭 정보
        <HideIconContainer />
      </TopContainer>

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>에러가 발생했습니다.</p>}

      {elderData && (
        <>
          <MatchingElderInfo data={elderData} />
          <GapContainer />
          <TabContainer>
            <MatchingTab
              recruitmentId={Number(recruitmentId)}
              matchedCaregivers={elderData.matchedCaregivers}
              appliedCaregivers={elderData.appliedCaregivers}
            />
          </TabContainer>
        </>
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
