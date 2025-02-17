import { ElderInfo } from '@/components/Works/WorkDetail/ElderInfo';
import { OrganizationInfo } from '@/components/Works/WorkDetail/OrganizationInfo';
import { WorkBottomButton } from '@/components/Works/WorkDetail/WorkBottomButton';
import { WorkDetailMain } from '@/components/Works/WorkDetail/WorkDetailMain';
import { WorkHeader } from '@/components/Works/WorkDetail/WorkHeader';
import { WorkInfo } from '@/components/Works/WorkDetail/WorkInfo';
import { styled } from 'styled-components';

export const WorkDetailPage = () => {
  return (
    <div>
      <WorkHeader />

      <WorkDetailMain
        centerName="행복사랑요양센터"
        details="[창동/3등급/76세/남성,독거] 방문요양/1일 9시간씩 주6일"
        tags={['태그1', '태그2', '태그3']}
      />
      <GapContainer />
      <ElderInfo
        name="박순자"
        ageAndGender="65세 여성"
        address="서울시 마포구 구방동"
        healthStatus="당뇨, 신장질환"
        livingArrangement="동거중"
        petStatus="없음"
      />
      <GapContainer />
      <WorkInfo
        careItems={[
          '식사보조 - 식사 차려드리기, 경관식 보조',
          '이동보조 - 휠체어 이동 보조',
          '배변보조 - 스스로 배변 가능',
        ]}
        others={['여성우대, 초보자 가능', '긍정적이고 책임감 있으신분 모집']}
      />
      <GapContainer />
      <OrganizationInfo
        name="사랑행복재활주간보호센터"
        address="서울특별시 강남구 테헤란로 172"
      />
      <WorkBottomButton />
    </div>
  );
};

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;
