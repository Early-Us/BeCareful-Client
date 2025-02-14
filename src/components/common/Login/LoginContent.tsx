import styled from 'styled-components';
import { InputBox } from '../InputBox/InputBox';
import { Button } from '../Button/Button';

const LoginContent = () => {
  return (
    <LoginContentWrapper>
      <InputWrapper>
        <InputBox
          width=""
          label="휴대폰번호"
          state="default"
          placeholder="휴대폰 번호 입력"
          guide=""
        />
        <InputBox
          width="320px"
          label="비밀번호"
          state="default"
          placeholder="비밀번호 입력"
          guide=""
        />
        {/* <CheckBox
          id="1"
          checked={isChecked}
          onChange={checkBoxClicked}
          borderRadius="4px"
          label="자동로그인"
          select=""
          guide=""
        /> */}
      </InputWrapper>
      <ButtonWrapper>
        <Button variant="blue" width="" height="52px">
          로그인
        </Button>
        <Border />
        <LabelWrapper>
          <LabelFirst>서비스명에 처음 오셨나요?</LabelFirst>
          <LabelJoin href="/join">회원가입 하러가기</LabelJoin>
        </LabelWrapper>
      </ButtonWrapper>
    </LoginContentWrapper>
  );
};

const LoginContentWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const Border = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const LabelFirst = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const LabelJoin = styled.a`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-decoration: none;
  cursor: pointer;
`;

export default LoginContent;
