import { Button } from '@/components/common/Button/Button';
import { styled } from 'styled-components';

export const WorkBottomButton = () => {
  return (
    <ButtonContainer>
      <Button variant="white" height="52px">
        거절하기
      </Button>

      <Button variant="blue" height="52px">
        지원하기
      </Button>
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
