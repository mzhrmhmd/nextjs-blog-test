'use client';

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

/**
 * Apollo Client Setup:
 * Initializes and exports an Apollo Client instance configured to connect to a GraphCMS GraphQL API.
 * Uses environment variables for the GraphCMS endpoint and API token for authorization.
 * Sets up an HTTP link to communicate with the GraphQL server and an in-memory cache for client-side caching.
 */
const client = new ApolloClient({
  /**
   * HttpLink:
   * Establishes the connection to the GraphQL API endpoint.
   * - uri: Specifies the GraphQL endpoint URL, sourced from environment variables.
   * - headers: Includes authorization headers for API access, using a token from environment variables.
   */
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, // GraphQL API endpoint URL from environment variables
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`, // API token for authorization from environment variables
    },
  }),
  /**
   * InMemoryCache:
   * Configures an in-memory cache for Apollo Client.
   * This cache stores query results in the client's memory to reduce network requests and improve performance.
   */
  cache: new InMemoryCache(),
});

export default client;