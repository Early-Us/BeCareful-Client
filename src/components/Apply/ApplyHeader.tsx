import { ReactComponent as MessageIcon } from '@/assets/icons/works/MessageIcon.svg';
import { styled } from 'styled-components';

export const ApplyHeader = () => {
  return (
    <HeaderContainer>
      지원현황
      <MessageIcon />
    </HeaderContainer>
  );
};
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0px 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray800};
`;
