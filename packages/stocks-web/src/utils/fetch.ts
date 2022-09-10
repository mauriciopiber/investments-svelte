export async function fetchGraphql(query: string) {
  const request = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json'
    },
    body: JSON.stringify({
      query
    })
  });

  console.log(request.status);
  const response = await request.json();

  const { data, errors } = response;

  if (errors && errors.length > 0) {
    const error = errors[0];
    throw new Error(error.message);
  }
  return data;
}
