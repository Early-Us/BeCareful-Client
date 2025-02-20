import { styled } from 'styled-components';

interface MatchingElderInfoProps {
  elderlyName: string;
  careTypes: string[];
  elderlyAge: number;
  gender: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  profileImageUrl: string;
}

const dayMapping: Record<string, string> = {
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
  SUNDAY: '일요일',
};

export const MatchingElderInfo = ({
  elderlyName,
  careTypes,
  elderlyAge,
  gender,
  workDays,
  workStartTime,
  workEndTime,
  profileImageUrl,
}: MatchingElderInfoProps) => {
  const translatedWorkDays = workDays
    .map((day) => dayMapping[day] || day)
    .join(', ');
  return (
    <ElderInfoContainer>
      <ElderTitle>매칭 정보</ElderTitle>
      <ElderProfile>
        <ProfileImage src={profileImageUrl} alt={`${elderlyName}의 프로필`} />
        <span>{elderlyName}</span>
      </ElderProfile>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">케어 항목</span>
          <span>{careTypes.join(', ')}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">나이/성별</span>
          <span>
            {elderlyAge}세 {gender === 'MALE' ? '남성' : '여성'}
          </span>
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
