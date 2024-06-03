import axios from 'axios';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const authURL = import.meta.env.VITE_AUTH_URL;
const scope = import.meta.env.VITE_SCOPES;

const basicAuth = btoa(`${clientId}:${clientSecret}`);

const getAuthToken = async () => {
  const tokenResponse = await axios.post(
    `${authURL}/oauth/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `${scope}`
    }),
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  console.log(tokenResponse.data.access_token);
  return tokenResponse.data.access_token;
};

export default getAuthToken;
