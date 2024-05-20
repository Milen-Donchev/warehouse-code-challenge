"use client";

import {
  ApolloClient,
  ApolloProvider as ApolloClientProvider,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};

export const ApolloProvider = ({ children }: Props) => {
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};
