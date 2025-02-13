import styled from 'styled-components';
import { ReactComponent as IconAlarm } from '@/assets/icons/IconAlarm.svg';
import { Tab } from '@/components/common/Tab/Tab';
import { Button } from '@/components/common/Button/Button';

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
      <Button variant="blue" width="320px" height="52px">
        다음 단계로 이동
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        인증번호 전송
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        재전송
      </Button>
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
