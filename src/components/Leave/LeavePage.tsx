import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import LeaveConsent from '@/components/Leave/LeaveConsent';
import LeaveReason from '@/components/Leave/LeaveReason';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { UserRole } from '@/types/common';

interface LeavePageProps {
  role: UserRole;
}

const LeavePage = ({ role }: LeavePageProps) => {
  const { handleGoBack } = useHandleNavigate();

  const [step, setStep] = useState(1);

  return (
    <Container>
      <NavBar left={<NavLeft onClick={handleGoBack} />} />

      {step === 1 ? (
        <LeaveConsent onCancel={handleGoBack} onNext={() => setStep(2)} />
      ) : (
        <LeaveReason role={role} onCancel={handleGoBack} />
      )}
    </Container>
  );
};

export default LeavePage;

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled(Close)`
  cursor: pointer;
`;
