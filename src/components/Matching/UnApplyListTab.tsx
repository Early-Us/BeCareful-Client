import { TabContentMatching } from '@/components/Matching/TabContentMatching';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface Caregiver {
  caregiverId: number;
  profileImageUrl: string;
  name: string;
  resumeTitle: string;
}

interface UnApplyListTabProps {
  recruitmentId: number;
  caregivers: Caregiver[];
}

export const UnApplyListTab = ({
  recruitmentId,
  caregivers,
}: UnApplyListTabProps) => {
  const navigate = useNavigate();
  return (
    <Container>
      {caregivers.map((caregiver, index) => (
        <TabContentMatching
          key={index}
          matchingScore={85}
          profileImageUrl={caregiver.profileImageUrl}
          caregiverName={caregiver.name}
          careerTitle={caregiver.resumeTitle}
          onClick={() =>
            navigate(
              `/matching/${recruitmentId}/caregiver/${caregiver.caregiverId}`,
            )
          }
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
