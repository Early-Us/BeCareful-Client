import { ReactComponent as Search } from '@/assets/icons/community/Search.svg';
import { styled } from 'styled-components';

export const CommunityNotFound = () => {
  return (
    <CommunityNotFoundWrapper>
      <Search />
      <p>해당 커뮤니티가 없습니다.</p>
    </CommunityNotFoundWrapper>
  );
};

const CommunityNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  height: 101px;

  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
