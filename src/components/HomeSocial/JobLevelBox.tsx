import styled from 'styled-components';

interface JobLevelBoxProps {
  rank: string;
}

export const JobLevelBox = ({ rank }: JobLevelBoxProps) => {
  return (
    <Label rank={rank}>{rank === 'MANAGER' ? '센터장' : '사회복지사'}</Label>
  );
};

const Label = styled.label<{ rank: string }>`
  padding: 2px 6px;
  width: 60px;
  height: 20px;
  background: ${({ theme, rank }) =>
    rank === 'MANAGER' ? theme.colors.subBlue : theme.colors.subGreen};
  color: ${({ theme, rank }) =>
    rank === 'MANAGER' ? theme.colors.mainBlue : theme.colors.mainGreen};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  display: flex;
  align-items: center;
`;
