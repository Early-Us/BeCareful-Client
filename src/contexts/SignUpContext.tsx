import { useFunnel } from '@/hooks/useFunnel';
import { createContext, useContext, useState } from 'react';

export interface SignUpFormData {
  institutionRole: string;
  profileType: string;
  institutionName: string;
  name: string;
  nickname: string;
  residentId: string;
  birthDate: string;
  phoneNumber: string;
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
    institutionRole: '',
    profileType: '',
    institutionName: '',
    name: '',
    nickname: '',
    residentId: '',
    birthDate: '',
    phoneNumber: '',
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
