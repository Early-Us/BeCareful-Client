import { AssociationListCard } from '@/components/Community/JoinCommunity/AssociationListCard';
import { CommunityNotFound } from '@/components/Community/JoinCommunity/CommunityNotFound';
import { styled } from 'styled-components';

const dummyAssociations = [
  {
    name: '전주완주장기요양기관협회',
    establishedYear: '2000년',
    memberCount: 121,
    thumbnailUrl: '',
  },
  {
    name: '00장기요양기관협회',
    establishedYear: '2000년',
    memberCount: 1,
    thumbnailUrl: '',
  },
  {
    name: '더미장기요양기관협회',
    establishedYear: '2000년',
    memberCount: 1,
    thumbnailUrl: '',
  },
];

interface Props {
  keyword: string;
}

export const CommunitySearchList = ({ keyword }: Props) => {
  const trimmed = keyword.trim();
  const isSearching = trimmed.length > 0;
  const filtered = dummyAssociations.filter((a) => a.name.includes(trimmed));

  const targetList = isSearching ? filtered : dummyAssociations;
  const title = isSearching
    ? `${filtered.length}건`
    : `전체 ${dummyAssociations.length}개`;

  if (isSearching && filtered.length === 0) {
    return (
      <>
        <ResultCountText>0건</ResultCountText>
        <CommunityNotFound />
      </>
    );
  }

  return <AssociationListCard title={title} associations={targetList} />;
};

const ResultCountText = styled.div`
  padding: 16px 20px 0;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray700};
`;
