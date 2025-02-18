import { styled } from 'styled-components';

interface TagProps {
  children: React.ReactNode;
}

export const WorkDetailTag = ({ children }: TagProps) => {
  return <TagContainer>{children}</TagContainer>;
};

const TagContainer = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  white-space: nowrap;
`;
