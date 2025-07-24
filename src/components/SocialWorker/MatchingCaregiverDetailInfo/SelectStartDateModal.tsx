import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useState } from 'react';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';

interface SelectStartDateModalProps {
  width: string;
  onClose: () => void;
  onCancel?: () => void;
}

export const SelectStartDateModal = ({
  width,
  onClose,
  onCancel,
}: SelectStartDateModalProps) => {
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);

  const years = Array.from({ length: 5 }, (_, i) => `${2024 + i}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const handleCancel = () => {
    onClose();
    onCancel?.();
  };

  const handleApply = () => {
    onClose();
    onCancel?.();
  };

  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalMiddleContainer>
          <span>근무 시작일 선택</span>
          <DateRow>
            <Dropdown
              title="연도"
              contents={years}
              selectedContents={selectedYear}
              setSelectedContents={setSelectedYear}
            />
            <Dropdown
              title="월"
              contents={months}
              selectedContents={selectedMonth}
              setSelectedContents={setSelectedMonth}
            />
            <Dropdown
              title="일"
              contents={days}
              selectedContents={selectedDay}
              setSelectedContents={setSelectedDay}
            />
          </DateRow>

          <span className="highlight">
            확인 클릭 시 채용 제안이 발송되며,
            <br />
            이때 포인트 300P가 차감됩니다.
          </span>
        </ModalMiddleContainer>

        <ModalBottomContainer>
          <Button variant="blue2" height="52px" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="blue" height="52px" onClick={handleApply}>
            확인
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

const ModalMiddleContainer = styled.div`
  display: flex;
  padding: 28px 20px 8px 20px;
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

const DateRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
