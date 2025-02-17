import styled from 'styled-components';

interface ScheduleCardProps {
  startTime: string;
  endTime: string;
  name: string;
  age: number;
  gender: string;
  caretype: string;
  location: string;
}

const HomeScheduleCard = ({
  startTime,
  endTime,
  name,
  age,
  gender,
  caretype,
  location,
}: ScheduleCardProps) => {
  return (
    <CardContainer>
      <TimeWrapper>
        {startTime} ~ {endTime}
      </TimeWrapper>
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
            <LabelTitle>케어항목</LabelTitle>
            <LabelDetail>{caretype}</LabelDetail>
          </Label>
          <Label>
            <LabelTitle>근무장소</LabelTitle>
            <LabelDetail>{location}</LabelDetail>
          </Label>
        </LabelWrapper>
      </InfoWrapper>
    </CardContainer>
  );
};

export default HomeScheduleCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  min-width: 180px;
  height: 100px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const TimeWrapper = styled.div`
  display: flex;
  padding: 2px 6px;
  width: 92px;
  height: 18px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
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
  gap: 4px;
`;

const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LabelTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
