import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';

interface LeaveConsentProps {
  onCancel: () => void;
  onNext: () => void;
}

const LeaveConsent = ({ onCancel, onNext }: LeaveConsentProps) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Container>
      <Text>
        <div className="title">
          정말 탈퇴하시겠습니까? <span>*</span>
        </div>
        <div className="guide">
          탈퇴 시 개인 식별 정보는 즉시 삭제되나,
          <br />
          법적 증빙(계약서 등)과 매칭 기록을 위한 데이터는
          <br />
          '탈퇴한 사용자'로 익명화되어 보관됩니다.
        </div>
      </Text>

      <Bottom>
        <CheckBox
          id="leave"
          checked={isAgreed}
          onChange={(val) => setIsAgreed(val)}
          label=""
          select="동의"
          guide="개인정보 즉시 삭제 및 게시글 익명화 유지"
          borderRadius=""
          checkColor="orange"
        />

        <ButtonWrapper>
          <Button variant="mainOrange" height="52px" onClick={onCancel}>
            취소하기
          </Button>
          <Button
            disabled={!isAgreed}
            variant={isAgreed ? 'gray50' : 'gray'}
            height="52px"
            onClick={onNext}
          >
            탈퇴하기
          </Button>
        </ButtonWrapper>
      </Bottom>
    </Container>
  );
};

export default LeaveConsent;

const Container = styled.div``;

const Text = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainOrange};
  }

  .guide {
    color: ${({ theme }) => theme.colors.mainOrange};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Bottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
