import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button/Button';
import { InputBox } from '../common/InputBox/InputBox';
import { CareerDropdown } from './CareerDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Experience {
  workInstitution: string;
  workYear: string;
}

interface CareerExpProps {
  title: string;
}

export const CareerExp = ({ title }: CareerExpProps) => {
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState<Experience[]>([
    { workInstitution: '', workYear: '1년' },
  ]);

  const addExp = () => {
    setExperiences([...experiences, { workInstitution: '', workYear: '1년' }]);
  };

  const deleteExp = () => {
    if (experiences.length > 1) {
      setExperiences(experiences.slice(0, -1));
    }
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience,
    );
    setExperiences(updatedExperiences);
  };

  const handleSelectWorkYear = (index: number, year: string) => {
    handleChange(index, 'workYear', year);
  };
  const dropContents = [
    '1년',
    '2년',
    '3년',
    '4년',
    '5년',
    '6년',
    '7년',
    '8년',
    '9년',
    '10년 이상',
  ];

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const putData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    const data = {
      title: title,
      careerType: '경력',
      introduce: '',
      careerDetails: experiences,
    };
    console.log(data);

    try {
      const response = await axios.put(`${apiBaseURL}/caregiver/career`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log('경력 경력 등록하기 에러: ', e);
    }
  };

  return (
    <Container>
      {experiences.map((experience, index) => (
        <InputWrapper>
          <InputBox
            width=""
            label="근무처"
            labelStar={true}
            state=""
            placeholder="근무처를 입력해주세요"
            guide=""
            value={experience.workInstitution}
            onChange={(e) =>
              handleChange(index, 'workInstitution', e.target.value)
            }
          />

          <InputFieldLabelWrapper>
            <InputFieldLabel color="">근무기간</InputFieldLabel>
            <InputFieldLabel color="blue">*</InputFieldLabel>
          </InputFieldLabelWrapper>
          <CareerDropdown
            title="근무 기간을 선택해주세요"
            contents={dropContents}
            selectedContents={[experience.workYear]}
            setSelectedContents={(value) =>
              handleSelectWorkYear(index, value[0])
            }
          />
        </InputWrapper>
      ))}

      <ButtonWrapper>
        <AddButton onClick={addExp}>추가</AddButton>
        {experiences.length > 1 && (
          <DeleteButton onClick={deleteExp}>삭제</DeleteButton>
        )}
      </ButtonWrapper>

      {experiences.length > 1 ? (
        <>
          <Border />
          <Button
            variant={
              experiences[0].workInstitution === '' ? 'disabled' : 'blue'
            }
            width=""
            height="52px"
            style={{ margin: '20px 0px' }}
            onClick={() => {
              putData();
              navigate('/mypage');
            }}
          >
            경력서 등록하기
          </Button>
        </>
      ) : (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
          }}
        >
          <Border />
          <Button
            variant={
              experiences[0].workInstitution === '' ? 'disabled' : 'blue'
            }
            width=""
            height="52px"
            style={{ marginTop: '20px' }}
            onClick={() => {
              putData();
              navigate('/mypage');
            }}
          >
            경력서 등록하기
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px 20px;
  gap: 8px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  margin-bottom: 16px;
`;

const InputFieldLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  margin-top: 4px;
`;

const InputFieldLabel = styled.div<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  width: 100%;
  height: 52px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subOrange};
  color: ${({ theme }) => theme.colors.negative};
  width: 100%;
  height: 52px;
  cursor: pointer;
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  margin-top: 64px;
`;
