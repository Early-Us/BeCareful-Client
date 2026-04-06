import { CaregiverLeaveType } from '@/types/caregiver';
import { ReportReason } from '@/types/common';
import { SocialworkerLeaveType } from '@/types/socialworker';

// 최근 검색어 최대 개수
export const MAX_RECENT_SEARCHES = 10;

// 업로드하는 미디어 개수/크기 제한
export const MEDIA_LIMITS = {
  PHOTO: { COUNT: 100, SIZE_MB: 30 },
  VIDEO: { COUNT: 10, SIZE_GB: 1, DURATION_MIN: 15 },
  FILE: { COUNT: 5, SIZE_MB: 10, TOTAL_MB: 30 },
} as const;

// 신고 사유
export const REPORT_REASON_OPTIONS: {
  value: ReportReason;
  label: string;
}[] = [
  { value: 'SPAM', label: '스팸 / 부적절한 홍보' },
  { value: 'ABUSE', label: '욕설 / 비방 행위 / 혐오 조장' },
  { value: 'SEXUAL', label: '음란물 / 성적인 괴롭힘' },
  { value: 'PRIVACY', label: '개인정보 노출 / 사칭' },
  { value: 'OTHER', label: '기타 (직접 입력)' },
];

// 탈퇴 사유
interface LeaveReasonItem<T> {
  value: T;
  label: string;
}

export const LEAVE_REASONS: {
  CAREGIVER: LeaveReasonItem<CaregiverLeaveType>[];
  SOCIAL_WORKER: LeaveReasonItem<SocialworkerLeaveType>[];
} = {
  CAREGIVER: [
    { value: 'INSUFFICIENT_JOB', label: '일자리가 부족해요' },
    { value: 'UNCOMFORTABLE_APP', label: '앱 사용이 불편해요' },
    { value: 'PERSONAL_INFO', label: '개인정보 노출이 우려돼요' },
    { value: 'OTHER', label: '기타 (직접 입력)' },
  ],
  SOCIAL_WORKER: [
    { value: 'MATCHING_NOT_WORK', label: '인재 매칭이 안 돼요' },
    { value: 'INSTITUTION_CLOSE', label: '센터가 폐쇄되었어요' },
    { value: 'DIFFICULT_SERVICE', label: '서비스가 어려워요' },
    { value: 'OTHER', label: '기타 (직접 입력)' },
  ],
};
