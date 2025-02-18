export type Gender = 'MALE' | 'FEMALE' | '';

export type Rank = 'MANAGER' | 'SOCIALWORKER' | '';

export interface SocialSignUpFormData {
  name: string;
  birthDate: string;
  gender: Gender;
  phoneNumber: string;
  password: string;
  institutionId: string;
  rank: Rank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export interface NursingInstitutionRegisterRequest {
  institutionId: string;
  institutionName: string;
  streetAddress: string;
  detailAddress: string;
  phoneNumber: string;
  openDate: string;
  isHavingBathCar: boolean;
  profileImageUrl?: string;
}

export type SocialStepProps = {
  formSocialData: SocialSignUpFormData;
  setFormSocialData: React.Dispatch<React.SetStateAction<SocialSignUpFormData>>;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
};
