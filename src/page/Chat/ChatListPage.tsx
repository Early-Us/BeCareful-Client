import { NavBar } from '@/components/common/NavBar/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';

interface ChatListProps {
  matchingId: number;
  imageUrl: string;
  caregiverName: string;
  recentChat: string;
  time: string;
  elderlyName: string;
  elderlyAge: number;
  gender: string;
}

const ChatListPage = () => {
  const navigate = useNavigate();

  const [chatList, setChatList] = useState<ChatListProps[]>([]);

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getChat = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    if (localStorage.getItem('role') === 'socialworker') {
      try {
        const response = await axios.get(
          `${apiBaseURL}/socialworker/chat/list`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(response.data.chatroomInfoList);
        setChatList(response.data.chatroomInfoList);
      } catch (e) {
        console.log('사회복지사 채팅방 리스트 get 에러: ', e);
      }
    } else {
      try {
        const response = await axios.get(`${apiBaseURL}/caregiver/chat/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data.chatroomInfoList);
        setChatList(response.data.chatroomInfoList);
      } catch (e) {
        console.log('요양보호사 채팅방 리스트 get 에러: ', e);
      }
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>채팅 목록</NavCenter>}
        color="white"
      />
      {chatList.length > 0 &&
        chatList.map((chat) => (
          <ChatListWrapper
            onClick={() => navigate(`/chatroom/${chat.matchingId}`)}
            key={chat.matchingId}
          >
            <ChatList>
              <ProfileImg src={chat.imageUrl} />
              <ChatInfo>
                <Name>{chat.caregiverName} 요양보호사</Name>
                <ChatRecent>{chat.recentChat}</ChatRecent>
                <Person>
                  <Label>{chat.elderlyName}</Label>
                  <Border />
                  <Label>{chat.elderlyAge}</Label>
                  <Border />
                  <Label>{chat.gender === 'FEMALE' ? '여' : '남'}</Label>
                </Person>
              </ChatInfo>
            </ChatList>
            <Label>{chat.time}</Label>
          </ChatListWrapper>
        ))}
    </Container>
  );
};

export default ChatListPage;

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ChatListWrapper = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const ChatList = styled.div`
  display: flex;
  gap: 8px;
`;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ChatRecent = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Person = styled.label`
  display: flex;
  gap: 4px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;
