/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
query {
  status {
    message
  }
}
  `;

  try {
    const request = await fetch('http://localhost:4000/graphql', {
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
        status: error.message
      };
    }

    const { status } = data;
    const { message } = status;

    return {
      title: 'Status',
      status: `Found Service with message: ${message}`
    };
  } catch (e) {
    return {
      title: 'Status',
      status: `Fetch Error ${JSON.stringify(e)}`
    };
  }
}
