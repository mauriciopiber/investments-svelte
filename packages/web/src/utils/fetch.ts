import { SERVER_URL } from '$lib/Env';
import type { Filter } from '@pibernetwork/model/src/types';

export async function fetchGraphql(
  query: string,
  variables: { [key: string]: string | number | Filter[] } = {},
) {
  const request = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const response = await request.json();

  const { data, errors } = response;

  if (errors && errors.length > 0) {
    const error = errors[0];
    throw new Error(error.message);
  }
  return data;
}
