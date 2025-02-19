import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { SocialTabBar } from '@/components/Matching/SocialTabBar';

import { styled } from 'styled-components';

export const MatchingApplyPage = () => {
  return (
    <div>
      <TopContainer>매칭 등록하기</TopContainer>
      <SearchContainer>
        <MatchingSearchBox placeholder="검색할 이름을 입력해주세요." />
      </SearchContainer>
      <SocialTabBar />
    </div>
  );
};

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px 0px 20px;
`;
