import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { setSentryTag, setSentryUser } from '@/lib/sentry';
import { currentUserInfo } from '@/recoil/currentUserInfo';

export const SentryBridge = () => {
  const location = useLocation();
  const userInfo = useRecoilValue(currentUserInfo);

  useEffect(() => {
    setSentryTag('route', `${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const username = userInfo.nickName || userInfo.realName;

    if (!username) {
      setSentryUser(null);
      return;
    }

    setSentryUser({ username });
  }, [userInfo.nickName, userInfo.realName]);

  return null;
};
