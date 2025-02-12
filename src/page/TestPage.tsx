import styled from 'styled-components';
import { ReactComponent as IconAlarm } from '@/assets/icons/IconAlarm.svg';

export const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <IconWrapper>
        <IconAlarm />
      </IconWrapper>
      <Title>Test Title</Title>
    </div>
  );
};

const IconWrapper = styled.div`
  path {
    fill: ${({ theme }) => theme.colors.mainOrange};
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
