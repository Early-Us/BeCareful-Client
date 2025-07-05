import styled from 'styled-components';
import { ReactComponent as ProfileImage } from '@/assets/icons/SquareInstitutionProfile.svg';
import { ReactComponent as InstitutionAvatar } from '@/assets/icons/Institution_avatar.svg';
import { ReactComponent as PersonAvatar } from '@/assets/icons/Person_avatar.svg';

interface AssociationListItemProps {
  name: string;
  establishedYear: string;
  memberCount: number;
  thumbnailUrl?: string;
}

export const AssociationListItem = ({
  name,
  establishedYear,
  memberCount,
  thumbnailUrl,
}: AssociationListItemProps) => {
  return (
    <CardWrapper>
      <LeftSection>
        {name}
        <MetaInfo>
          <MetaItem>
            <InstitutionAvatar />
            <span>설립일 · {establishedYear}</span>
          </MetaItem>
          <MetaItem>
            <PersonAvatar />
            <span>회원수 · {memberCount}명</span>
          </MetaItem>
        </MetaInfo>
      </LeftSection>

      {thumbnailUrl ? (
        <Thumbnail src={thumbnailUrl} alt={`${name} 썸네일`} />
      ) : (
        <StyledProfileImage />
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  padding-bottom: 12px;
  margin-bottom: 12px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.black};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray600};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Thumbnail = styled.img`
  width: 71px;
  height: 71px;
  object-fit: cover;
`;

const StyledProfileImage = styled(ProfileImage)`
  margin-top: 10px;
`;
