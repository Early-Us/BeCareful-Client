import { styled } from 'styled-components';

interface ApplyTagProps {
  label: string;
}

export const ApplyTag = ({ label }: ApplyTagProps) => {
  return <TagContainer>{label}</TagContainer>;
};

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 8px;

  background-color: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
