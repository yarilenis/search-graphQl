import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

const graphApi = 'https://api.graphql.jobs/';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

export default new ApolloClient({
  defaultOptions,
  connectToDevTools: process.browser,
  ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
  link: new HttpLink({
    uri: graphApi,
  }),
  cache: new InMemoryCache(),
});
