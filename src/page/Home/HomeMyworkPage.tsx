import { Button } from '@/components/common/Button/Button';
import HomeWorkCard from '@/components/Home/HomeWorkCard';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeJob } from '@/assets/icons/home/HomeJob.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface MyWorkProps {
  id: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: string;
  elderlyProfileImageUrl: string;
  workDays: string[];
  workAddress: string;
  careTypes: string[];
  healthCondition: string;
  institutionName: string;
  note: string;
}

const HomeMyworkPage = () => {
  const navigate = useNavigate();

  const [datas, setDatas] = useState<MyWorkProps[]>([]);

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;

    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(
        `${apiBaseURL}/caregiver/my/completed-matching-list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setDatas(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('홈 나의 일자리 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container data={datas.length > 0}>
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
      {datas.length > 0 ? (
        <JobCardWrapper>
          <CardWrapper>
            {datas.map((data) => (
              <HomeWorkCard
                id={data.id}
                name={data.elderlyName}
                age={data.elderlyAge}
                gender={data.elderlyGender === 'FEMALE' ? '여' : '남'}
                profileImgUrl={data.elderlyProfileImageUrl}
                workDays={
                  data?.careTypes
                    ? data.careTypes.length > 2
                      ? `${data.careTypes[0]}, ${data.careTypes[1]} 외 ${data.careTypes.length - 2}`
                      : data.careTypes.join(', ')
                    : ''
                }
                workAddress={data.workAddress}
                careTypes={data?.workDays
                  .map((day) => {
                    switch (day) {
                      case 'MONDAY':
                        return '월';
                      case 'TUESDAY':
                        return '화';
                      case 'WEDNESDAY':
                        return '수';
                      case 'THURSDAY':
                        return '목';
                      case 'FRIDAY':
                        return '금';
                      case 'SATURDAY':
                        return '토';
                      case 'SUNDAY':
                        return '일';
                      default:
                        return day;
                    }
                  })
                  .join(', ')}
                healthCondition={data.healthCondition}
                institutionName={data.institutionName}
                note={data.note}
              />
            ))}
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

const Container = styled.div<{ data: boolean }>`
  background: ${({ theme, data }) =>
    data ? theme.colors.white : theme.colors.gray50};
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
