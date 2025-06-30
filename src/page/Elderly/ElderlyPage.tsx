import { NavBar } from '@/components/common/NavBar';

import { ElderlyCard } from '@/components/Elderly/ElderlyCard';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ElderlyInfo {
  elderlyId: number;
  name: string;
  age: number;
  gender: string;
  profileImageUrl: string;
  careLevel: string;
  caregiverNum: number;
  isMatching: boolean;
}

const ElderlyPage = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<ElderlyInfo[]>([]);

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/elderly/list`);
      console.log(response.data);
      setDatas(response.data);
    } catch (e) {
      console.log('어르신 목록 get 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('/elderly');
            }}
          >
            어르신 목록
          </NavLeft>
        }
        right={
          <NavRight
            onClick={() => {
              navigate('/elderly/create');
            }}
          >
            등록하기
          </NavRight>
        }
        color=""
      />

      <MainContent>
        <Counting>총 {datas.length}명</Counting>
        {datas.map((data) => (
          <ElderlyCard
            isMatching={data.isMatching}
            name={data.name}
            age={data.age}
            gender={data.gender === 'FEMALE' ? '여' : '남'}
            careLevel={data.careLevel}
            caregiver={data.caregiverNum}
          />
        ))}
      </MainContent>
      <SocialWorkerTabBar />
    </Container>
  );
};

export default ElderlyPage;

const Container = styled.div`
  margin-bottom: 107px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-left: 20px;
`;

const NavRight = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-right: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto 20px;
  margin-top: 16px;
`;

const Counting = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
