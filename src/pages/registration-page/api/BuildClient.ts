import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { env } from '@/shared/constants';

const authMiddlewareOptions = {
  host: env.AUTH_URL,
  projectKey: env.PROJECT_KEY,
  credentials: {
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
  },
  scopes: [`manage_project:${env.PROJECT_KEY}`],
  fetch
};

const client = new ClientBuilder()
  .withProjectKey(env.PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware({
    host: env.API_URL,
    fetch
  })
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: env.PROJECT_KEY
  });
};
