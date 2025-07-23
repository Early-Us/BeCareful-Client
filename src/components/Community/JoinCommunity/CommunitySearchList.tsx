import { useGetAssociationList } from '@/api/communityAssociation';
import { AssociationListCard } from '@/components/Community/JoinCommunity/AssociationListCard';
import { CommunityNotFound } from '@/components/Community/JoinCommunity/CommunityNotFound';
import { styled } from 'styled-components';

interface Props {
  keyword: string;
}

export const CommunitySearchList = ({ keyword }: Props) => {
  const trimmed = keyword.trim();
  const isSearching = trimmed.length > 0;

  const { data, isLoading, isError } = useGetAssociationList();
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>목록 불러오는 중 오류가 발생했습니다.</div>;

  const associations = (data?.associationSimpleDtoList ?? []).map((item) => ({
    id: item.associationId,
    name: item.associationName,
    establishedYear: `${item.associationEstablishedYear}년`,
    memberCount: item.associationMemberCount,
    thumbnailUrl: item.associationProfileImageUrl,
  }));

  const filtered = associations.filter((a) => a.name.includes(trimmed));

  const targetList = isSearching ? filtered : associations;
  const title = isSearching
    ? `${associations.length}건`
    : `전체 ${associations.length}개`;

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
