import { TabBar } from '@/components/common/TabBar';

import { WorkFilterContent } from '@/components/Works/WorkMain/WorkFilterContet';
import { WorkMainHeader } from '@/components/Works/WorkMain/WorkMainHeader';
import WorkApplys from '@/components/Works/WorkMain/WorkApplys';
import { styled } from 'styled-components';
import { RecruitCard } from '@/components/common/RecruitCard/RecruitCard';

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
        <RecruitCard
          chipState="fail"
          centerName="행복사랑요양센터"
          description="방문요양/1일 9시간씩 주6일 모집"
          tags={['인기공고', '시급 TOP']}
          careItems={['식사보조', '이동보조']}
          workingDays={['목', '일']}
          workingHours="15:00~19:00"
          hourlyRate="12,000원"
        />
        <RecruitCard
          chipState="fail"
          centerName="행복사랑요양센터"
          description="방문요양/1일 9시간씩 주6일 모집"
          tags={['인기공고', '시급 TOP']}
          careItems={['식사보조', '이동보조']}
          workingDays={['목', '일']}
          workingHours="15:00~19:00"
          hourlyRate="12,000원"
        />
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 100px;
`;
