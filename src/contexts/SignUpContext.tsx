import { useFunnel } from '@/hooks/useFunnel';
import { createContext, useContext } from 'react';

const SingUpContext = createContext<ReturnType<typeof useFunnel> | null>(null);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(0);
  return (
    <SingUpContext.Provider value={funnel}>{children}</SingUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SingUpContext);
  if (!context) {
    throw new Error('signupcontext.tsx error');
  }
  return context;
};
