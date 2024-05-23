const { ClientBuilder } = window['@commercetools/sdk-client-v2'];
const { createApiBuilderFromCtpClient } = window['@commercetools/platform-sdk'];

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const oauthUri = import.meta.env.VITE_AUTH_URL;
const baseUri = import.meta.env.VITE_API_URL;
const credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET
};

const client = new ClientBuilder()
  .defaultClient(baseUri, credentials, oauthUri, projectKey)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey
});
