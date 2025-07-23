import { CareGiverQualificationCard } from '@/components/common/QualificationCard/CaregiverQualificationCard';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { SocialQualificationCard } from '@/components/common/QualificationCard/SocialQualificationCard';
import { CertificateFormInput, CertificateKey } from '@/types/CareGiverSignUp';

export const CERTIFICATE_CARD_MAP: Record<
  CertificateKey,
  React.ComponentType<{
    initialType: string;
    onChange: (data: CertificateFormInput) => void;
  }>
> = {
  caregiverCertificate: CareGiverQualificationCard,
  nursingCareCertificate: NursingQualificationCard,
  socialWorkerCertificate: SocialQualificationCard,
};
