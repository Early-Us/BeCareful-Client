import { styled } from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';

import { useNavigate } from 'react-router-dom';

interface CommunityModalProps {
  width: string;
  onClose: () => void;
  onCancel?: () => void;
}

export const CommunityModal = ({
  width,
  onClose,
  onCancel,
}: CommunityModalProps & { recruitmentId: string | null }) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/community/create');
  };

  const handleApply = () => {
    onClose();
    onCancel?.();
  };

  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalTopContainer>
          <ModalCloseButton onClick={onClose}>
            <ModalClose />
          </ModalCloseButton>
        </ModalTopContainer>
        <ModalMiddleContainer>
          <span>페이지에서 나가시겠습니까?</span>
          <span className="highlight">
            지금까지 작성한 내용이 모두 사라집니다.
          </span>
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button variant="blue2" height="52px" onClick={handleCancel}>
            나가기
          </Button>

          <Button variant="blue" height="52px" onClick={handleApply}>
            계속 작성하기
          </Button>
        </ModalBottomContainer>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

const ModalContent = styled.div<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 12px;
  width: ${({ width }) => width};

  margin-bottom: 28px;
  position: relative;
`;

const ModalTopContainer = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: flex-end;
  align-items: center;
`;

const ModalMiddleContainer = styled.div`
  display: flex;
  padding: 0px 20px 8px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ModalBottomContainer = styled.div`
  display: flex;
  padding: 16px 20px 20px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ModalCloseButton = styled.div`
  cursor: pointer;
`;
