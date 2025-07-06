import { CareTypeFormat, GenderMapping } from '@/constants/caregiver';
import { WorkSchedule } from '@/types/Caregiver/home';
import styled from 'styled-components';

interface CaregiverHomeWorkCardProps {
  workSchedule: WorkSchedule;
}

const CaregiverHomeWorkCard = ({
  workSchedule,
}: CaregiverHomeWorkCardProps) => {
  return (
    <CardContainer>
      <div className="timeWrapper">
        <label className="time">
          {workSchedule.workStartTime} ~ {workSchedule.workEndTime}
        </label>
      </div>
      <div className="infoWrapper">
        <div className="personWrapper">
          <label className="name">{workSchedule.seniorName}</label>
          <div className="extraWrapper">
            <label className="person">{workSchedule.seniorAge}세</label>
            <Border />
            <label className="person">
              {GenderMapping[workSchedule.seniorGender]}
            </label>
          </div>
        </div>
        <div className="workWrapper">
          <div className="work">
            <label className="title">케어항목</label>
            <label className="detail">
              {CareTypeFormat(workSchedule.seniorCareType, 2)}
            </label>
          </div>
          <div className="work">
            <label className="title">근무장소</label>
            <label className="detail">{workSchedule.workLocation}</label>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default CaregiverHomeWorkCard;

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

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .timeWrapper {
    padding: 2px 6px;
    width: 100px;
    height: 22px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.gray50};
  }

  .time {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .infoWrapper {
    flex-direction: column;
    gap: 5px;
  }

  .personWrapper {
    gap: 8px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .extraWrapper {
    gap: 4px;
    align-items: center;
  }

  .person {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  .workWrapper {
    flex-direction: column;
    gap: 4px;
  }

  .work {
    gap: 12px;
    align-items: center;
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;
