import { Tab } from '@/components/common/Tab/Tab';
import { ApplyListTab } from '@/components/Matching/ApplyListTab';
import { UnApplyListTab } from '@/components/Matching/UnApplyListTab';
import styled from 'styled-components';

interface Caregiver {
  profileImageUrl: string;
  name: string;
  resumeTitle: string;
}

interface MatchingTabProps {
  appliedCaregivers: Caregiver[];
  unAppliedCaregivers: Caregiver[];
}

export const MatchingTab = ({
  appliedCaregivers,
  unAppliedCaregivers,
}: MatchingTabProps) => {
  return (
    <TabContainer>
      <Tab
        tabs={[
          {
            name: '매칭 리스트',
            content: <UnApplyListTab caregivers={unAppliedCaregivers} />,
          },
          {
            name: '지원 리스트',
            content: <ApplyListTab caregivers={appliedCaregivers} />,
          },
        ]}
      />
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;
