import { putMemo } from '@/api/caregiver';
import {
  CareTypeFormat,
  DayFormat,
  GenderMapping,
} from '@/constants/caregiver';
import {
  CaregiverCompletedMatching,
  MemoEditRequest,
} from '@/types/Caregiver/home';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

interface CaregiverMyworkCardProps {
  workInfo: CaregiverCompletedMatching;
}

const CaregiverMyworkCard = ({ workInfo }: CaregiverMyworkCardProps) => {
  const [textCount, setTextCount] = useState(workInfo.note.length);
  const [memo, setMemo] = useState(workInfo.note);
  const [isMemoChange, setIsMemoChange] = useState(false);

  const queryClient = useQueryClient();
  const usePutMemoMutation = useMutation({
    mutationFn: (note: MemoEditRequest) => putMemo(workInfo.id, note),
    onSuccess: () => {
      console.log('나의 일자리: 메모 수정 성공');
      setIsMemoChange(false);
      queryClient.invalidateQueries({
        queryKey: ['note', workInfo.id],
      });
    },
    onError: (error) => {
      console.log('나의 일자리: 메모 수정 실패', error);
    },
  });

  const handleMemoBtnClick = () => {
    usePutMemoMutation.mutate({ note: memo });
  };

  return (
    <CardContainer>
      <PersonWrapper>
        <div className="left">
          <div className="infoWrapper">
            <label className="name">{workInfo.elderlyName}</label>
            <div className="extraWrapper">
              <label className="extra">{workInfo.elderlyAge}세</label>
              <Border />
              <label className="extra">
                {GenderMapping[workInfo.elderlyGender]}
              </label>
            </div>
          </div>

          <div className="work-info">
            <div className="workWrapper">
              <label className="title">근무요일</label>
              <label className="title">주소</label>
              <label className="title">케어항목</label>
              <label className="title">건강상태</label>
              <label className="title">기관이름</label>
            </div>
            <div className="workWrapper">
              <label className="detail">{DayFormat(workInfo.workDays)}</label>
              <label className="detail">{workInfo.workAddress}</label>
              <label className="detail">
                {CareTypeFormat(workInfo.careTypes, 2)}
              </label>
              <label className="detail">{workInfo.healthCondition}</label>
              <label className="detail">{workInfo.institutionName}</label>
            </div>
          </div>
        </div>
        <img src={workInfo.elderlyProfileImageUrl} />
      </PersonWrapper>
      <MemoWrapper>
        <label className="memo" htmlFor="note">
          메모
        </label>
        <div className="fieldWrapper">
          <MemoField
            id="note"
            typeof="text"
            placeholder="메모를 입력해 주세요"
            value={memo}
            maxLength={99}
            onChange={(e) => {
              setTextCount(e.target.value.length);
              setMemo(e.target.value);
              setIsMemoChange(true);
            }}
          />
          <label className="count">{textCount}/100</label>
        </div>
        <Button memo={isMemoChange} onClick={handleMemoBtnClick}>
          {isMemoChange ? '메모 저장' : memo === '' ? '메모 작성' : '메모 수정'}
        </Button>
      </MemoWrapper>
    </CardContainer>
  );
};

export default CaregiverMyworkCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  label {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const PersonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  div {
    display: flex;
  }

  .left {
    flex-direction: column;
    gap: 8px;
  }

  .infoWrapper {
    gap: 8px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .extraWrapper {
    gap: 4px;
    align-items: center;
  }

  .extra {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  .work-info {
    gap: 12px;
    align-items: center;
  }

  .workWrapper {
    flex-direction: column;
    gap: 6px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray400};
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .memo {
    color: ${({ theme }) => theme.colors.gray900};
  }

  .fieldWrapper {
    position: relative;
  }

  .count {
    position: absolute;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    right: 16px;
    bottom: 16px;
  }
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 16px;
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
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Button = styled.button<{ memo: boolean }>`
  background: ${({ memo, theme }) =>
    memo ? theme.colors.mainBlue : theme.colors.subBlue};
  color: ${({ memo, theme }) =>
    memo ? theme.colors.white : theme.colors.mainBlue};
  height: 36px;
  border-radius: 12px;
  line-height: 1.4;
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
