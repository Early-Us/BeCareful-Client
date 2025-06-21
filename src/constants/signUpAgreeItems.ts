export const AGREE_ITEMS = [
  { key: 'isAgreedToTerms', id: '1', select: '필수', guide: '이용약관' },
  {
    key: 'isAgreedToCollectPersonalInfo',
    id: '2',
    select: '필수',
    guide: '개인정보 수집 및 이용 동의',
  },
  {
    key: 'isAgreedToReceiveMarketingInfo',
    id: '3',
    select: '선택',
    guide: '마케팅 정보 수신 동의',
  },
] as const;
