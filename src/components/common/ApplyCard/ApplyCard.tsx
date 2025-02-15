import { ApplyChip } from '@/components/common/ApplyCard/ApplyChip';
import { ApplyTag } from '@/components/common/ApplyCard/ApplyTag';
import { styled } from 'styled-components';

interface ApplyCardProps {
  centerName: string;
  description: string;
  tags: string[];
  careItems: string[];
  workingDays: string[];
  workingHours: string;
  hourlyRate: string;
}

export const ApplyCard = ({
  centerName,
  description,
  tags,
  careItems,
  workingDays,
  workingHours,
  hourlyRate,
}: ApplyCardProps) => {
  return (
    <CardContainer>
      <ApplyChip state={'pass'} />
      <CardTopContainer>
        <CardTopHeader>
          <CardTopTitle>{centerName}</CardTopTitle>
          <CardTopContent>{description}</CardTopContent>
        </CardTopHeader>
        <CardTopTag>
          {tags.map((label, index) => (
            <ApplyTag key={index} label={label} />
          ))}
        </CardTopTag>
      </CardTopContainer>
      <CardMiddleContainer>
        <CardMiddleContent>
          <span>케어항목</span>
          <span>{careItems.join(', ')}</span>
        </CardMiddleContent>
        <CardMiddleContent>
          <span>근무요일</span>
          <span>{workingDays.join(', ')}</span>
        </CardMiddleContent>
        <CardMiddleContent>
          <span>근무시간</span>
          <span>{workingHours}</span>
        </CardMiddleContent>
      </CardMiddleContainer>
      <CardBottomContainer>
        <CardBottomContent>
          <span>시급</span>
          <span>{hourlyRate}</span>
        </CardBottomContent>
      </CardBottomContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: inline-flex;
  padding: 20px 20px 28px 20px;
  gap: 12px;
  flex-direction: column;
  border-radius: 12px;
  width: 320px;
  box-sizing: border-box;
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const CardTopContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

const CardMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardBottomContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const CardTopHeader = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const CardTopTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CardTopContent = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CardTopTag = styled.div`
  display: flex;
  gap: 6px;
`;

const CardMiddleContent = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: row;
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  span:first-child {
    color: ${({ theme }) => theme.colors.gray500};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const CardBottomContent = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: row;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  span:first-child {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
