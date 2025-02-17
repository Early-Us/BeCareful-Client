import CaregiverLogin from '@/components/Login/CaregiverLogin';
import SocialworkerLogin from '@/components/Login/SocialworkerLogin';
import { Tab } from '@/components/common/Tab/Tab';
import styled from 'styled-components';

const LoginPage = () => {
  const tabData = [
    { name: '요양보호사', content: <CaregiverLogin /> },
    { name: '사회복지사', content: <SocialworkerLogin /> },
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
