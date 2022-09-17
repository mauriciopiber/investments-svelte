import { SERVER_URL } from '$lib/Env';

export async function fetchGraphql(query: string) {
  const request = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json'
    },
    body: JSON.stringify({
      query
    })
  });

  const response = await request.json();

  const { data, errors } = response;

  if (errors && errors.length > 0) {
    const error = errors[0];
    throw new Error(error.message);
  }
  return data;
}
