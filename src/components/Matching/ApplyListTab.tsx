import { TabContentMatching } from '@/components/Matching/TabContentMatching';
import { styled } from 'styled-components';

interface Caregiver {
  profileImageUrl: string;
  name: string;
  resumeTitle: string;
}

interface ApplyListTabProps {
  caregivers: Caregiver[];
}

export const ApplyListTab = ({ caregivers }: ApplyListTabProps) => {
  return (
    <Container>
      {caregivers.map((caregiver, index) => (
        <TabContentMatching
          key={index}
          matchingScore={85}
          profileImageUrl={caregiver.profileImageUrl}
          caregiverName={caregiver.name}
          careerTitle={caregiver.resumeTitle}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
