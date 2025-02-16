import styled from 'styled-components';
import { Button } from '../common/Button/Button';
import { useState } from 'react';

const HomeWorkCard = () => {
  const [textCount, setTextCount] = useState(0);
  const [memoContent, setMemoContent] = useState('');

  return (
    <CardContainer>
      <PersonWrapper>
        <InfoWrapper>
          <NameWrapper>
            <Name>김옥자</Name>
            <AgeGenderWrapper>
              <Detail>65세</Detail>
              <Border />
              <Detail>여</Detail>
            </AgeGenderWrapper>
          </NameWrapper>
          <LabelWrapper>
            <Label>
              <LabelTitle>근무시간</LabelTitle>
              <LabelDetail>목,일</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>근무장소</LabelTitle>
              <LabelDetail>감길동</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>케어항목</LabelTitle>
              <LabelDetail>이동보조, 식사보조</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>건강상태</LabelTitle>
              <LabelDetail>당뇨, 신장질환</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>기관이름</LabelTitle>
              <LabelDetail>사랑행복주간보호센터</LabelDetail>
            </Label>
          </LabelWrapper>
        </InfoWrapper>
        <PersonImg />
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
          variant="blue2"
          width=""
          height="36px"
          onClick={() => {
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

  border: 1px solid;
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
