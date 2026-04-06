import { styled } from 'styled-components';
import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { ReactComponent as LogoBlue } from '@/assets/icons/LogoBlue.svg';
import InputBox from '@/components/common/InputBox/InputBox';
import { ReactComponent as CheckBox } from '@/assets/icons/SquareCheck.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { KakaoButton } from '@/components/common/Button/KakaoButton';
import { useIsIOS } from '@/hooks/useIsIOS';
import { usePhoneLogin } from '@/api/auth';
import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { formatPhoneNumber } from '@/utils/format/text';

const AUTO_LOGIN_STORAGE_KEY = 'autoLoginCredentials';

interface AutoLoginCredentials {
  phoneNumber: string;
  password: string;
}

const LoginPage = () => {
  const [autoLogin, setAutoLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isIOS = useIsIOS();
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);
  const { mutate: loginByPhone, isPending } = usePhoneLogin();

  const handleToggleAutoLogin = () => {
    setAutoLogin((prev) => !prev);
  };

  const normalizePhoneNumber = (value: string) => value.replace(/[^0-9]/g, '');

  const isFormValid =
    normalizePhoneNumber(phoneNumber).length >= 10 && password.length > 0;

  const requestLogin = (
    inputPhoneNumber: string,
    inputPassword: string,
    fromAutoLogin = false,
  ) => {
    const normalizedPhoneNumber = normalizePhoneNumber(inputPhoneNumber);

    if (normalizedPhoneNumber.length < 10 || !inputPassword) {
      alert('휴대전화 번호와 비밀번호를 입력해주세요.');
      return;
    }

    loginByPhone(
      {
        phoneNumber: formatPhoneNumber(normalizedPhoneNumber),
        password: inputPassword,
      },
      {
        onSuccess: (data) => {
          setCurrentUserInfo({
            realName: data.realName,
            nickName: data.nickName,
          });

          if (data.userType === 'CAREGIVER') {
            navigate('/caregiver');
            return;
          }

          navigate('/socialworker');
        },
        onError: () => {
          if (fromAutoLogin) {
            localStorage.removeItem(AUTO_LOGIN_STORAGE_KEY);
            setAutoLogin(false);
          }
          alert('로그인에 실패했습니다. 전화번호와 비밀번호를 확인해주세요.');
        },
      },
    );
  };

  const handleSubmitLogin = () => {
    requestLogin(phoneNumber, password);
  };

  useEffect(() => {
    const raw = localStorage.getItem(AUTO_LOGIN_STORAGE_KEY);
    if (!raw) return;

    try {
      const saved: AutoLoginCredentials = JSON.parse(raw);
      if (!saved.phoneNumber || !saved.password) {
        localStorage.removeItem(AUTO_LOGIN_STORAGE_KEY);
        return;
      }

      setAutoLogin(true);
      setPhoneNumber(formatPhoneNumber(saved.phoneNumber));
      setPassword(saved.password);
      requestLogin(saved.phoneNumber, saved.password, true);
    } catch {
      localStorage.removeItem(AUTO_LOGIN_STORAGE_KEY);
    }
    // 최초 진입 시 자동 로그인 복원만 수행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterToSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isFormValid && !isPending) {
      handleSubmitLogin();
    }
  };

  return (
    <>
      <IconContainer onClick={() => navigate(-1)}>
        <IconClose />
      </IconContainer>
      <LoginContainer>
        <InputForm>
          <LogoContainer>
            <StyledLogoBlue />
          </LogoContainer>
          <InputBox
            placeholder="예) 010-1234-5678"
            title={'휴대전화 번호'}
            titleVariant="small"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            inputMode="tel"
            maxLength={13}
            onKeyDown={handleEnterToSubmit}
          />
          <InputBox
            placeholder="비밀번호 입력"
            width="240px"
            type="password"
            title={'비밀번호'}
            titleVariant="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleEnterToSubmit}
          />
          <AutoLogin onClick={handleToggleAutoLogin} checked={autoLogin}>
            <CheckBox />
            자동로그인
          </AutoLogin>
        </InputForm>
        <SubmitContainer>
          <Button
            variant={isFormValid ? 'blue' : 'gray'}
            height="52px"
            onClick={handleSubmitLogin}
            disabled={!isFormValid || isPending}
          >
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
          {!isIOS && <KakaoButton />}
        </SubmitContainer>
        <Gap />
        <Description>
          돌봄다리에 처음 오셨나요?
          <div
            className="gotosignup"
            onClick={() => navigate('/signup/common')}
          >
            회원가입
          </div>
        </Description>
      </LoginContainer>
    </>
  );
};

export default LoginPage;

const IconContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
`;

const StyledLogoBlue = styled(LogoBlue)`
  transform: scale(0.79);
  height: 48px;
  display: block;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const AutoLogin = styled.div<{ checked: boolean }>`
  display: flex;
  gap: 8px;

  svg {
    color: ${({ theme, checked }) =>
      checked ? theme.colors.mainBlue : theme.colors.gray300};
  }

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 24px 0px;
  width: 100%;
  box-sizing: border-box;
`;

const Gap = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const Description = styled.div`
  display: flex;
  padding-top: 24px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};

  .gotosignup {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

    margin-left: 4px;
    cursor: pointer;
    text-decoration: underline;
  }
`;
