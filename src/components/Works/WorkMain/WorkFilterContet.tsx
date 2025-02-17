import { WorkMainFilterTag } from '@/components/Works/WorkMain/WorkMainFilterTag';
import { styled } from 'styled-components';

export const WorkFilterContent = () => {
  return (
    <FilterContainer>
      <WorkMainFilterTag selected={false}>전체</WorkMainFilterTag>
      <WorkMainFilterTag selected={false}>👑 시급 TOP</WorkMainFilterTag>
      <WorkMainFilterTag selected={false}>🔥 인기공고</WorkMainFilterTag>
      <WorkMainFilterTag selected={false}>✅ 조건일치</WorkMainFilterTag>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  width: 360px;
  padding: 0 20px;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
`;
