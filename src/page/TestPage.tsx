import styled from 'styled-components';
import { InputBox } from '../components/common/InputBox';

export const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <Title>Test Title</Title>
      <InputBox
        width="320px"
        label="필드 레이블"
        state="default"
        placeholder="플레이스홀더"
        guide="도움말"
      />
      <InputBox
        width="320px"
        label="필드 레이블"
        state="error"
        placeholder="플레이스홀더"
        guide="도움말"
      />
      <InputBox
        width="320px"
        label="필드 레이블"
        state="success"
        placeholder="플레이스홀더"
        guide="도움말"
      />
    </div>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
