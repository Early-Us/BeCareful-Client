import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';

interface RealRefuseModalProps {
  width: string;
  onClose: () => void;
}

export const RealRefuseModal = ({ width }: RealRefuseModalProps) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/work');
  };

  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalTopContainer></ModalTopContainer>
        <ModalMiddleContainer>
          <span>일자리가 목록에서 삭제되었어요</span>
          <span className="highlight">
            이선혜님께 맞는 다른 일자리를 찾아볼게요!
            {/*TODO: 이선혜님 -> 유저 이름으로 변경*/}
          </span>
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button variant="blue" height="52px" onClick={handleButtonClick}>
            다른 일자리 보러가기
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

  height: 40px;

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
