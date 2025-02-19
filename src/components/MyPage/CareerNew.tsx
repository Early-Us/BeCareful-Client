import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CareerNewProps {
  edit: boolean;
  title: string;
  introduce?: string;
}

export const CareerNew = ({ edit, title, introduce }: CareerNewProps) => {
  const navigate = useNavigate();

  const [textCount, setTextCount] = useState(0);
  const [memoContent, setMemoContent] = useState('');

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
      careerType: '신입',
      introduce: memoContent,
      careerDetails: [
        {
          workInstitution: '',
          workYear: '0',
        },
      ],
    };
    console.log(data);

    try {
      const response = await axios.put(`${apiBaseURL}/caregiver/career`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (e) {
      console.log('신입 경력 등록하기 에러: ', e);
    }
  };

  useEffect(() => {
    if (introduce) {
      setMemoContent(introduce);
      setTextCount(introduce.length);
    }
  }, [introduce]);

  return (
    <Container>
      <InputWrapper>
        <InputFieldLabel htmlFor="memo">자기소개</InputFieldLabel>
        <MemoFieldWrapper>
          <MemoField
            id="memo"
            placeholder="나의 강점을 자유롭게 설명해주세요."
            value={memoContent}
            maxLength={200}
            onChange={(e) => {
              setTextCount(e.target.value.length);
              setMemoContent(e.target.value);
            }}
          />
          <MemoCount>{textCount}/200</MemoCount>
        </MemoFieldWrapper>
      </InputWrapper>
      <Border />
      <ButtonWrapper>
        <Button
          variant={memoContent ? 'blue' : 'disabled'}
          width=""
          height="52px"
          onClick={() => {
            putData();
            navigate('/mypage');
          }}
          disabled={memoContent ? false : true}
        >
          {edit ? '경력서 수정하기' : '경력서 등록하기'}
        </Button>
      </ButtonWrapper>
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
`;

const InputFieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const MemoFieldWrapper = styled.div`
  position: relative;
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const MemoCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  right: 16px;
  bottom: 16px;
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  position: absolute;
  bottom: 92px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  left: 20px;
`;
