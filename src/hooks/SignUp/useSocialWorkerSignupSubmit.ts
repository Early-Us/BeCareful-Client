import { useSignUpMember } from '@/api/signup/socialworker';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { SignUpPayload } from '@/types/auth';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { formatPhoneNumber } from '@/utils/format/text';

export const useSocialWorkerSignupSubmit = () => {
  const setCurrentUserInfo = useSetRecoilState(currentUserInfo);
  const { mutate, isPending, isError, error } = useSignUpMember();

  const submit = useCallback(
    (
      payload: SignUpPayload,
      opts?: { onSuccess?: () => void; onError?: (e: unknown) => void },
    ) => {
      const normalizedPayload: SignUpPayload = {
        ...payload,
        phoneNumber: formatPhoneNumber(payload.phoneNumber),
      };

      mutate(normalizedPayload, {
        onSuccess: () => {
          setCurrentUserInfo({
            realName: normalizedPayload.realName,
            nickName: normalizedPayload.nickName,
          });
          opts?.onSuccess?.();
        },
        onError: (e) => {
          opts?.onError?.(e);
        },
      });
    },
    [mutate, setCurrentUserInfo],
  );

  return { submit, isPending, isError, error };
};
