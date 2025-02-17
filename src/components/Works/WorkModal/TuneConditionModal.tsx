import { styled } from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { Button } from '@/components/common/Button/Button';
import { useState } from 'react';

interface TuneConditionModalProps {
  width: string;
  onClose: () => void;
  onApply: () => void;
}

export const TuneConditionModal = ({
  width,
  onClose,
  onApply,
}: TuneConditionModalProps) => {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');

  const handleTagClick = (tag: string) => {
    setSelectedTag((prevTag) => {
      if (prevTag.includes(tag)) {
        return prevTag.filter((t) => t !== tag);
      } else {
        return [...prevTag, tag];
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Overlay>
      <ModalContent width={width}>
        <ModalTopContainer>
          <ModalTopHeader>
            근무조건 조율하기
            <ModalCloseButton onClick={onClose}>
              <ModalClose />
            </ModalCloseButton>
          </ModalTopHeader>
          <ModalTopText>
            조율이 필요한 부분을 선택 후 <br />
            내용을 자세히 입력해 주세요.
          </ModalTopText>
        </ModalTopContainer>
        <ModalMiddleContainer>
          <TagContainer>
            {['시간 조율', '급여 조율', '근무일 조율'].map((tag) => (
              <Tag
                key={tag}
                isSelected={selectedTag.includes(tag)}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </TagContainer>
          <ModalInput
            value={inputText}
            onChange={handleInputChange}
            placeholder="ex) 근무시간을 몇 시로 조율하고싶어요, 요일을 월요일로 바꾸고 싶어요."
          />
        </ModalMiddleContainer>
        <ModalBottomContainer>
          <Button
            variant={inputText.trim() ? 'blue' : 'disabled'}
            height="52px"
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            조율하여 지원하기
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
  padding: 28px 20px 16px 20px;
  gap: 8px;
  flex-direction: column;
`;

const ModalTopHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ModalTopText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
`;

const ModalMiddleContainer = styled.div`
  display: flex;
  padding: 0px 20px 8px 20px;
  flex-direction: column;
  gap: 12px;
`;

const ModalBottomContainer = styled.div`
  display: flex;
  padding: 16px 20px 20px 20px;
  justify-content: center;
  align-items: center;
`;

const ModalCloseButton = styled.div`
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
`;

const Tag = styled.div<{ isSelected: boolean }>`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.colors.mainBlue : theme.colors.gray100};

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.mainBlue : theme.colors.gray900};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.subBlue : theme.colors.white};
`;

const ModalInput = styled.textarea`
  display: flex;
  height: 140px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
