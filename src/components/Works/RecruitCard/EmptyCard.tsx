import { styled } from 'styled-components';
import { ReactComponent as EmptyState } from '@/assets/icons/works/EmptyState.svg';

export const EmptyCard = () => {
  return (
    <EmptyCardContainer>
      <EmptyState />
      <span className="highlight">잠시만 기다려주세요.</span>
      <span>
        등록한 일자리 신청서로
        <br /> 딱 맞는 공고를 찾고 있어요.
      </span>
    </EmptyCardContainer>
  );
};

const EmptyCardContainer = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.gray900};
  }
  text-align: center;
`;
