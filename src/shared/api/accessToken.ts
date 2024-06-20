import axios from 'axios';
import { env } from '@/shared/constants';

const basicAuth = btoa(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`);

export const getAuthToken = async () => {
  const tokenResponse = await axios.post(
    `${env.AUTH_URL}/oauth/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `manage_project:${env.PROJECT_KEY}}`
    }),
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return tokenResponse.data.access_token;
};
