import { ReactNode } from 'react';
import styled from 'styled-components';

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
  title: string;
  titleStar: boolean;
}

const BottomSheet = ({
  isOpen,
  setIsOpen,
  children,
  title,
  titleStar,
}: BottomSheetProps) => {
  return (
    <>
      {isOpen && <SheetBackground onClick={() => setIsOpen(false)} />}
      <SheetContainer isOpen={isOpen}>
        <div className="title">
          {title}
          {titleStar && <span> *</span>}
        </div>
        {children}
      </SheetContainer>
    </>
  );
};

export default BottomSheet;

const SheetBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
`;

const SheetContainer = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 342px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  padding-top: 60px;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  gap: 8px;
  flex-direction: column;
  margin-bottom: -24px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 140%;
    padding-bottom: 12px;
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 140%;
  }
`;
