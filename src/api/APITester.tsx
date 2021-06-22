import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

export function APITester(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <APIExample />
    </QueryClientProvider>
  );
}

function APIExample() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`https://api.github.com/repos/tannerlinsley/react-query`).then((res) => res.json()),
  );
  if (isLoading) return <div>{'...loading'}</div>;

  if (error) return <div>`has Error ${error}`</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>
      <strong>✨ {data.stargazers_count}</strong>
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
