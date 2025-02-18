import { ApplyHeader } from '@/components/Apply/ApplyHeader';
import { ApplyTab } from '@/components/Apply/ApplyTab';
import { TabBar } from '@/components/common/TabBar';
import { styled } from 'styled-components';

export const ApplyPage = () => {
  return (
    <div>
      <ApplyHeader />
      <TabContainer>
        <ApplyTab />
      </TabContainer>
      <TabBar />
    </div>
  );
};

const TabContainer = styled.div`
  display: flex;
  padding: 0px 20px 8px 20px;
  width: calc(100% - 40px);
  align-items: center;
`;
