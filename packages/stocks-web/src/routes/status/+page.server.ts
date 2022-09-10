import { SERVER_URL } from '$lib/Env';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
query {
  status {
    message
  }
}
  `;

  if (!SERVER_URL) {
    return {
      title: 'Status',
      server: '',
      status: 'Missing SERVER_URL'
    };
  }
  try {
    const request = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/json'
      },
      body: JSON.stringify({
        query: queryStocks
      })
    });

    const response = await request.json();
    const { data, errors } = response;

    if (errors && errors.length > 0) {
      const error = errors[0];
      return {
        title: 'Status',
        server: SERVER_URL,
        status: error.message
      };
    }

    const { status } = data;
    const { message } = status;

    return {
      title: 'Status',
      server: SERVER_URL,
      status: `Found Service with message: ${message}`
    };
  } catch (e) {
    return {
      title: 'Status',
      server: SERVER_URL,
      status: `Fetch Error ${JSON.stringify(e)}`
    };
  }
}
