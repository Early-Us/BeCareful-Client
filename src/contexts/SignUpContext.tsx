import { useFunnel } from '@/hooks/useFunnel';
import { createContext, useContext, useState } from 'react';

export interface SignUpFormData {
  nursingInstitutionId: number | null;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  institutionRank:
    | 'CENTER_DIRECTOR'
    | 'REPRESENTATIVE'
    | 'SOCIAL_WORKER'
    | 'none';
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

interface SignUpContextType extends ReturnType<typeof useFunnel> {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  isInstitutionFunnel: boolean;
  setIsInstitutionFunnel: (value: boolean) => void;
}

const SignUpContext = createContext<SignUpContextType | null>(null);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(0);

  const [formData, setFormData] = useState<SignUpFormData>({
    nursingInstitutionId: null,
    realName: '',
    nickName: '',
    birthYymmdd: '',
    genderCode: 0,
    phoneNumber: '',
    institutionRank: 'none',
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
  });

  const [isInstitutionFunnel, setIsInstitutionFunnel] = useState(false);

  return (
    <SignUpContext.Provider
      value={{
        ...funnel,
        formData,
        setFormData,
        isInstitutionFunnel,
        setIsInstitutionFunnel,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('signupcontext.tsx error');
  }
  return context;
};
