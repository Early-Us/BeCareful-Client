import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { Button } from '@/components/common/Button/Button';
import styled from 'styled-components';

interface SignUpPhoneVerificationInputProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  authNumber: string;
  setAuthNumber: (value: string) => void;
  remainingTime: number;
  showVerificationInput: boolean;
  onSendAuth: () => void;
  onVerify: () => void;
}

export const SignUpPhoneVerificationInput = ({
  phoneNumber,
  onPhoneChange,
  authNumber,
  setAuthNumber,
  remainingTime,
  showVerificationInput,
  onSendAuth,
  onVerify,
}: SignUpPhoneVerificationInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>휴대전화</span>
        <span className="highlight"> *</span>
      </Label>
      <PhoneWrapper>
        <PlainInputBox
          width="60%"
          state="default"
          placeholder="휴대전화 번호"
          guide=""
          value={phoneNumber}
          onChange={onPhoneChange}
        />
        <Button
          variant="blue2"
          width="40%"
          height="56px"
          style={{ minWidth: '120px', flexShrink: 0 }}
          onClick={onSendAuth}
        >
          {remainingTime === 0 ? '재전송' : '인증번호 전송'}
        </Button>
      </PhoneWrapper>

      {showVerificationInput && (
        <VerifyInputWrapper>
          <PlainInputBox
            width="100%"
            state="default"
            placeholder="인증번호 입력"
            guide=""
            value={authNumber}
            onChange={(e) => setAuthNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onVerify();
            }}
            suffix={
              <span
                style={{
                  position: 'absolute',
                  right: '42px',
                  top: '22px',
                  whiteSpace: 'nowrap',
                  color: 'red',
                  fontSize: '14px',
                }}
              >
                남은시간 {Math.floor(remainingTime / 60)}:
                {(remainingTime % 60).toString().padStart(2, '0')}
              </span>
            }
          />
        </VerifyInputWrapper>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 20px 0px 20px;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const PhoneWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: flex-end;
`;

const VerifyInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  padding: 0px 20px;
`;
