import styled from 'styled-components';
import { InputBox } from '../common/InputBox/InputBox';
import { Button } from '../common/Button/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../common/CheckBox/CheckBox';

const SocialworkerLogin = () => {
  const navigate = useNavigate();

  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');

  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);
  const checkBoxClicked = (check: boolean) => {
    setIsAutoLoginChecked(check);
  };

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const loginButtonClicked = async () => {
    try {
      const response = await axios.post(
        `${apiBaseURL}/auth/socialworker/login`,
        {
          phoneNumber: phoneNum,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      const token = response.data.accessToken;
      if (isAutoLoginChecked) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('isAutoLogin', 'true');
      } else {
        sessionStorage.setItem('accessToken', token);
        localStorage.removeItem('isAutoLogin');
      }
      localStorage.setItem('role', 'socialworker');

      navigate('/home/social');
    } catch (e) {
      console.log('사회복지사 로그인 에러: ', e);
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <LoginContentWrapper>
      <InputWrapper>
        <InputBox
          type="tel"
          maxLength={11}
          width=""
          labelStar={true}
          label="휴대폰번호"
          state="default"
          placeholder="휴대폰 번호 입력"
          guide=""
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
        />
        <InputBox
          type="password"
          minLength={8}
          width=""
          labelStar={true}
          label="비밀번호"
          state="default"
          placeholder="비밀번호 입력"
          guide=""
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <CheckBox
          id="1"
          checked={isAutoLoginChecked}
          onChange={checkBoxClicked}
          borderRadius="4px"
          label="자동로그인"
          select=""
          guide=""
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button
          variant={
            phoneNum.length >= 11 && password.length >= 8 ? 'blue' : 'disabled'
          }
          width=""
          height="52px"
          onClick={
            phoneNum.length >= 11 && password.length >= 8
              ? loginButtonClicked
              : undefined
          }
        >
          로그인
        </Button>
        <Border />
        <LabelWrapper>
          <LabelFirst>서비스명에 처음 오셨나요?</LabelFirst>
          <LabelJoin href="/signup">회원가입 하러가기</LabelJoin>
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

export default SocialworkerLogin;
