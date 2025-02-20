import { Button } from '@/components/common/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  matchingId: string;
  date: string;
}

export const ChatButton = ({ matchingId, date }: ChatButtonProps) => {
  const navigate = useNavigate();

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const postHire = async () => {
    let accessToken;

    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.post(
        `${apiBaseURL}/socialworker/matching/hire/${matchingId}?workStartDate=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
      navigate('/chatList');
    } catch (e) {
      console.log('채팅방 생성(채용하기) 에러: ', e);
    }
  };

  return (
    <Button onClick={postHire} height={'52px'}>
      채용하기
    </Button>
  );
};

export default ChatButton;
