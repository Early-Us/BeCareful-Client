import LoginContent from '@/components/common/Login/LoginContent';
import { Tab } from '@/components/common/Tab/Tab';
import styled from 'styled-components';

const LoginPage = () => {
  const tabData = [
    { name: '요양보호사', content: <LoginContent /> },
    { name: '사회복지사', content: <LoginContent /> },
  ];

  return (
    <LoginWrapper>
      <Tab tabs={tabData} />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 24px 16px auto 16px;
`;

export default LoginPage;
