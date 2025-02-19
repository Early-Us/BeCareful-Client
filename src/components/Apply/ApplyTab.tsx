import { ApplyFailContainer } from '@/components/Apply/ApplyFailContainer';
import { ApplyPassContainer } from '@/components/Apply/ApplyPassContainer';
import { Tab } from '@/components/common/Tab/Tab';
import { styled } from 'styled-components';
import { ApplyPendingContainer } from './ApplyPendingContainer';

export const ApplyTab = () => {
  return (
    <TabContainer>
      <Tab tabs={tabsData} />
    </TabContainer>
  );
};

const tabsData = [
  {
    name: '검토중',
    content: <ApplyPendingContainer />,
  },
  {
    name: '합격',
    content: <ApplyPassContainer />,
  },
  {
    name: '거절',
    content: <ApplyFailContainer />,
  },
];

const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;
