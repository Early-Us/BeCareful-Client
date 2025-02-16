import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowRight } from '@/assets/icons/ArrowRight.svg';
import { ReactComponent as ArrowRightCircle } from '@/assets/icons/home/ArrowRightCircle.svg';
import { ReactComponent as Notice } from '@/assets/icons/home/Notice.svg';
import { ReactComponent as Status } from '@/assets/icons/home/Status.svg';
import HomeScheduleCard from './HomeScheduleCard';

// interface WorkStartTime {
//   hour: number;
//   minute: number;
//   second: number;
//   nano: number;
// }

// interface WorkEndTime {
//   hour: number;
//   minute: number;
//   second: number;
//   nano: number;
// }

interface WorkSchedule {
  workStartTime: string;
  workEndTime: string;
  seniorName: string;
  seniorGender: string;
  seniorAge: number;
  seniorCareType: string[];
  workLocation: string;
}

interface HomeMainProps {
  matching: boolean;
  schedule: WorkSchedule[];
  apply: boolean;
  notice: number;
  status: number;
}

export const HomeMainContent = ({
  matching,
  schedule,
  apply,
  notice,
  status,
}: HomeMainProps) => {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      {matching ? (
        schedule && schedule.length > 0 ? (
          <CardWrapper>
            {schedule.map((workSchedule, index) => (
              <HomeScheduleCard
                key={index}
                // startHour={workSchedule.workStartTime.hour}
                // startMinute={workSchedule.workStartTime.minute}
                // endHour={workSchedule.workEndTime.hour}
                // endMinute={workSchedule.workEndTime.minute}
                startTime={workSchedule.workStartTime}
                endTime={workSchedule.workEndTime}
                name={workSchedule.seniorName}
                age={workSchedule.seniorAge}
                gender={workSchedule.seniorGender === 'FEMALE' ? '여' : '남'}
                caretype={workSchedule.seniorCareType.join(', ')}
                location={workSchedule.workLocation}
              />
            ))}
          </CardWrapper>
        ) : (
          <ScheduleWrapper>
            <ScheduleDetail>편안한 하루 보내세요!</ScheduleDetail>
            <ScheduleTitle>오늘은 정해진 근무 일정이 없어요</ScheduleTitle>
          </ScheduleWrapper>
        )
      ) : (
        <ScheduleWrapper>
          <ScheduleDetail>새로운 돌봄을 시작해보세요!</ScheduleDetail>
          <ScheduleTitle>내 근무 일정을 한눈에 확인할 수 있어요</ScheduleTitle>
        </ScheduleWrapper>
      )}
      <ButtonsWrapper>
        <ApplyButton
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <ApplyWrapper>
            <Label>일자리 신청</Label>
            {apply ? (
              <ApplyTitle>신청중</ApplyTitle>
            ) : (
              <ApplyTitle>미신청</ApplyTitle>
            )}
          </ApplyWrapper>
          <ChangeWrapper>
            <Label>변경하기</Label>
            <Arrow>
              <ArrowRightCircle />
            </Arrow>
          </ChangeWrapper>
        </ApplyButton>
        <WorkButtons>
          <ButtonWrapper
            onClick={() => {
              navigate('/work');
            }}
          >
            <ButtonLeft>
              <ButtonTitle>모집공고</ButtonTitle>
              <ButtonLabel>
                <ButtonNumber>{notice}</ButtonNumber>
                <ButtonGun>건</ButtonGun>
              </ButtonLabel>
            </ButtonLeft>
            <ButtonRight>
              <Notice />
            </ButtonRight>
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              navigate('/apply');
            }}
          >
            <ButtonLeft>
              <ButtonTitle>지원현황</ButtonTitle>
              <ButtonLabel>
                <ButtonNumber>{status}</ButtonNumber>
                <ButtonGun>건</ButtonGun>
              </ButtonLabel>
            </ButtonLeft>
            <ButtonRight>
              <Status />
            </ButtonRight>
          </ButtonWrapper>
        </WorkButtons>
      </ButtonsWrapper>
      <MyWorkButton
        onClick={() => {
          navigate('/mywork');
        }}
      >
        <MyWorkLabel>나의 일자리</MyWorkLabel>
        <Arrow>
          <ArrowRight />
        </Arrow>
      </MyWorkButton>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 192px;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;
  width: calc(100% + 20px);
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 16px 20px;
  height: 68px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const ScheduleDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ScheduleTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ApplyButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  height: 186px;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 12px;
  width: 51.25%;
`;

const ApplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ApplyTitle = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ChangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const WorkButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 46.25%;
`;

const ButtonWrapper = styled.button`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 89px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

const ButtonLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ButtonLabel = styled.div`
  display: flex;
  align-items: end;
  gap: 1px;
`;

const ButtonNumber = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 100%;
`;

const ButtonGun = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ButtonRight = styled.div`
  width: 42px;
  height: 42px;
`;

const MyWorkButton = styled.button`
  display: flex;
  height: 56px;
  padding: 20px 16px;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  background: #555960;
`;

const MyWorkLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Arrow = styled.div`
  width: 24px;
  height: 24px;
`;
