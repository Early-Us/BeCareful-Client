import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SocialStepProps } from '@/type/SocialSignUp';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { SecretInputBox } from '@/components/common/InputBox/SecretInputBox';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';
import { useNavigate } from 'react-router-dom';

export const SocialStep1 = ({
  formSocialData,
  setFormSocialData,
  onNext,
}: SocialStepProps) => {
  const [genderInput, setGenderInput] = useState('');
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const {
    authNumber,
    setAuthNumber,
    remainingTime,
    showVerificationInput,
    sendAuthNumber,
    verifyAuthNumber,
  } = usePhoneVerification(apiUrl);

  useEffect(() => {
    if (remainingTime === 0) {
      alert('인증번호 유효 시간이 초과되었습니다.');
    }
  }, [remainingTime]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]{0,1}$/.test(value)) {
      setGenderInput(value);
      if (value === '1' || value === '3') {
        setFormSocialData({ ...formSocialData, gender: 'MALE' });
      } else if (value === '2' || value === '4') {
        setFormSocialData({ ...formSocialData, gender: 'FEMALE' });
      }
    }
  };

  return (
    <StepWrapper>
      <IconContainer onClick={() => navigate('/signup')}>
        <IconArrowLeft />
      </IconContainer>

      <Header>기본 정보를 입력하세요</Header>

      <NameContainer>
        <div className="name">
          <span>이름</span>
          <span className="highlight">*</span>
        </div>
        <PlainInputBox
          state="default"
          placeholder="이름"
          guide=""
          width="100%"
          value={formSocialData.name}
          onChange={(e) =>
            setFormSocialData({ ...formSocialData, name: e.target.value })
          }
        />
      </NameContainer>

      <NameContainer>
        <div className="name">
          <span>주민등록번호</span>
          <span className="highlight">*</span>
        </div>
        <ResidentInputContainer>
          <PlainInputBox
            state="default"
            placeholder="주민등록번호"
            guide=""
            width="45%"
            value={formSocialData.birthDate}
            onChange={(e) =>
              setFormSocialData({
                ...formSocialData,
                birthDate: e.target.value,
              })
            }
          />
          <span>-</span>
          <SecretInputBox
            state="default"
            placeholder=" "
            guide=""
            width="25%"
            value={genderInput}
            masked={true}
            onChange={handleGenderChange}
          />
          <CircleWrapper>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} />
            ))}
          </CircleWrapper>
        </ResidentInputContainer>
      </NameContainer>

      <NameContainer>
        <div className="name">
          <span>휴대전화</span>
          <span className="highlight">*</span>
        </div>
        <ResidentWrapper>
          <PlainInputBox
            width="60%"
            state="default"
            placeholder="휴대전화 번호"
            guide=""
            value={formSocialData.phoneNumber}
            onChange={(e) =>
              setFormSocialData({
                ...formSocialData,
                phoneNumber: e.target.value,
              })
            }
          />
          <Button
            variant="blue2"
            width="40%"
            height="54px"
            style={{ minWidth: '120px', flexShrink: 0 }}
            onClick={() => sendAuthNumber(formSocialData.phoneNumber)}
          >
            {remainingTime === 0 ? '재전송' : '인증번호 전송'}
          </Button>
        </ResidentWrapper>
      </NameContainer>

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
                  verifyAuthNumber(formSocialData.phoneNumber, onNext);
                }
              }}
              suffix={
                <span
                  style={{
                    position: 'absolute',
                    right: '42px',
                    top: '24px',
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
            console.log('현재 입력된 formSocialData:', formSocialData);
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
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 24px 16px auto 16px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 20px 0px 20px;
  align-items: flex-start;
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const NameContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;

  align-items: flex-start;
  flex-direction: column;

  gap: 8px;

  font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .name {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
`;

const ResidentInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
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
  width: 30%;
  justify-content: space-between;
  align-items: center;
`;

const ResidentWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  flex-grow: 1;
`;

const InputInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 12px;
  padding: 0px 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  margin-top: 185px;
`;
