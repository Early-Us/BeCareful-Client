import { AssociationListItem } from '@/components/Community/JoinCommunity/AssociationListItem';
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
    name: '전주완주장기요양기관협회',
    establishedYear: '2000년',
    memberCount: 121,
    thumbnailUrl: '',
  },
];

export const AssociationListCard = () => {
  return (
    <CardListWrapper>
      {dummyAssociations.map((item) => (
        <AssociationListItem
          key={item.name}
          name={item.name}
          establishedYear={item.establishedYear}
          memberCount={item.memberCount}
          thumbnailUrl={item.thumbnailUrl}
        />
      ))}
    </CardListWrapper>
  );
};

const CardListWrapper = styled.div`
  ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px 20px 12px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.03);
  margin: 20px;
`;
