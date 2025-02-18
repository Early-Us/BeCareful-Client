import { Button } from '@/components/common/Button/Button';
import { ApplyModal } from '@/components/Works/WorkModal/ApplyModal';
import { RefuseModal } from '@/components/Works/WorkModal/RefuseModal';
import { RealRefuseModal } from '@/components/Works/WorkModal/RealRefuseModal';
import { TuneConditionModal } from '@/components/Works/WorkModal/TuneConditionModal';
import { useState } from 'react';
import { styled } from 'styled-components';
import { AfterTuneModal } from '@/components/Works/WorkModal/AfterTuneModal';

export const WorkBottomButton = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const openApplyModal = () => setIsApplyModalOpen(true);
  const closeApplyModal = () => setIsApplyModalOpen(false);

  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const openRefuseModal = () => setIsRefuseModalOpen(true);
  const closeRefuseModal = () => setIsRefuseModalOpen(false);

  const [isRealRefuseModalOpen, setIsRealRefuseModalOpen] = useState(false);
  const openRealRefuseModal = () => setIsRealRefuseModalOpen(true);
  const closeRealRefuseModal = () => setIsRealRefuseModalOpen(false);

  const [isTuneConditionModalOpen, setIsTuneConditionModalOpen] =
    useState(false);
  const openTuneConditionModal = () => setIsTuneConditionModalOpen(true);
  const closeTuneConditionModal = () => setIsTuneConditionModalOpen(false);

  const [isAfterTuneModalOpen, setIsAfterTuneModalOpen] = useState(false);
  const openAfterTuneModal = () => setIsAfterTuneModalOpen(true);
  const closeAfterTuneModal = () => setIsAfterTuneModalOpen(false);

  const handleOpenTuneConditionModal = () => {
    closeRefuseModal();
    openTuneConditionModal();
  };

  const handleOpenAfterTuneModal = () => {
    closeTuneConditionModal();
    openAfterTuneModal();
  };

  const handleOpenRealRefuseModal = () => {
    closeRefuseModal();
    openRealRefuseModal();
  };

  return (
    <ButtonContainer>
      <Button variant="white" height="52px" onClick={openRefuseModal}>
        거절하기
      </Button>

      <Button variant="blue" height="52px" onClick={openApplyModal}>
        지원하기
      </Button>
      {isApplyModalOpen && (
        <ApplyModal width="312px" onClose={closeApplyModal} />
      )}

      {isRefuseModalOpen && (
        <RefuseModal
          width="312px"
          onClose={closeRefuseModal}
          onReject={handleOpenRealRefuseModal}
          onTuneConditions={handleOpenTuneConditionModal}
        />
      )}

      {isRealRefuseModalOpen && (
        <RealRefuseModal width="312px" onClose={closeRealRefuseModal} />
      )}

      {isTuneConditionModalOpen && (
        <TuneConditionModal
          width="312px"
          onClose={closeTuneConditionModal}
          onApply={handleOpenAfterTuneModal}
        />
      )}

      {isAfterTuneModalOpen && (
        <AfterTuneModal width="312px" onClose={closeAfterTuneModal} />
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  width: 100%;
  gap: 6px;
`;
