import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';
import { TabBar } from '@/components/common/TabBar';
import { WorkFilterContent } from '@/components/Works/WorkMain/WorkFilterContet';
import { WorkMainHeader } from '@/components/Works/WorkMain/WorkMainHeader';
import { styled } from 'styled-components';

export const WorkMainPage = () => {
  return (
    <div>
      <WorkMainHeader />
      <div>일자리 신청서 컴포넌트 나중에 가져오기</div>
      <GapContainer />
      <WorkFilterContent />
      <CardContainer>
        <ApplyCard
          chipState="fail"
          centerName="행복사랑요양센터"
          description="방문요양/1일 9시간씩 주6일 모집"
          tags={['인기공고', '시급 TOP']}
          careItems={['식사보조', '이동보조']}
          workingDays={['목', '일']}
          workingHours="15:00~19:00"
          hourlyRate="12,000원"
        />
        <ApplyCard
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
    </div>
  );
};

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

//이 부분은 나중에 필터링 구현하면서 고칠 예정
const CardContainer = styled.div`
  display: flex;
  padding: 0 20px;
  width: 360px;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
