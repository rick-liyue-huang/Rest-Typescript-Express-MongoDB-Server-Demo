export const getGoogleURL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  console.log('options: ---', options);

  const qs = new URLSearchParams(options);

  console.log('{qs}: ----', { qs });

  return `${rootURL}?${qs.toString()}`;
};
