import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  type Client,
  type HttpMiddlewareOptions,
  ClientBuilder
} from '@commercetools/sdk-client-v2';
import { env } from '@/shared/constants';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: env.API_URL,
  includeHeaders: true,
  includeResponseHeaders: true,
  includeOriginalRequest: false,
  includeRequestInErrorResponse: false,
  maskSensitiveHeaderData: true,
  enableRetry: true,
  retryConfig: {
    maxRetries: 5,
    retryDelay: 200,
    backoff: false,
    retryCodes: [503]
  },
  fetch
};

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: env.AUTH_URL,
  projectKey: env.PROJECT_KEY,
  credentials: {
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
  },
  scopes: [env.MANAGE_CUSTOMERS],
  fetch
};

const client: Client = new ClientBuilder()
  .withProjectKey(env.PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const authRoot: ByProjectKeyRequestBuilder =
  createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: env.PROJECT_KEY
  });
