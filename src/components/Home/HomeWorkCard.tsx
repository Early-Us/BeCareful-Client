import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

interface WorkCardProps {
  id: number;
  name: string;
  age: number;
  gender: string;
  profileImgUrl: string;
  workDays: string;
  workAddress: string;
  careTypes: string;
  healthCondition: string;
  institutionName: string;
  note: string;
}

const HomeWorkCard = ({
  id,
  name,
  age,
  gender,
  profileImgUrl,
  workDays,
  workAddress,
  careTypes,
  healthCondition,
  institutionName,
  note,
}: WorkCardProps) => {
  const [textCount, setTextCount] = useState(0);
  const [memoContent, setMemoContent] = useState(note);

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const putData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.put(
        `${apiBaseURL}/caregiver/my/completed-matching-list/${id}`,
        {
          note: memoContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
    } catch (e) {
      console.log('홈 나의 일자리 메모 저장 에러: ', e);
    }
  };

  return (
    <CardContainer>
      <PersonWrapper>
        <InfoWrapper>
          <NameWrapper>
            <Name>{name}</Name>
            <AgeGenderWrapper>
              <Detail>{age}세</Detail>
              <Border />
              <Detail>{gender}</Detail>
            </AgeGenderWrapper>
          </NameWrapper>
          <LabelWrapper>
            <Label>
              <LabelTitle>근무시간</LabelTitle>
              <LabelDetail>{workDays}</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>근무장소</LabelTitle>
              <LabelDetail>{workAddress}</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>케어항목</LabelTitle>
              <LabelDetail>{careTypes}</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>건강상태</LabelTitle>
              <LabelDetail>{healthCondition}</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>기관이름</LabelTitle>
              <LabelDetail>{institutionName}</LabelDetail>
            </Label>
          </LabelWrapper>
        </InfoWrapper>
        <PersonImg src={profileImgUrl} />
      </PersonWrapper>
      <MemoWrapper>
        <MemoLabel htmlFor="memo">메모</MemoLabel>
        <MemoFieldWrapper>
          <MemoField
            id="memo"
            typeof="text"
            placeholder="메모를 입력해 주세요"
            maxLength={200}
            onChange={(e) => {
              setTextCount(e.target.value.length);
              setMemoContent(e.target.value);
            }}
          />
          <MemoCount>{textCount}/200</MemoCount>
        </MemoFieldWrapper>
        <Button
          onClick={() => {
            putData();
            console.log(memoContent);
          }}
        >
          메모 저장
        </Button>
      </MemoWrapper>
    </CardContainer>
  );
};

export default HomeWorkCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  //   align-items: center;
  padding: 24px 20px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: auto;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LabelTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PersonImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
`;

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemoLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MemoFieldWrapper = styled.div`
  position: relative;
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 90px;
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

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  height: 36px;
  border-radius: 12px;
  line-height: 1.4;
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
