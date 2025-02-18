import styled from 'styled-components';
import { Toggle } from '../common/Toggle/Toggle';
import { useState } from 'react';

interface WorkApplyProps {
  fix: string;
  apply: boolean | undefined;
  caretype: string;
  day: string | undefined;
  time: string | undefined;
  pay: number;
  location: string;
}

const WorkApply = ({
  fix,
  apply,
  caretype,
  day,
  time,
  pay,
  location,
}: WorkApplyProps) => {
  const [isToggleChecked, setIsToggleChecked] = useState(apply);
  const handleToggleChange = () => {
    setIsToggleChecked((prevChecked) => !prevChecked);
  };

  return (
    <Container>
      <TitlesWrapper>
        <TitleWrapper>
          <FixWrapper>
            <Fix color="">최근 수정일</Fix>
            <Fix color="blue">{fix}</Fix>
          </FixWrapper>
          <Title>일자리 신청서</Title>
        </TitleWrapper>
        <ToggleWrapper>
          <Toggle
            checked={isToggleChecked ? isToggleChecked : false}
            onChange={handleToggleChange}
          />
          <ToggleLabel>{isToggleChecked ? '신청중' : '미신청'}</ToggleLabel>
        </ToggleWrapper>
      </TitlesWrapper>
      <LabelsWrapper>
        <LabelWrapper>
          <LabelTitle>케어항목</LabelTitle>
          <LabelDetail>{caretype}</LabelDetail>
        </LabelWrapper>
        <LabelWrapper>
          <LabelTitle>근무요일</LabelTitle>
          <LabelDetail>{day}</LabelDetail>
        </LabelWrapper>
        <LabelWrapper>
          <LabelTitle>근무시간</LabelTitle>
          <LabelDetail>{time}</LabelDetail>
        </LabelWrapper>
        <LabelWrapper>
          <LabelTitle>희망급여</LabelTitle>
          <LabelDetail>{pay}원</LabelDetail>
        </LabelWrapper>
        <LabelWrapper>
          <LabelTitle>근무지역</LabelTitle>
          <LabelDetail>{location}</LabelDetail>
        </LabelWrapper>
      </LabelsWrapper>
    </Container>
  );
};

export default WorkApply;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 24px 20px;
  height: 194px;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const TitlesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FixWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const Fix = styled.div<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ToggleLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-align: center;
`;

const LabelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const LabelTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
