import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { ReactComponent as ResidentCircle } from '@/assets/icons/signup/ResidentCircle.svg';
import { Button } from '@/components/common/Button/Button';
import { useState } from 'react';
import { SecretInputBox } from '@/components/common/InputBox/SecretInputBox';

export const Step1 = ({ formData, setFormData, onNext }: StepProps) => {
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  return (
    <StepWrapper>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      <Header>기본 정보를 입력하세요</Header>
      <InputWrapper>
        <div>
          <span>이름</span>
          <span className="highlight"> *</span>
        </div>
        <PlainInputBox
          width=""
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
            width="148px"
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
            width="52px"
            state="default"
            placeholder=""
            guide=""
            value={formData.gender}
            masked={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value as 'MALE' | 'FEMALE',
              })
            }
          />
          <IconWrapper>
            <ResidentCircle />
          </IconWrapper>
        </ResidentWrapper>
      </InputWrapper>
      <InputWrapper>
        <div>
          <span>휴대전화</span>
          <span className="highlight"> *</span>
        </div>
        <ResidentWrapper>
          <PlainInputBox
            width="192px"
            state="default"
            placeholder="주민등록번호"
            guide=""
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <Button
            variant="blue2"
            width="120px"
            height="52px"
            onClick={() => setShowVerificationInput(true)}
          >
            인증번호 전송
          </Button>
        </ResidentWrapper>
      </InputWrapper>
      {showVerificationInput && (
        <ResidentWrapper>
          <PlainInputBox
            width="320px"
            state="default"
            placeholder="인증번호 입력"
            guide=""
          />
        </ResidentWrapper>
      )}
      <ButtonContainer showVerificationInput={showVerificationInput}>
        <Button
          variant="blue"
          width="320px"
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
  justify-content: center;
  align-items: center;
  width: 360px;
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
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

const ResidentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonContainer = styled.div<{ showVerificationInput: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ showVerificationInput }) =>
    showVerificationInput ? '111px 0 20px 0' : '185px 0 20px 0'};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
