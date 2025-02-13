import styled from 'styled-components';
import { ReactComponent as IconAlarm } from '@/assets/icons/IconAlarm.svg';
import { Tab } from '@/components/common/Tab/Tab';
import { InputBox } from '../components/common/InputBox';

export const TestPage = () => {
  const tabData = [
    { name: '요양보호사', content: <Tab1Content /> },
    { name: '사회복지사', content: <Tab2Content /> },
  ];
  return (
    <div>
      <h1>Test Page</h1>
      <IconWrapper>
        <IconAlarm />
      </IconWrapper>
      <Title>Test Title</Title>
      <Tab tabs={tabData} />
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

const Tab1Content = () => <div>첫번째내용티비</div>;
const Tab2Content = () => <div>두번째내용티비</div>;

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
