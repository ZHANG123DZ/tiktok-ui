import { useEffect } from 'react';

export const useFacebookLogin = ({
  appId,
  redirectUri,
  onSuccess,
  onError,
}) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: 'v20.0',
      });
    };
  }, [appId]);

  const login = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const { accessToken } = response.authResponse;

          onSuccess({ accessToken });
        } else {
          onError?.();
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return { login };
};
