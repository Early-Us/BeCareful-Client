import styled from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import React from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
  detail: string;
  left?: string;
  right: string;
  handleLeftBtnClick: () => void;
  handleRightBtnClick: () => void;
}

const ModalButtons = ({
  onClose,
  title,
  detail,
  left,
  right,
  handleLeftBtnClick,
  handleRightBtnClick,
}: ModalProps) => {
  return (
    <ModalWrapper>
      <ModalXImg onClick={onClose}>
        <ModalClose />
      </ModalXImg>
      <ModalLabelWrapper>
        <ModalTitleLabel>
          {title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </ModalTitleLabel>
        <ModalDetailLabel>
          {detail.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </ModalDetailLabel>
      </ModalLabelWrapper>
      <ModalButtonWrapper single={!left}>
        {left && <Left onClick={handleLeftBtnClick}>{left}</Left>}
        <Right single={!left} onClick={handleRightBtnClick}>
          {right}
        </Right>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default ModalButtons;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;
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
const ModalButtonWrapper = styled.div<{ single?: boolean }>`
  width: 100%;
  display: flex;
  gap: ${({ single }) => (single ? 0 : '8px')};
`;

const Left = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const Right = styled.button<{ single?: boolean }>`
  width: ${({ single }) => (single ? '100%' : '100%')};
  height: 52px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;
