import { Button } from '@/components/common/Button/Button';
import HomeWorkCard from '@/components/Home/HomeWorkCard';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeJob } from '@/assets/icons/home/HomeJob.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeMyworkPage = () => {
  const [jobs, setJobs] = useState(true);
  const navigate = useNavigate();

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;

    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(`${apiBaseURL}/caregiver/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setJobs(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('마이페이지 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container jobs={jobs}>
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
        center={<NavCenter>나의 일자리</NavCenter>}
        color="white"
      />
      {jobs ? (
        <JobCardWrapper>
          {/* search */}
          <div>search</div>
          <CardWrapper>
            <HomeWorkCard />
            <HomeWorkCard />
            <HomeWorkCard />
          </CardWrapper>
        </JobCardWrapper>
      ) : (
        <NoJobCardWrapper>
          <NoJobCard>
            <NoJobLabelWrapper>
              <NoJobImg>
                <HomeJob />
              </NoJobImg>
              <NoJobLabel>아직 일자리가 없어요!</NoJobLabel>
              <NoJobDetail>
                일자리 신청서를 등록하고
                <br />
                나에게 딱 맞는 일자리를 신청해보세요!
              </NoJobDetail>
            </NoJobLabelWrapper>
            <Button
              variant="blue2"
              width=""
              height="52px"
              onClick={() => {
                navigate('/mypage');
              }}
            >
              일자리 등록하기
            </Button>
          </NoJobCard>
        </NoJobCardWrapper>
      )}
    </Container>
  );
};

export default HomeMyworkPage;

const Container = styled.div<{ jobs: boolean }>`
  background: ${({ theme, jobs }) =>
    jobs ? theme.colors.white : theme.colors.gray50};
  height: 100vh;
`;

const NavLeft = styled.div`
  width: 28px;
  height: 28px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const JobCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
`;

const CardWrapper = styled.div`
  margin: auto 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const NoJobCardWrapper = styled.div`
  margin: auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoJobCard = styled.div`
  margin-top: 124px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const NoJobLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const NoJobImg = styled.div`
  width: 60px;
  height: 60px;
`;

const NoJobLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-align: center;
`;

const NoJobDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-align: center;
`;
