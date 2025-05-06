import styled from 'styled-components';
import { ReactComponent as Kakao } from '@/assets/icons/onboarding/Kakao.svg';

export const KakaoButton = () => {
  const handleClick = () => {
    window.location.href =
      'https://blaybus.everdu.com/oauth2/authorization/kakao';
  };

  return (
    <KakaoContainer onClick={handleClick}>
      <Kakao />
      <ButtonText>카카오로 시작하기</ButtonText>
    </KakaoContainer>
  );
};

const KakaoContainer = styled.button`
  display: flex;
  width: 100%;
  height: 52px;

  padding: 17px 16px;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  background: var(--kakao, #fee500);
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ButtonText = styled.span`
  margin: 0 auto;
`;
