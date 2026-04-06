import { CertificateInfo } from '@/types/caregiver';
import { Gender, InstitutionRank, Rank } from '@/types/common';
import { formatPhoneNumber } from '@/utils/format/text';

// ==================== 사회복지사 ====================
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
} // TODO

export interface SignUpPayload {
  nursingInstitutionId: number;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  loginProvider: string;
  password: string;
  institutionRank: InstitutionRank;
  profileImageTempKey?: string;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

// ==================== 요양보호사 ====================
export interface CaregiverSignUpFormData {
  realName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  streetAddress: string;
  detailAddress: string;
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate: CertificateInfo;
  nursingCareCertificate: CertificateInfo;
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
  profileImageTempKey: string;
  password: string;
  loginProvider: string;
}

export type CaregiverSignUpRequest = Omit<
  CaregiverSignUpFormData,
  'caregiverCertificate' | 'socialWorkerCertificate' | 'nursingCareCertificate'
> & {
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate?: CertificateInfo;
  nursingCareCertificate?: CertificateInfo;
};

export const buildCaregiverSignUpPayload = (
  fd: CaregiverSignUpFormData,
): CaregiverSignUpRequest => {
  const hasNumber = (c?: CertificateInfo) =>
    !!c &&
    typeof c.certificateNumber === 'string' &&
    c.certificateNumber.trim() !== '';

  const {
    caregiverCertificate,
    socialWorkerCertificate,
    nursingCareCertificate,
    ...rest
  } = fd;

  return {
    ...rest,
    phoneNumber: formatPhoneNumber(fd.phoneNumber),
    caregiverCertificate,
    ...(hasNumber(socialWorkerCertificate) && { socialWorkerCertificate }),
    ...(hasNumber(nursingCareCertificate) && { nursingCareCertificate }),
  };
};
