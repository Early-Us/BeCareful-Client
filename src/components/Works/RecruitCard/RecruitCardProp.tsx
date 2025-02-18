import { RecruitCardProps } from '@/components/Works/RecruitCard/RecruitCard';

interface RecruitmentResponse {
  recruitmentId: number;
  title: string;
  careTypes: string[];
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  workSalaryType: string;
  workSalaryAmount: number;
  isRecruiting: boolean;
  institutionName: string;
  matchRate: number;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
}

export const mapRecruitmentToCardProps = (
  recruitment: RecruitmentResponse,
): RecruitCardProps => {
  return {
    recruitmentId: String(recruitment.recruitmentId),
    centerName: recruitment.institutionName,
    description: recruitment.title,
    tags: [
      recruitment.isHotRecruitment ? '인기공고' : '',
      recruitment.isHourlySalaryTop ? '시급 TOP' : '',
      recruitment.matchRate >= 1 ? '조건 일치' : '',
    ].filter(Boolean),
    careItems: recruitment.careTypes,
    workingDays: recruitment.workDays.map(
      (day) =>
        ({
          MONDAY: '월',
          TUESDAY: '화',
          WEDNESDAY: '수',
          THURSDAY: '목',
          FRIDAY: '금',
          SATURDAY: '토',
          SUNDAY: '일',
        })[day] || day,
    ),
    workingHours: `${recruitment.workStartTime}~${recruitment.workEndTime}`,
    hourlyRate: `${recruitment.workSalaryAmount.toLocaleString()}원`,
    chipState: recruitment.isRecruiting ? 'pass' : 'fail',
  };
};
