import { WorkDetailTag } from '@/components/Works/WorkDetail/WorkDetailTag';
import { styled } from 'styled-components';

interface WorkDetailMainProps {
  centerName: string;
  details: string;
  tags: string[];
}

export const WorkDetailMain = ({
  centerName,
  details,
  tags,
}: WorkDetailMainProps) => {
  return (
    <DetailContainer>
      <DetailHeaderContainer>
        <span className="center">{centerName}</span>
        <span className="highlight">{details}</span>
        <TagContainer>
          {tags.map((tag, index) => (
            <WorkDetailTag key={index}>{tag}</WorkDetailTag>
          ))}
        </TagContainer>
      </DetailHeaderContainer>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">장기요양등급</span>
          <span>2등급</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무요일</span>
          <span>화,수,목</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무시간</span>
          <span>09:30 ~ 10:30</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">시급</span>
          <span>20,2000원</span>
        </DetailContent>
      </DetailContentContainer>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 20px 32px 20px;
`;
const DetailHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .center {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray700};
  }

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
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
