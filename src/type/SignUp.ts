export interface Certificate {
  grade: 'FIRST' | 'SECOND';
  certificateNumber: string;
}

export type SignUpFormData = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  password: string;
  gender: 'MALE' | 'FEMALE' | '';
  streetAddress: string;
  detailAddress: string;
  caregiverCertificate: Certificate;
  socialWorkerCertificate?: Certificate;
  nursingCareCertificate?: Certificate;
  isHavingCar: boolean;
  isCompleteDementiaEducation?: boolean;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
  profileImageUrl?: string;
};

export type StepProps = {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  onNext?: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
};
