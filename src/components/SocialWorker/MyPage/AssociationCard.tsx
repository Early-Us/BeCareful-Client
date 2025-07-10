import styled from 'styled-components';

interface AssociationCardProps {
  association: string;
  type: string;
  rank: string;
}

const AssociationCard = ({ association, type, rank }: AssociationCardProps) => {
  return (
    <CardContainer>
      <label className="association">{association}</label>

      <InfoWrapper>
        <div className="applyWrapper">
          <label className="title">회원유형</label>
          <label className="title">직급</label>
        </div>
        <div className="applyWrapper">
          <label className="detail">{type}</label>
          <label className="detail">{rank}</label>
        </div>
      </InfoWrapper>
    </CardContainer>
  );
};

export default AssociationCard;

const CardContainer = styled.div`
  display: flex;
  padding: 20px 20px 24px 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .association {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 32px;

  .applyWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
