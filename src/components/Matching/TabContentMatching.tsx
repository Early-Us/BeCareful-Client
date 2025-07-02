import { styled } from 'styled-components';

interface TabContentMatchingProps {
  matchingScore: '높음' | '보통' | '낮음';
  profileImageUrl?: string;
  caregiverName: string;
  careerTitle: string;
  onClick?: () => void;
}
const getTagColors = (score: '높음' | '보통' | '낮음') => {
  if (score === '높음') return { bg: 'subBlue', color: 'mainBlue' };
  if (score === '보통') return { bg: 'gray50', color: 'gray500' };
  return { bg: 'subOrange', color: 'mainOrange' };
};

export const TabContentMatching = ({
  matchingScore,
  profileImageUrl,
  caregiverName,
  careerTitle,
  onClick,
}: TabContentMatchingProps) => {
  return (
    <TabContainer onClick={onClick}>
      <LeftContainer>
        <ProfileImage src={profileImageUrl} alt={`${caregiverName}의 프로필`} />
      </LeftContainer>
      <RightContainer>
        <TagContainer score={matchingScore}>
          적합도 {matchingScore}
        </TagContainer>
        <span className="highlight">{caregiverName} 요양보호사</span>
        <span>{careerTitle}</span>
      </RightContainer>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  height: 115px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const RightContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .highlight {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const TagContainer = styled.div<{ score: '높음' | '보통' | '낮음' }>`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  ${({ theme, score }) => {
    const { bg, color } = getTagColors(score);
    return `
      background-color: ${theme.colors[bg]};
      color: ${theme.colors[color]};
    `;
  }}

  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  //border-radius: 50%;
  object-fit: cover;
`;
