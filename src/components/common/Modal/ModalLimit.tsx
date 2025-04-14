import styled from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import React from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
  detail: string;
}

const ModalLimit = ({ onClose, title, detail }: ModalProps) => {
  return (
    <ModalWrapper>
      <ModalXImg onClick={onClose}>
        <ModalClose />
      </ModalXImg>
      <ModalLabelWrapper>
        <ModalTitleLabel>{title}</ModalTitleLabel>
        <ModalDetailLabel>
          {detail.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </ModalDetailLabel>
      </ModalLabelWrapper>
      <button
        onClick={() => {
          onClose();
        }}
      >
        확인
      </button>
    </ModalWrapper>
  );
};

export default ModalLimit;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;

  button {
    height: 52px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    text-align: center;
  }
`;

const ModalXImg = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ModalDetailLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;
  text-align: center;
`;
