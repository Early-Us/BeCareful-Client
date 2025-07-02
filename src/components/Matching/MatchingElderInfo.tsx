import { DAY_EN_TO_KO } from '@/constants/day.socialWorker';
import { MatchingElderData } from '@/types/Matching.socialWorker';
import { styled } from 'styled-components';
interface MatchingElderInfoProps {
  data: MatchingElderData;
}

export const MatchingElderInfo = ({ data }: MatchingElderInfoProps) => {
  const { careType, workDays, workStartTime, workEndTime, elderlyInfo } =
    data.recruitmentInfo;
  const { name, address, gender, age, profileImageUrl } = elderlyInfo;
  const translatedWorkDays = workDays
    .map((day) => DAY_EN_TO_KO[day as keyof typeof DAY_EN_TO_KO] || day)
    .join(', ');

  return (
    <ElderInfoContainer>
      <ElderTitle>매칭 정보</ElderTitle>
      <ElderProfile>
        <ProfileImage src={profileImageUrl} alt={`${name}의 프로필`} />
        <span>{name}</span>
      </ElderProfile>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">케어 항목</span>
          <span>{careType.join(', ')}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">나이/성별</span>
          <span>
            {age}세 {gender === 'MALE' ? '남성' : '여성'}
          </span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">주소</span>
          <span>{address}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무 요일</span>
          <span>{translatedWorkDays}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">근무 시간</span>
          <span>
            {workStartTime} ~ {workEndTime}
          </span>
        </DetailContent>
      </DetailContentContainer>
    </ElderInfoContainer>
  );
};
const ElderInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const ElderTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ElderProfile = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const DetailContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    width: 72px;
  }
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin-right: 8px;
`;
