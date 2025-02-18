import styled from 'styled-components';

interface WorkInfoProps {
  careItems: string[];
  others: string[];
}

export const WorkInfo = ({ careItems, others }: WorkInfoProps) => {
  return (
    <WorkInfoContainer>
      <WorkTitle>근무내용</WorkTitle>

      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">케어항목</span>
          <Detail>
            {careItems.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </Detail>
        </DetailContent>
        <DetailContent>
          <span className="highlight">기타</span>
          <Detail>
            {others.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </Detail>
        </DetailContent>
      </DetailContentContainer>
    </WorkInfoContainer>
  );
};

const WorkInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const WorkTitle = styled.div`
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
  align-items: flex-start;
  flex-wrap: wrap;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    width: 72px;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;
