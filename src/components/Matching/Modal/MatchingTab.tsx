import { Tab } from '@/components/common/Tab/Tab';
import { ApplyListTab } from '@/components/Matching/ApplyListTab';
import { UnApplyListTab } from '@/components/Matching/UnApplyListTab';
import { MatchingCaregiver } from '@/types/Matching.socialWorker';
import styled from 'styled-components';

interface MatchingTabProps {
  recruitmentId: number;
  appliedCaregivers: MatchingCaregiver[];
  unAppliedCaregivers: MatchingCaregiver[];
}

export const MatchingTab = ({
  recruitmentId,
  appliedCaregivers,
  unAppliedCaregivers,
}: MatchingTabProps) => {
  return (
    <TabContainer>
      <Tab
        tabs={[
          {
            name: '매칭 리스트',
            content: (
              <UnApplyListTab
                caregivers={unAppliedCaregivers}
                recruitmentId={recruitmentId}
              />
            ),
          },
          {
            name: '지원 리스트',
            content: (
              <ApplyListTab
                caregivers={appliedCaregivers}
                recruitmentId={recruitmentId}
              />
            ),
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
