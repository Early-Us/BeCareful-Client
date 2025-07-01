import { Button } from '@/components/common/Button/Button';
import { styled } from 'styled-components';

interface SubmitSectionProps {
  onSubmit: () => void;
}

export function SubmitSection({ onSubmit }: SubmitSectionProps) {
  return (
    <>
      <Border />
      <Button
        variant="blue"
        width="100%"
        height="52px"
        style={{ margin: '20px 0px' }}
        onClick={onSubmit}
      >
        저장하기
      </Button>
    </>
  );
}

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
