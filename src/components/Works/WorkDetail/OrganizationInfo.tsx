import styled from 'styled-components';

interface OrganizationInfoProps {
  name: string;
  address: string;
}

export const OrganizationInfo = ({ name, address }: OrganizationInfoProps) => {
  return (
    <OrganizationInfoContainer>
      <OrganizationTitle>기관정보</OrganizationTitle>

      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">기관명</span>
          <span>{name}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">주소</span>
          <span>{address}</span>
        </DetailContent>
      </DetailContentContainer>
    </OrganizationInfoContainer>
  );
};

const OrganizationInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 92px;
`;

const OrganizationTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const DetailContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    width: 72px;
  }
`;
