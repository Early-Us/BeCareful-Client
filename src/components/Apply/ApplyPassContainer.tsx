import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';
import { styled } from 'styled-components';

//TODO: api 연동하면 싹 바꿔야함
export const ApplyPassContainer = () => {
  return (
    <TabContainer>
      <ApplyCard
        chipState="pass"
        centerName="행복사랑요양센터"
        description="방문요양/1일 9시간씩 주6일 모집"
        tags={['인기공고', '시급 TOP']}
        careItems={['식사보조', '이동보조']}
        workingDays={['목', '일']}
        workingHours="15:00~19:00"
        hourlyRate="12,000원"
      />
      <ApplyCard
        chipState="pass"
        centerName="행복사랑요양센터"
        description="방문요양/1일 9시간씩 주6일 모집"
        tags={['인기공고', '시급 TOP']}
        careItems={['식사보조', '이동보조']}
        workingDays={['목', '일']}
        workingHours="15:00~19:00"
        hourlyRate="12,000원"
      />
      <ApplyCard
        chipState="pass"
        centerName="행복사랑요양센터"
        description="방문요양/1일 9시간씩 주6일 모집"
        tags={['인기공고', '시급 TOP']}
        careItems={['식사보조', '이동보조']}
        workingDays={['목', '일']}
        workingHours="15:00~19:00"
        hourlyRate="12,000원"
      />
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 100px;
`;
