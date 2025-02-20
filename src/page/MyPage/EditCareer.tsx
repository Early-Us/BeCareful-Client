import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/common/NavBar';
import { Tab } from '@/components/common/Tab/Tab';
import { CareerNew } from '@/components/MyPage/CareerNew';
import { CareerExp } from '@/components/MyPage/CareerExp';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditCareer = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [careerDetails, setCareerDetails] = useState([]);

  const tabData = [
    {
      name: '신입',
      content: <CareerNew edit={true} title={title} introduce={introduce} />,
    },
    {
      name: '경력',
      content: (
        <CareerExp edit={true} title={title} careerDetails={careerDetails} />
      ),
    },
  ];

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(`${apiBaseURL}/caregiver/career`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setTitle(response.data.title);
      setIntroduce(response.data.introduce);
      setCareerDetails(response.data.careerDetails);
    } catch (e) {
      console.log('경력서 수정하기 에러: ', e);
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
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>경력서 수정</NavCenter>}
        color="white"
      />

      <InputWrapper>
        <InputFieldLabelWrapper>
          <InputFieldLabel color="">경력서 제목</InputFieldLabel>
          <InputFieldLabel color="blue">*</InputFieldLabel>
        </InputFieldLabelWrapper>
        <InputDefault
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </InputWrapper>

      <TabWrapper>
        <Tab tabs={tabData} />
      </TabWrapper>
    </Container>
  );
};

export default EditCareer;

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
`;

const InputFieldLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const InputFieldLabel = styled.div<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const InputDefault = styled.textarea`
  height: 22px;
  padding: 15px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  resize: none;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;
