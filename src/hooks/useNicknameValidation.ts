import { useState } from 'react';

export const useNicknameValidation = () => {
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'default' | 'error'>('default');

  const validateFormat = (nickname: string) => {
    const regex = /^[A-Za-z0-9]{6,12}$/;
    return regex.test(nickname);
  };

  const checkNickname = (nickname: string) => {
    if (!validateFormat(nickname)) {
      setMessage('* 닉네임은 영문, 숫자 조합 6~12자여야 합니다.');
      setState('error');
      return false;
    }

    if (nickname === 'dolda1') {
      setMessage('* 이미 존재하는 닉네임입니다.');
      setState('error');
      return false;
    }

    setMessage('');
    setState('default');
    return true;
  };

  const resetMessage = () => {
    setMessage('* 영문, 숫자를 포함한 6~12자로 입력하세요. (특수문자 불가)');
    setState('default');
  };

  return { message, state, checkNickname, resetMessage };
};
