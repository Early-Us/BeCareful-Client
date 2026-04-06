import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { RadioButton } from '@/components/common/Button/RadioButton';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { LEAVE_REASONS } from '@/constants/common/system';
import { UserRole } from '@/types/common';
import { useUserAuthActions } from '@/hooks/MyPage/useUserAuthActions';
import { CaregiverLeaveType } from '@/types/caregiver';
import { SocialworkerLeaveType } from '@/types/socialworker';

interface LeaveReasonProps {
  role: UserRole;
  onCancel: () => void;
}

const LeaveReason = ({ role, onCancel }: LeaveReasonProps) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [detail, setDetail] = useState('');

  const isOther = selectedReason === 'OTHER';
  const isDisabled =
    selectedReason.length === 0 || (isOther && detail.trim().length === 0);

  const {
    handleCaregiverLeave,
    handleSocialworkerLeave,
    isLeaveModalOpen,
    setIsLeaveModalOpen,
  } = useUserAuthActions(role);

  const handleLeave = () => {
    if (isDisabled) return;

    if (role === 'CAREGIVER') {
      handleCaregiverLeave({
        isAgreedToDeleteTerms: true,
        caregiverLeaveType: selectedReason as CaregiverLeaveType,
        detailReason: isOther ? detail.trim() : '',
      });
    } else {
      handleSocialworkerLeave({
        isAgreedToDeleteTerms: true,
        socialWorkerLeaveType: selectedReason as SocialworkerLeaveType,
        detailReason: isOther ? detail.trim() : '',
      });
    }
  };

  return (
    <Container>
      <div className="title">
        정말 탈퇴하시겠습니까? <span>*</span>
      </div>

      <ReasonWrapper>
        {LEAVE_REASONS[role].map((reason) => (
          <RadioButton
            key={reason.value}
            label={reason.label}
            checked={selectedReason === reason.value}
            onClick={() => {
              setSelectedReason(reason.value);
              if (reason.value !== 'OTHER') {
                setDetail('');
              }
            }}
          />
        ))}

        {isOther && (
          <OtherWrapper>
            <Other
              placeholder="상세사유를 작성해 주세요."
              value={detail}
              maxLength={300}
              onChange={(e) => setDetail(e.target.value)}
            />
            <OtherCount>{detail.length}/300</OtherCount>
          </OtherWrapper>
        )}
      </ReasonWrapper>

      <Bottom>
        <Button variant="mainOrange" height="52px" onClick={onCancel}>
          취소하기
        </Button>
        <Button
          disabled={isDisabled}
          variant={isDisabled ? 'gray' : 'gray50'}
          height="52px"
          onClick={handleLeave}
        >
          탈퇴하기
        </Button>
      </Bottom>

      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsLeaveModalOpen(false)}
          title="탈퇴 처리가 완료되었습니다."
          detail="그동안 돌봄다리를 이용해 주셔서 감사합니다."
          handleBtnClick={() => setIsLeaveModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default LeaveReason;

const Container = styled.div`
  .title {
    margin-top: 16px;
    margin-bottom: 32px;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainOrange};
  }
`;

const ReasonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OtherWrapper = styled.div`
  position: relative;
`;

const Other = styled.textarea`
  width: 100%;
  height: 89px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainOrange};
  }
`;

const OtherCount = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;

  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Bottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
