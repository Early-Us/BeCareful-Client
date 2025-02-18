import { TabBar } from '@/components/common/TabBar';

import { WorkFilterContent } from '@/components/Works/WorkMain/WorkFilterContet';
import { WorkMainHeader } from '@/components/Works/WorkMain/WorkMainHeader';
import WorkApplys from '@/components/Works/WorkMain/WorkApplys';
import { styled } from 'styled-components';
import { RecruitmentList } from '@/components/Works/RecruitCard/RecruitmentList';

export const WorkMainPage = () => {
  return (
    <PageWrapper>
      <WorkMainHeader />
      <WorkApplys
        fix={'2025.02.14'}
        apply={false}
        caretype={'식사보조'}
        day={'화, 수, 토'}
        time={'오전, 오후'}
        pay={'20,200원'}
        location={'동대문구 전체'}
      />
      <GapContainer />
      <WorkFilterContent />
      <CardContainer>
        <RecruitmentList />
      </CardContainer>

      <TabBar />
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
