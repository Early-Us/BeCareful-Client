import { ReactComponent as CircleCheck } from '@/assets/icons/matching/CircleCheck.svg';
import { useState } from 'react';
import { styled } from 'styled-components';

interface MatchingCareCardProps {
  title: string;
  description: string;
  initialChecked: boolean;
}

export const MatchingCareCard = ({
  title,
  description,
  initialChecked,
}: MatchingCareCardProps) => {
  const [isClicked, setIsClicked] = useState(initialChecked);
  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <CardContainer isClicked={isClicked} onClick={handleClick}>
      <LeftContainer>
        <span className="highlight">{title}</span>
        <span>{description}</span>
      </LeftContainer>
      <RightContainer isClicked={isClicked}>
        <CircleCheck />
      </RightContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ isClicked: boolean }>`
  display: flex;
  height: 90px;
  padding: 20px 16px;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  border: ${({ theme, isClicked }) =>
    isClicked
      ? `2px solid ${theme.colors.mainBlue}`
      : `1px solid ${theme.colors.gray100}`};
  background-color: ${({ isClicked, theme }) =>
    isClicked ? theme.colors.subBlue : theme.colors.white};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const RightContainer = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: flex-start;

  path {
    fill: ${({ isClicked, theme }) =>
      isClicked ? theme.colors.mainBlue : theme.colors.gray200};
  }
`;
