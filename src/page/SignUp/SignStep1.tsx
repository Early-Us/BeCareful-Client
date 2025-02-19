import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { Button } from '@/components/common/Button/Button';
import { useState, useEffect } from 'react';
import { SecretInputBox } from '@/components/common/InputBox/SecretInputBox';
import {
  handleSendAuthNumber,
  handleVerifyAuthNumber,
} from '@/page/SignUp/Step1Function';
import { useNavigate } from 'react-router-dom';

export const Step1 = ({ formData, setFormData, onNext }: StepProps) => {
  const [authNumber, setAuthNumber] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [, setAuthSent] = useState(false);
  const [genderInput, setGenderInput] = useState('');
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [, setAuthButtonText] = useState('인증번호 전송');

  useEffect(() => {
    if (remainingTime === 0) {
      setAuthButtonText('재전송');
    }
  }, [remainingTime]);
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[0-9]{0,1}$/.test(value)) {
      setGenderInput(value);
      if (value === '1' || value === '3') {
        setFormData({ ...formData, gender: 'MALE' });
      } else if (value === '2' || value === '4') {
        setFormData({ ...formData, gender: 'FEMALE' });
      }
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      alert('인증번호 유효 시간이 초과되었습니다.');
    }
  }, [remainingTime]);

  const navigate = useNavigate();

  return (
    <StepWrapper>
      <IconContainer onClick={() => navigate('/signup')}>
        <IconArrowLeft />
      </IconContainer>

      <Header>기본 정보를 입력하세요</Header>
      <InputWrapper>
        <div>
          <span>이름</span>
          <span className="highlight"> *</span>
        </div>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="이름"
          guide=""
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </InputWrapper>
      <InputWrapper>
        <div>
          <span>주민등록번호</span>
          <span className="highlight"> *</span>
        </div>
        <ResidentWrapper>
          <PlainInputBox
            width="45%"
            state="default"
            placeholder="주민등록번호"
            guide=""
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          />
          -
          <SecretInputBox
            width="25%"
            state="default"
            placeholder=""
            guide=""
            value={genderInput}
            masked={true}
            onChange={handleGenderChange}
          />
          <CircleWrapper>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} />
            ))}
          </CircleWrapper>
        </ResidentWrapper>
      </InputWrapper>
      <InputWrapper>
        <div>
          <span>휴대전화</span>
          <span className="highlight"> *</span>
        </div>
        <PassWordWrapper>
          <PlainInputBox
            width="60%"
            state="default"
            placeholder="휴대전화 번호"
            guide=""
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <Button
            variant="blue2"
            width="40%"
            height="56px"
            style={{
              minWidth: '120px',
              flexShrink: 0,
            }}
            onClick={() =>
              handleSendAuthNumber(
                formData.phoneNumber,
                setShowVerificationInput,
                setAuthSent,
                setRemainingTime,
                setAuthButtonText,
                apiUrl,
              )
            }
          >
            인증번호 전송
          </Button>
        </PassWordWrapper>
      </InputWrapper>
      {showVerificationInput && (
        <ResidentWrapper>
          <InputInner>
            <PlainInputBox
              width="100%"
              state="default"
              placeholder="인증번호 입력"
              guide=""
              value={authNumber}
              onChange={(e) => setAuthNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleVerifyAuthNumber(
                    formData.phoneNumber,
                    authNumber,
                    apiUrl,
                    onNext,
                  );
                }
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
          </InputInner>
        </ResidentWrapper>
      )}
      <ButtonContainer>
        <Button
          variant="blue"
          height="52px"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (onNext) onNext();
          }}
        >
          다음 단계로 이동
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;
  align-items: flex-start;
  padding: 16px 20px 0px 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 20px 0px 20px;

  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const PassWordWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: flex-end;
`;

const ResidentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-sizing: border-box;
  width: 100%;
`;

const InputInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 12px;
  padding: 0px 20px;
`;

const CircleWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  gap: 4px;
  & > div {
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.gray600};
    border-radius: 50%;
  }
  width: 50%;
  justify-content: space-between;
  align-items: center;
`;
