import { TabBar } from '@/components/common/TabBar';
import axios from 'axios';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
// import { ReactComponent as ChatNew } from '@/assets/icons/home/ChatNew.svg';
import { ReactComponent as Person } from '@/assets/icons/home/HomePerson.svg';
import { NavBar } from '@/components/common/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
interface SceheduleData {
  workStartTime: string;
  workEndTime: string;
  seniorName: string;
  seniorGender: string;
  seniorAge: number;
  seniorCareType: string[];
  workLocation: string;
}
interface CaregiverData {
  name: string;
  applicationCount: number;
  recruitmentCount: number;
  workScheduleList: SceheduleData[];
  isWorking: boolean;
}
const HomePage = () => {
  const navigate = useNavigate();

  // 새로운 채팅 존재 여부
  // const [chatNew, setChatNew] = useState(false);
  const [data, setData] = useState<CaregiverData>();
  const [, setApply] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const week = ['', '월', '화', '수', '목', '금', '토', '일'];
    if (today.getMonth() < 9) {
      if (today.getDate() < 10)
        return `${today.getFullYear()}.0${today.getMonth() + 1}.0${today.getDate()} ${week[today.getDay()]}요일`;
      else
        return `${today.getFullYear()}.0${today.getMonth() + 1}.${today.getDate()} ${week[today.getDay()]}요일`;
    } else {
      if (today.getDate() < 10)
        return `${today.getFullYear()}.0${today.getMonth() + 1}.0${today.getDate()} ${week[today.getDay()]}요일`;
      else
        return `${today.getFullYear()}.0${today.getMonth() + 1}.${today.getDate()} ${week[today.getDay()]}요일`;
    }
  };

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;

    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(`${apiBaseURL}/caregiver/home`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('요양보호사 로그인 에러: ', e);
    }

    try {
      const response = await axios.get(`${apiBaseURL}/caregiver/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setApply(response.data.isWorkApplicationActive);
    } catch (e) {
      console.log('요양보호사 로그인 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('/home/caregiver');
            }}
          >
            <Logo />
          </NavLeft>
        }
        // right={<NavRight>{chatNew ? <ChatNew /> : <Chat />}</NavRight>}
        right={
          <NavRight onClick={() => navigate('/chatlist/caregiver')}>
            <Chat />
          </NavRight>
        }
        color="blue"
      />
      <MainWrapper>
        <LabelWrapper>
          {data?.isWorking ? (
            <Name>
              {data?.name}님,
              <br />
              돌봄을 시작하세요!
            </Name>
          ) : (
            <Name>
              {data?.name}님,
              <br />
              오늘의 일정이에요!
            </Name>
          )}
          <DateLabel>{getTodayDate()}</DateLabel>
        </LabelWrapper>
        <PersonWrapper>
          <Person />
        </PersonWrapper>
      </MainWrapper>

      <TabBar />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background: #f2f3f7;
  height: 100vh;
  margin-bottom: 57px;
`;

const NavLeft = styled.div`
  width: 84px;
  height: 32px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  background: ${({ theme }) => theme.colors.mainBlue};
  height: 188px;
`;

const PersonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 51px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const DateLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
