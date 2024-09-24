import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_AWS_APP_SYNC_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_AWS_APP_SYNC_API_KEY
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_AWS_APP_SYNC_URL,
    connectionParams: {
      region: import.meta.env.VITE_AWS_REGION,
      auth: {
        type: 'API_KEY',
        apiKey: import.meta.env.VITE_AWS_APP_SYNC_API_KEY
      }
    }
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export function setupApollo(app) {
  provideApolloClient(apolloClient);
  app.provide(DefaultApolloClient, apolloClient);
}
