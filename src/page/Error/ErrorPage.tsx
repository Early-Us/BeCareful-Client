import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Title>문제가 발생했어요</Title>
      <Description>잠시 후 다시 시도해주세요.</Description>
      <Button
        variant="blue"
        width="300px"
        height="48px"
        onClick={() => navigate(-1)}
      >
        이전 화면으로 이동
      </Button>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 24px;
`;
