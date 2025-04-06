import { useFunnel } from '@/hooks/useFunnel';
import { createContext, useContext, useState } from 'react';

interface SignUpContextType extends ReturnType<typeof useFunnel> {
  isInstitutionFunnel: boolean;
  setIsInstitutionFunnel: (value: boolean) => void;
}

const SignUpContext = createContext<SignUpContextType | null>(null);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(0);
  const [isInstitutionFunnel, setIsInstitutionFunnel] = useState(false);

  return (
    <SignUpContext.Provider
      value={{ ...funnel, isInstitutionFunnel, setIsInstitutionFunnel }}
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
