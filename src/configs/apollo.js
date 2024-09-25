import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client/core';

const api_header = {
  'x-api-key': import.meta.env.VITE_AWS_APP_SYNC_API_KEY
};

const auth = {
  type: 'API_KEY',
  apiKey: import.meta.env.VITE_AWS_APP_SYNC_API_KEY
};

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_AWS_APP_SYNC_URL,
  headers: api_header
});

const link = ApolloLink.from([
  createSubscriptionHandshakeLink(
    {
      url: import.meta.env.VITE_AWS_APP_SYNC_URL,
      region: import.meta.env.VITE_AWS_REGION,
      auth
    },
    httpLink
  )
]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export function setupApollo(app) {
  provideApolloClient(apolloClient);
  app.provide(DefaultApolloClient, apolloClient);
}
